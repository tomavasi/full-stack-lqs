import express from "express";
import chokidar from 'chokidar';
import dotenv from "dotenv";
dotenv.config();
import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import middleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpackConf from './webpack.config.js'
import backend from './server/index.js'
import { getFromCache, setToCache, clearCache } from './cache.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inProduction = process.env.NODE_ENV === 'production'

const port = process.env.PORT || 5555;
app.use('/api', (req, res, next) => backend(req, res, next))

const watcher = chokidar.watch('server');

watcher.on('ready', () => {
  watcher.on('all', () => {
    Object.keys(import.meta.cache).forEach((id) => {
      if (id.includes('server')) {
        // Clear the cache for the module
        clearCache(id);
      }
    });
  });
});

watcher.on('change', (path) => {
  const moduleId = `./${path.replace(/\\/g, '/')}`;
  if (getFromCache(moduleId)) {
    // Retrieve the module from the cache
    const module = getFromCache(moduleId);
    console.log(module.default);
  } else {
    // Import the module and cache it
    import(moduleId).then((module) => {
      setToCache(moduleId, module);
      console.log(module.default);
    });
  }
});

/**
 * For frontend use hot loading when in development, else serve the static content
 */
if (!inProduction) {

    const compiler = webpack(webpackConf('development', { mode: 'development' }))

    const devMiddleware = middleware(compiler)
    app.use(devMiddleware)
    app.use(hotMiddleware(compiler))
    app.use('*', (req, res, next) => {
        const filename = path.join(compiler.outputPath, 'index.html')
        devMiddleware.waitUntilValid(() => {
            compiler.outputFileSystem.readFile(filename, (err, result) => {
                if (err) return next(err)
                res.set('content-type', 'text/html')
                res.send(result)
                return res.end()
            })
        })
    })
} else {
    const DIST_PATH = path.resolve(__dirname, './dist')
    const INDEX_PATH = path.resolve(DIST_PATH, 'index.html')

    app.use(express.static(DIST_PATH))
    app.get('*', (req, res) => res.sendFile(INDEX_PATH))
}

app.listen(port, () => {
    console.log(`App is running again on port:${port}`)
    console.log(`http://localhost:${port}`)
});
