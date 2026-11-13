import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';

function copyStaticAssetsPlugin() {
  return {
    name: 'copy-static-kala-assets',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const imagesSrc = path.resolve(__dirname, 'images');
      const imagesDest = path.resolve(distDir, 'images');
      const appSrc = path.resolve(__dirname, 'app.js');
      const appDest = path.resolve(distDir, 'app.js');

      if (fs.existsSync(imagesSrc)) {
        fs.cpSync(imagesSrc, imagesDest, { recursive: true });
      }
      if (fs.existsSync(appSrc)) {
        fs.copyFileSync(appSrc, appDest);
      }
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [copyStaticAssetsPlugin()],
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
