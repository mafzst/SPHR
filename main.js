/**
 * Main JS file
 *
 * Initialize Electron App
 *
 * Released under GNU General Public Licence v3
 */

var app = require('app');
var BrowserWindow = require('browser-window');
var WebSocketServer = require('websocket').server;
var http = require('http');

/* Create a new http to handle Websockets request from Chrome extension */
var server = http.createServer(function(request, response) {
  /* Send dummy response for those who try to access it through HTTP */
  response.write('SPHR is listening on port 3615 (Minitel Power!)');
  response.end();
})
server.listen(3615);

/* Add the websocket server it self */
wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
});

/* Require io-js to communicate with the app front through the same server */
var io = require('socket.io')(server);

var opts = {
  baseUrl: '',
  profilerToken: ''
}
/* Start the crash reporter */
require('crash-reporter').start();

var ioSocket;

/* Handle app quitting */
app.on('window-all-closed', function() {
  if(process.platform != 'darwin') {
    app.quit();
  }
});

/* When app fully initialized */
app.on('ready', function() {
  /* Create new Window */
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    title: 'Symfony Profiler Hot Reload',
    icon: './public/icon.png'
  });
  mainWindow.maximize();

  mainWindow.setMenu(null);

  /* Load window content */
  mainWindow.loadUrl('file://' + __dirname + '/public/built/index.html');

  /* Uncomment this line to open DevTools at app start */
  mainWindow.openDevTools();

  /* Handle window exiting */
  mainWindow.on('closed', function() {
    mainWindow = null;
  });

});

/* When receiving connection from outside */
wsServer.on('request', function(request) {
  /* Reject request if not come from Chrome ext */
  if(!isOriginAllowed(request.origin)) {
    request.reject();
    return;
  }

  var connection = request.accept();

  /* When receiving message from Chrome Ext */
  connection.on('message', function(message) {
    /* Update config */
    var newConfig = String(message.utf8Data).split("+");
    opts.url = newConfig[0];
    opts.token = newConfig[1];

    /* Debug */
    //console.log("[ BACK] : New config received : " + opts.url + opts.token);

    /* Send actualisation message to app front */
    if(ioSocket) {
      ioSocket.emit('newConfig', opts);
    }
  });
});

/* When app front connected */
io.on('connection', function(socket) {
  ioSocket = socket;
})
/* @TODO : Check origin more securely ! */
function isOriginAllowed(origin) {
  console.log(origin);
  return true;
}
