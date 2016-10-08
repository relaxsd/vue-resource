/**
 * XDomain client (Internet Explorer).
 */

import Promise from '../../promise';
import { isFunction } from '../../util';

export default function (context, request) {
    return new Promise((resolve) => {

        var xdr = new XDomainRequest(), handler = ({type}) => {

            var status = 0;

            if (type === 'load') {
                status = 200;
            } else if (type === 'error') {
                status = 500;
            }

            resolve(request.respondWith(xdr.responseText, {status}));
        };

        request.abort = () => {
            xdr.abort();
            if (isFunction(request.abortCb)) {
                request.abortCb.call(context,request);
            }
        };

        xdr.open(request.method, request.getUrl());
        xdr.timeout = 0;
        xdr.onload = handler;
        xdr.onerror = handler;
        xdr.ontimeout = handler;
        xdr.onprogress = () => {};
        xdr.send(request.getBody());
    });
}
