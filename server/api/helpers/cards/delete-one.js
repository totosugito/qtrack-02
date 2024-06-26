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
        const card = await Card.archiveOne(inputs.record.id)

        if (card) {
            sails.sockets.broadcast(
                `board:${card.boardId}`,
                'cardDelete',
                {
                    item: card,
                },
                inputs.request,
            )
            // ***
            sails.log(`... api/helpers/cards/delete-one  s.broadcast : cardDelete`)
        }

        return card
    },
}
