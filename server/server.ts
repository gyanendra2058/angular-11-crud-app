
import express from 'express';
import serveStatic from 'serve-static';
import path from 'path';
import compression from 'compression';
import { Request, Response, NextFunction } from 'express';
import { VcapServices } from './vcap-services';
import { logger }   from 'apm-logger';
import dotenv from 'dotenv';
import { AppClusterService } from './app-cluster.service';
import { templatesApiProxy } from './routes/templates-routes';
import { bootstrap } from 'global-agent';

const { VCAP_SERVICES, VCAP_APPLICATION } =
  dotenv.config().parsed ?? process.env; // If local .env present then pick from there, otherwise pick from CF//Machine (Deployed) set env vars.

const vcapServices: VcapServices = new VcapServices(
  VCAP_SERVICES,
  VCAP_APPLICATION
);

// Splunk initialization
logger.init(
  vcapServices.getApplicationId(),
  vcapServices.getApplicationName(),
  vcapServices.getInstanceIndex()
);
const app = express();

const port = process.env.PORT || 3004;
const appName = 'Templates Microapp v2';

async function bootStrapApp() {
  const setCacheControl = (res: Response) => {
    res.setHeader('Cache-Control', 'public, max-age=604800');
  };

  app.use(compression());

  app.use(
    serveStatic(path.join(__dirname, '../../public'), {
      setHeaders: setCacheControl,
    })
  );

  app.use((req: Request, res: Response, next: NextFunction) => {
    logger.setContext(req, res, next);
    next();
  });


  app.use('/api', templatesApiProxy(vcapServices, logger));

  app.listen(port, () => {
    console.log(appName + ' started on port ' + port);
  });
}

if (process.env.NODE_ENV === 'local') {
  bootstrap();
  bootStrapApp();
} else {
  // Bootstrap the app in cluster mode in production
  AppClusterService.clusterize(bootStrapApp);
}
