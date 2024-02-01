const Errors = {
    NOT_ENOUGH_RIGHTS: {
        notEnoughRights: 'Not enough rights',
    },
    LIST_NOT_FOUND: {
        listNotFound: 'List not found',
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
    },

    exits: {
        notEnoughRights: {
            responseType: 'forbidden',
        },
        listNotFound: {
            responseType: 'notFound',
        },
    },

    async fn(inputs) {
        await sails.helpers.utils.logApi(this.req.isSocket, `PATCH /api/lists/${inputs.id} : lists/update`)

        const { currentUser } = this.req;

        let { list } = await sails.helpers.lists
          .getProjectPath(inputs.id)
          .intercept('pathNotFound', () => Errors.LIST_NOT_FOUND);

        const boardMembership = await BoardMembership.findOne({
            boardId: list.boardId,
            userId: currentUser.id,
        });

        if (!boardMembership) {
            throw Errors.LIST_NOT_FOUND; // Forbidden
        }

        if (boardMembership.role !== BoardMembership.Roles.EDITOR) {
            throw Errors.NOT_ENOUGH_RIGHTS;
        }

        const values = _.pick(inputs, ['position', 'name']);

        list = await sails.helpers.lists.updateOne.with({
            values,
            record: list,
            request: this.req,
        });

        if (!list) {
            throw Errors.LIST_NOT_FOUND;
        }

        return {
          item: list,
        }
    }
}
