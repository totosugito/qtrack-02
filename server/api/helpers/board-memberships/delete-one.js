//
//
const { v4: uuid } = require('uuid')

module.exports = {
    inputs: {
        record: {
            type: 'ref',
            required: true,
        },
        project: {
            type: 'ref',
            required: true,
        },
        request: {
            type: 'ref',
        },
    },

    async fn(inputs) {
        const cardIds = await sails.helpers.boards.getCardIds(inputs.record.boardId);

        await CardSubscription.destroy({
            cardId: cardIds,
            userId: inputs.record.userId,
        });

        await CardMembership.destroy({
            cardId: cardIds,
            userId: inputs.record.userId,
        });

        const boardMembership = await BoardMembership.destroyOne(inputs.record.id);

        if (boardMembership) {
            const notify = (room) => {
                sails.sockets.broadcast(
                    room,
                    'boardMembershipDelete',
                    {
                        item: boardMembership,
                    },
                    inputs.request,
                )
                // ***
                sails.log(`... api/helpers/board-memberships/delete-one  s.broadcast : user:${room} boardMembershipDelete`)
            }

            const isProjectManager = await sails.helpers.users.isProjectManager(
                inputs.record.userId,
                inputs.project.id,
            );

            if (!isProjectManager) {
                sails.sockets.removeRoomMembersFromRooms(
                    `@user:${boardMembership.userId}`,
                    `board:${boardMembership.boardId}`,
                    () => {
                        notify(`board:${boardMembership.boardId}`);
                    },
                )
                // ***
                sails.log(`... api/helpers/board-memberships/delete-one  s.removeRoomMembersFromRooms : @user:${boardMembership.userId} board:${boardMembership.boardId}`)
            }

            notify(`user:${boardMembership.userId}`);

            if (isProjectManager) {
                const tempRoom = uuid();

                sails.sockets.addRoomMembersToRooms(`board:${boardMembership.boardId}`, tempRoom, () => {
                    sails.sockets.removeRoomMembersFromRooms(
                        `user:${boardMembership.userId}`,
                        tempRoom,
                        () => {
                            notify(tempRoom);
                            sails.sockets.removeRoomMembersFromRooms(tempRoom, tempRoom)
                            // ***
                            sails.log(`... api/helpers/board-memberships/delete-one  s.removeRoomMembersFromRooms : ${tempRoom}`)
                        },
                    )
                    // ***
                    sails.log(`... api/helpers/board-memberships/delete-one  s.removeRoomMembersFromRooms : user:${boardMembership.userId}  ${tempRoom}`)
                })
                // ***
                sails.log(`... api/helpers/board-memberships/delete-one  s.addRoomMembersToRooms : board:${boardMembership.boardId}  ${tempRoom}`)
            }
        }

        return boardMembership
    }
}
