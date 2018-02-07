'use strict';
const uuidV1 = require('uuid/v1');
module.exports = () => {
  return async function requestLoggingDetails(context, next) {
    context.state.getRequestLoggingDetails = function getRequestLoggingDetails() {
      const requestDetails = {
        url: context.url,
        ip: context.ip,
        uuid:uuidV1(),
        userAgent: context.get('X-User-Agent') || context.get('User-Agent'),
        device: {
          name: context.request.device.name,
          type: context.request.device.type,
        },
      };

      if (context.request.device.parser && context.request.device.parser.useragent && context.request.device.parser.useragent.family !== 'Other') {
        requestDetails.device.browser = context.request.device.parser.useragent.toAgent();

        const osDetails = context.request.device.parser.useragent.os;
        if (osDetails && osDetails.family !== 'Other') {
          requestDetails.device.os = osDetails.toString();
        }
      }
      return requestDetails;
    };
    const s = Date.now()
    const requestDetails = context.state.getRequestLoggingDetails()
    KoaConfig.log.info(`Request[${requestDetails.uuid}] Path[${requestDetails.url}] started :${JSON.stringify(requestDetails.device)}`)
    await next();
    KoaConfig.log.info(`Request[${requestDetails.uuid}] Path[${requestDetails.url}] ended at ${Date.now()-s}ms`)
  };
};
