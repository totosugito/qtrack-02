//
//
import socketIOClient from 'socket.io-client'
import sailsIOClient from 'sails.io.js'

import Config from '../constants/Config'

const io = sailsIOClient(socketIOClient)

io.sails.url = Config.SERVER_HOST_NAME;
io.sails.autoConnect = false;
io.sails.reconnection = true;
io.sails.useCORSRouteToGetCookie = false;
io.sails.environment = process.env.NODE_ENV;

const { socket } = io;

socket.path = `${Config.BASE_PATH}/socket.io`;
socket.connect = socket._connect; // eslint-disable-line no-underscore-dangle

['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].forEach((method) => {
    socket[method.toLowerCase()] = (url, data, headers) =>
        new Promise((resolve, reject) => {
            console.log({
                "type": "socket",
                "proc": "reQ >>",
                "url": `/api${url}`,
                "method": method,
                "headers": headers,
                "data": data
            })
            socket.request(
                {
                    method,
                    data,
                    headers,
                    url: `/api${url}`,
                },
                (_, { body, error }) => {
                    if (error) {
                        reject(body);
                    } else {
                        console.log({
                            "type": "socket",
                            "proc": "reS <<",
                            "url": `/api${url}`,
                            "data": body
                        })
                        resolve(body);
                    }
                },
            );
        });
});

export default socket;
