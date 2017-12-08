var http = require('http'),
  connect = require('connect'),
  serveStatic = require('serve-static'),
  url = require('url');
proxy = require('proxy-middleware'),
  cors = require('connect-cors'),
  path = require('path'),
  argv = require('yargs').argv,
  ngApimockUtil = require('ng-apimock/lib/utils'),
  ngApimock = require('ng-apimock')(),
  rimraf = require('rimraf');
var ngApimockPath = '.tmp/ng-apimock';
// var ngApimockPath = 'node_modules/ng-apimock/templates/interface';
// delete temp directory
rimraf.sync(ngApimockPath);
// run apimock processing
ngApimock.run({src: path.join(process.cwd(), 'mocks'), outputDir: path.join(process.cwd(), ngApimockPath)});
var port = argv.port || 8101;
console.log('Starting server on port', port);
var proxyOptions = url.parse('https://rqah8n9kv6.execute-api.us-west-2.amazonaws.com/beta/api');
// Disable SSL checking: (source: https://www.npmjs.com/package/ssl-root-cas, section Bad Ideas)
// - for this URL
proxyOptions.rejectUnauthorized = false;
// - for the whole server
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

ngApimock.watch("mocks");

connect()
  .use(cors({}))
  .use(ngApimockUtil.ngApimockRequest)
  .use('/mocking', serveStatic(path.join(process.cwd(), ngApimockPath)))
  .use('/api', proxy(proxyOptions))
  .listen(port);
