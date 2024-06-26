const Errors = {
  BOARD_MEMBERSHIP_NOT_FOUND: {
    boardMembershipNotFound: 'Board membership not found',
  },
};

module.exports = {
    inputs: {
        id: {
          type: 'string',
          // regex: /^[0-9]+$/,
          required: true,
        },
    },

    exits: {
        boardMembershipNotFound: {
          responseType: 'notFound',
        },
    },

    async fn(inputs) {
        await sails.helpers.utils.logApi(this.req.isSocket, ` DELETE /api/board-memberships/${inputs.id} : board-memberships/delete`)

        const { currentUser } = this.req;

        const path = await sails.helpers.boardMemberships
          .getProjectPath(inputs.id)
          .intercept('pathNotFound', () => Errors.BOARD_MEMBERSHIP_NOT_FOUND);

        let { boardMembership } = path;
        const { project } = path;

        if (boardMembership.userId !== currentUser.id) {
            const isProjectManager = await sails.helpers.users.isProjectManager(
                currentUser.id,
                project.id,
            );

            if (!isProjectManager) {
               throw Errors.BOARD_MEMBERSHIP_NOT_FOUND; // Forbidden
            }
        }

        boardMembership = await sails.helpers.boardMemberships.deleteOne.with({
            project,
            record: boardMembership,
            request: this.req,
        });

        if (!boardMembership) {
            throw Errors.BOARD_MEMBERSHIP_NOT_FOUND;
        }

        return {
            item: boardMembership,
        }
    }
}
