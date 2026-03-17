import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const modulesPath = path.join(__dirname, 'modules');

function loadRoutes() {
  const modules = fs.readdirSync(modulesPath).filter((file) => {
    return fs.statSync(path.join(modulesPath, file)).isDirectory();
  });

  for (const moduleName of modules) {
    const routeFile = path.join(modulesPath, moduleName, `${moduleName}.route.ts`);

    if (fs.existsSync(routeFile)) {
      try {
        const mod = require(routeFile);
        const routeHandler = mod.default || mod;
        const routePrefix = mod.prefix || `/${moduleName}`;

        if (routeHandler) {
          router.use(routePrefix, routeHandler);
        }
      } catch (error) {
        console.error(`❌ [AutoRoute] Failed to load module '${moduleName}':`, error);
      }
    }
  }
}

loadRoutes();

export default router;