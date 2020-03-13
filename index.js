

const cliWidth = require('cli-width');
const cliHeight = require('./exports/cli-height');
const Dashboard = require('./exports/dashboard');
const tty = require('tty');


// console.log(cliHeight())
// console.log(cliWidth())
// console.log(process.env)
// console.log(process.stdout);


let w = cliWidth();
let h = cliHeight();
let dashboard = new Dashboard(w,h);

dashboard.setScreen()
          .makeBloc('topleft',0,0,w/2,(h/2)-1)
          .makeBloc('topright',w/2,0,w/2,(h/2)-1)
          .makeBloc('bottomleft',0,h/2,w/2,(h/2)-1)
          .makeBloc('bottomright',w/2,h/2,w/2,(h/2)-1)
          .writeInBloc(0, 'hello\nbiloute\nc\'est la mer noire');

// console.log('bloc', dashboard.getBloc(0))
// console.log('bloc', dashboard.getBlocByName('bottomleft'))
