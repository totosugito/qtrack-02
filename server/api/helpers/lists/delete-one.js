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
        const list = await List.archiveOne(inputs.record.id);

        if (list) {
            sails.sockets.broadcast(
                `board:${list.boardId}`,
                'listDelete',
                {
                    item: list,
                },
                inputs.request,
            )
            // ***
            sails.log(`... api/helpers/lists/delete-one  s.broadcast : board:${list.boardId} listDelete`)
        }

        return list
    }
}
