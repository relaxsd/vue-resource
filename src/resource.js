/**
 * Service for interacting with RESTful services.
 */

import Http from './http/index';
import { assign, each, merge } from './util';

export default function Resource(url, params, actions, options) {

    var self = this || {}, resource = {};

    actions = assign({},
        Resource.actions,
        actions
    );

    each(actions, (action, name) => {

        action = merge({url, params: assign({}, params)}, options, action);

        resource[name] = function () {
            return (self.$http || Http)(opts(action, arguments));
        };
    });

    return resource;
}

function opts(action, args) {

    var result = assign({}, action),
        options = {params:{}},
        body;

    switch (args.length) {

        case 2:

            // body, options
            body = args[0];
            assign(options, args[1]);

            break;

        case 1:

            if (/^(POST|PUT|PATCH)$/i.test(result.method)) {
                // For POST: single argument is body
                body = args[0];
            } else {
                // For GET: single argument is options
                assign(options, args[0]);
            }

            break;

        case 0:

            break;

        default:

            throw 'Expected up to 2 arguments [body, options], got ' + args.length + ' arguments';
    }

    result.body = body;

    // Copy the passed {options:params} in result.params and delete them from the options
    result.params = assign({}, result.params, options.params);
    delete options.params;

    // Add the rest of the {options} directly to the result
    assign(result, options);

    return result;
}

Resource.actions = {

    get: {method: 'GET'},
    save: {method: 'POST'},
    query: {method: 'GET'},
    update: {method: 'PUT'},
    patch: {method: 'PATCH'},
    remove: {method: 'DELETE'},
    delete: {method: 'DELETE'}

};
