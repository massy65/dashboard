

const cliWidth = require('cli-width');
const cliHeight = require('./exports/cli-height');
const Dashboard = require('./exports/dashboard');
const w = cliWidth();
const h = cliHeight();
const cbs = require('./exports/cli_bootstrap').init(w, h);

let dashboard = new Dashboard(w,h);

// test 1
dashboard.setScreen()
.makeBloc('title',0,0,cbs.bsbW(1),cbs.bsbH(6))
.makeBloc('bloc1',0,cbs.bsbH(6)-1,cbs.bsbW(3),cbs.bsbH(3))
.makeBloc('bloc2',cbs.bsbW(3),cbs.bsbH(6)-1,cbs.bsbW(3)*2,cbs.bsbH(3))
.writeInBloc('title', 'DASHBOARD OF THE DEATH')


// test 2
// dashboard.setScreen()
//           .makeBloc('title',0,0,cbs.bsbW(1),cbs.bsbH(6))
//           .makeBloc('bloc1',0,cbs.bsbH(6)-1,cbs.bsbW(3),cbs.bsbH(3))
//           .makeBloc('bloc1_2',0,cbs.bsbH(3)+cbs.bsbH(6)-1,cbs.bsbW(3),cbs.bsbH(3))
//           .makeBloc('bloc2',cbs.bsbW(3),cbs.bsbH(6)-1,cbs.bsbW(3)*2,cbs.bsbH(3)*2);
//
//
// var someReportExample = 'Rapport d Activitée\n'
//     someReportExample += '\n'
//     someReportExample += 'Pellentesque varius odio a felis dictum elementum.\n'
//     someReportExample += 'Sed convallis ornare viverra.\n'
//     someReportExample += 'Pellentesque auctor dolor sapien, a vehicula nisl gravida vel.\n'
//     someReportExample += 'Nunc auctor porta lacus eget elementum.\n'
//     someReportExample += 'Cras sed diam magna. Integer tristique nibh ac purus tempus vulputate.\n';
//
// dashboard.writeInBloc('title', 'DASHBOARD OF THE DEATH')
//           .writeInBloc('bloc1', 'TEM.\n18°\n\nHUM.\n50%')
//           .writeInBloc('bloc1_2', 'STATUS LIGHT\nON\n\nWATER LVL\n40%')
          // .writeInBloc('bloc2', someReportExample)


// // for ReadMe
// dashboard.setScreen()
// dashboard.makeBloc('bloc1', 0, 0, cbs.bsbW(2),4);
// dashboard.makeBloc('bloc2', cbs.bsbW(2), 0, cbs.bsbW(2),4);
// dashboard.makeBloc('bloc3', 0, 3, cbs.bsbW(1),7);
// dashboard.writeInBloc('bloc1', '\nHello World');
//
// dashboard.setScreen()
// .makeBloc('oeil1',0,0, cbs.bsbW(1),6)
