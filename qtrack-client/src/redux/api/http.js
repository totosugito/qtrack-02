import {fetch} from '../../lib/external';

import Config from '../../constants/Config';
const http = {};

// TODO: add all methods
['GET', 'POST'].forEach((method) => {
    http[method.toLowerCase()] = (url, data, headers) => {
        if (Config.SHOW_DEBUG_API) {
            let dbgInp = {
                "type": "http",
                "proc": ">",
                "url": `/api${url}`,
                "method": method,
                "headers": headers,
                "data": data,
            }
            console.log(dbgInp)
        }

        const formData =
            data &&
            Object.keys(data).reduce((result, key) => {
                result.append(key, data[key]);

                return result;
            }, new FormData());

        return fetch(`${Config.SERVER_BASE_URL}/api${url}`, {
            method,
            headers,
            body: formData,
        })
            .then((response) =>
                response.json().then(function (body) {
                        if (Config.SHOW_DEBUG_API) {
                            let dbgOut = {
                                "type": "http",
                                "proc": "<",
                                "url": `/api${url}`,
                                "data": body
                            }
                            console.log(dbgOut)
                        }

                        return ({
                            body: body,
                            isError: response.status !== 200,
                        })
                    }
                )
            )
            .then(({body, isError}) => {
                if (isError) {
                    throw body;
                }

                return body;
            });
    };
});

export default http;
