const Errors = {
  BOARD_NOT_FOUND: {
    boardNotFound: 'Board not found',
  },
};

module.exports = {
    inputs: {
        id: {
            type: 'string',
            // regex: /^[0-9]+$/,
            required: true,
        },
        position: {
            type: 'number',
        },
        name: {
            type: 'string',
            isNotEmptyString: true,
        },
        eT: {
          type: 'json'
        },
    },

    exits: {
        boardNotFound: {
          responseType: 'notFound',
        },
    },

    async fn(inputs) {
        await sails.helpers.utils.logApi(this.req.isSocket, `PATCH /api/boards/${inputs.id} : boards/update`)

        const { currentUser } = this.req;

        let { board } = await sails.helpers.boards
          .getProjectPath(inputs.id)
          .intercept('pathNotFound', () => Errors.BOARD_NOT_FOUND);

        if (!board) {
          throw Errors.BOARD_NOT_FOUND;
        }

        const isProjectManager = await sails.helpers.users.isProjectManager(
          currentUser.id,
          board.projectId,
        );

        if (!isProjectManager) {
          throw Errors.BOARD_NOT_FOUND; // Forbidden
        }

        const values = _.pick(inputs, ['position', 'name', 'eT']);

        board = await sails.helpers.boards.updateOne.with({
          values,
          record: board,
          request: this.req,
        });

        if (!board) {
          throw Errors.BOARD_NOT_FOUND;
        }

        return {
          item: board,
        }
    }
}
