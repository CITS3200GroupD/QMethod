const forever = require('forever-monitor');

console.log('Starting Process');
const child = new (forever.Monitor)('server.js', {
  silent: false,
  args: ['deploy']
});

child.on('exit', function () {
  console.log('Exited');
});

child.start();
