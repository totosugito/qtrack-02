module.exports = {
    inputs: {
        ids: {
          type: 'string',
          required: true,
          // regex: /^[0-9]+(,[0-9]+)*$/,
        },
        isRead: {
          type: 'boolean',
        },
    },

    async fn(inputs) {
        await sails.helpers.utils.logApi(this.req.isSocket, `PATCH /api/notifications/${inputs.id} : notifications/update`)

        const { currentUser } = this.req;

        const values = _.pick(inputs, ['isRead']);

        const notifications = await sails.helpers.notifications.updateMany.with({
            values,
            recordsOrIds: inputs.ids.split(','),
            user: currentUser,
            request: this.req,
        });

        return {
            items: notifications,
        }
    }
}
