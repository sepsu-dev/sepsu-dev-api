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
    const possibleFiles = [
      `${moduleName}.routes.ts`,
      `${moduleName}.route.ts`,
      `${moduleName}.routes.js`,
      `${moduleName}.route.js`,
      'index.ts',
      'index.js'
    ];

    let routeFile = '';
    for (const file of possibleFiles) {
      const fullPath = path.join(modulesPath, moduleName, file);
      if (fs.existsSync(fullPath)) {
        routeFile = fullPath;
        break;
      }
    }

    if (routeFile) {
      try {
        const mod = require(routeFile);
        
        const routeHandler = mod.default || mod;
        const routePrefix = mod.prefix || `/${moduleName}`;

        if (routeHandler) {
          router.use(routePrefix, routeHandler);
          console.log(`✅ [AutoRoute] Registered: ${routePrefix} (from module: ${moduleName})`);
        }
      } catch (error) {
        console.error(`❌ [AutoRoute] Failed to load module '${moduleName}':`, error);
      }
    }
  }
}

loadRoutes();

export default router;