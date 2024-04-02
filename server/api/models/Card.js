/**
 * Card.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
        //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
        //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

        position: {
            type: 'number',
            required: true,
        },
        name: {
            type: 'string',
            required: true,
        },
        description: {
            type: 'string',
            isNotEmptyString: true,
            allowNull: true,
        },
        startDate: {
            type: 'ref',
            columnName: 'start_date',
        },
        dueDate: {
            type: 'ref',
            columnName: 'due_date',
        },
        stopwatch: {
            type: 'json',
        },
        eT: {
            type: 'json',
            defaultsTo: {

            }
        },
        gantt: {
            type: 'json',
            defaultsTo: {
                isEnable: false,
                progress: 0.0,
				pred : []
            }
        },
        cost: {
            type: 'json',
            defaultsTo: {
                isEnable: false,
                budget: 0.0,
                expense: 0.0
            }
        },

        //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
        //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
        //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

        //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
        //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
        //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

        boardId: {
            model: 'Board',
            required: true,
            columnName: 'board_id',
        },
        listId: {
            model: 'List',
            required: true,
            columnName: 'list_id',
        },
        creatorUserId: {
            model: 'User',
            columnName: 'creator_user_id',
        },
        coverAttachmentId: {
            model: 'Attachment',
            columnName: 'cover_attachment_id',
        },
        subscriptionUsers: {
            collection: 'User',
            via: 'cardId',
            through: 'CardSubscription',
        },
        memberUsers: {
            collection: 'User',
            via: 'cardId',
            through: 'CardMembership',
        },
        labels: {
            collection: 'Label',
            via: 'cardId',
            through: 'CardLabel',
        },
        tasks: {
            collection: 'Task',
            via: 'cardId',
        },
        attachments: {
            collection: 'Attachment',
            via: 'cardId',
        },
        actions: {
            collection: 'Action',
            via: 'cardId',
        }
    }
}
