module.exports = {
    friendlyName: 'Log api',
    description: 'log API input',

    inputs: {
        isSocket: {
            type: 'boolean',
            defaultsTo: false
        },
        msg: {
            type: 'string',
            defaultsTo: '',
        }
    },

    exits: {
        success: {
          description: 'All done.',
        },

    },


    fn: async function (inputs) {
        if (inputs.isSocket)
            sails.log('socket -> ' + inputs.msg)
        else
            sails.log('http -> ' + inputs.msg)
    }

}

