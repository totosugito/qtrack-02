module.exports = {
    inputs: {
        name: {
          type: 'string',
          required: true,
        },
    },

    async fn(inputs) {
        await sails.helpers.utils.logApi(this.req.isSocket, `POST /api/projects': 'projects/create`)

        const { currentUser } = this.req;

        const values = _.pick(inputs, ['name']);

        const { project, projectManager } = await sails.helpers.projects.createOne.with({
            values,
            user: currentUser,
            request: this.req,
        });

        return {
            item: project,
            included: {
                projectManagers: [projectManager],
            },
        }
    }
}
