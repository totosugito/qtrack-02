//
//
const valuesValidator = (value) => {
    if (!_.isPlainObject(value)) {
        return false;
    }

    if (!_.isUndefined(value.position) && !_.isFinite(value.position)) {
        return false;
    }

    return true
}

module.exports = {
    inputs: {
        record: {
            type: 'ref',
            required: true,
        },
        values: {
            type: 'json',
            custom: valuesValidator,
            required: true,
        },
        request: {
            type: 'ref',
        },
    },

    async fn(inputs) {
        const { values } = inputs;

        if (!_.isUndefined(values.position)) {
            const lists = await sails.helpers.boards.getLists(inputs.record.boardId, inputs.record.id);

            const { position, repositions } = sails.helpers.utils.insertToPositionables(
                values.position,
                lists,
            );

            values.position = position;

            repositions.forEach(async ({ id, position: nextPosition }) => {
                await List.update({
                    id,
                    boardId: inputs.record.boardId,
                }).set({
                    position: nextPosition,
                });

                sails.sockets.broadcast(`board:${inputs.record.boardId}`, 'listUpdate', {
                    item: {
                        id,
                        position: nextPosition,
                    },
                })
                // ***
                sails.log(`... api/helpers/lists/update-one  s.broadcast : board:${inputs.record.boardId} listUpdate`)
            });
        }

        const list = await List.updateOne(inputs.record.id).set({ ...values });

        if (list) {
            sails.sockets.broadcast(
                `board:${list.boardId}`,
                'listUpdate',
                {
                    item: list,
                },
                inputs.request,
            )
            // ***
            sails.log(`... api/helpers/lists/update-one  s.broadcast : board:${list.boardId} listUpdate`)
        }

        return list
    },
}
