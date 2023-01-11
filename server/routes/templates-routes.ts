import { VcapServices } from '../vcap-services';
import { createProxyMiddleware } from 'http-proxy-middleware';

export const templatesApiProxy = (vcapServices: VcapServices, logger) => {
  return createProxyMiddleware({
    target: vcapServices.getApplicationUri('apm-template'),
    changeOrigin: true,
    pathRewrite: {
      ['^/api']: '',
    },
  });
};
