

const cliWidth = require('cli-width');
const cliHeight = require('./exports/cli-height');
const Dashboard = require('./exports/dashboard');
const w = cliWidth();
const h = cliHeight();
const cbs = require('./exports/cli_bootstrap').init(w, h);

let dashboard = new Dashboard(w,h,true);


dashboard.setScreen()
.makeBloc('title',0,0,cbs.bsbW(1),cbs.bsbH(6))
.makeBloc('bloc1',0,cbs.bsbH(6)-1,cbs.bsbW(3),cbs.bsbH(3))
.makeBloc('bloc2',cbs.bsbW(3),cbs.bsbH(6)-1,cbs.bsbW(3)*2,cbs.bsbH(3))
.writeInBloc('title', 'DASHBOARD OF THE DEATH')
