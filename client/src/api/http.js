//
//
import { fetch } from 'whatwg-fetch';

import Config from '../constants/Config';

const http = {};

// TODO: add all methods
['GET', 'POST'].forEach((method) => {
    http[method.toLowerCase()] = (url, data, headers) => {
        console.log({
            "type": "http",
            "proc": "reQ >>",
            "url": `/api${url}`,
            "method": method,
            "headers": headers,
            "data": data
        })
        const formData = data &&
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
                response.json().then(
                    // (body) => ({
                    // body,
                    // isError: response.status !== 200,
                    // })
                    function (body) {
                        console.log( {
                            "type": "http",
                            "proc": "reS <<",
                            "url": `/api${url}`,
                            "data": body
                        })

                        return ({
                            body: body,
                            isError: response.status !== 200,
                        })
                    }
                ),
            )
            .then(({ body, isError }) => {
                if (isError) {
                    throw body;
                }

                return body;
            });
    };
});

export default http;
