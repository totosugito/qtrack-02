//
//
module.exports = {
    inputs: {
        record: {
            type: 'ref',
            required: true,
        },
        request: {
            type: 'ref',
        },
    },

    async fn(inputs) {
        const projectRelatedUserIds = await sails.helpers.projects.getManagerAndBoardMemberUserIds(
            inputs.record.projectId,
        );

        const projectManager = await ProjectManager.destroyOne(inputs.record.id);

        if (projectManager) {
            projectRelatedUserIds.forEach((userId) => {
                sails.sockets.broadcast(
                    `user:${userId}`,
                    'projectManagerDelete',
                    {
                        item: projectManager,
                    },
                    inputs.request,
                )
                // ***
                sails.log(`... api/helpers/project-managers/delete-one  s.broadcast : user:${userId} projectManagerDelete`)
            })
        }

        return projectManager
    },
}
