const fs = require('fs');
const path = require('path');
interface Options {
  exMocks?: string[] | RegExp[],
  mockPath?: string
}
module.exports = (options?: Options) => {
  const { exMocks = [], mockPath = './mock' } = options ?? {};
  return {
    name: 'vite-plugin-mock',
    configureServer(server) {
      console.log('mock server start');
      const mockData = matchingMockFile(mockPath).filter((item) => {
        return !exMocks.includes(item.url);
      });
      server.middlewares.use((req, res, next) => {
        const mock = mockData.find((item) => {
          return item.url === req.url && item.method === req.method.toLowerCase();
        });
        if (mock) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(mock.response(req, res)));
          return;
        }
        next()
      })
    }
  }
}

function matchingMockFile(mockPath) {
  const mockDir = path.resolve(process.cwd(), mockPath);
  const mockFiles = fs.readdirSync(mockDir);
  const mockData = mockFiles.map((file) => {
    const mockFile = require(path.resolve(mockDir, file));
    return mockFile;
  }).flat();
  return mockData;
}


