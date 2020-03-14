

const cliWidth = require('cli-width');
const cliHeight = require('./exports/cli-height');
const Dashboard = require('./exports/dashboard');
const w = cliWidth();
const h = cliHeight();
const cbs = require('./exports/cli_bootstrap').init(w, h);

let dashboard = new Dashboard(w,h);

// // test 1
// dashboard.setScreen()
// .makeBloc('title',0,0,cbs.bsbW(1),cbs.bsbH(6))
// .makeBloc('bloc1',0,cbs.bsbH(6)-1,cbs.bsbW(3),cbs.bsbH(3))
// .makeBloc('bloc2',cbs.bsbW(3),cbs.bsbH(6)-1,cbs.bsbW(3)*2,cbs.bsbH(3))
// .writeInBloc('title', 'DASHBOARD OF THE DEATH')


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

// animation
dashboard.setScreen()
.makeBloc('oeil1',cbs.bsbW(6),cbs.bsbH(6), cbs.bsbW(6),cbs.bsbH(6))
.makeBloc('oeil2',cbs.bsbW(6)*4,cbs.bsbH(6), cbs.bsbW(6),cbs.bsbH(6))
.makeBloc('nez',cbs.bsbW(6)*2,(cbs.bsbH(6)*3)-2, cbs.bsbW(6)*2,cbs.bsbH(6))
.makeBloc('bouche',cbs.bsbW(6),(cbs.bsbH(6)*5)-2, cbs.bsbW(6)*4,cbs.bsbH(6))
.writeInBloc('oeil1', ' [] ')
.writeInBloc('oeil2', ' [] ')

let eyesframes = [' [] ', '[]  ', ' [] ', '  []']
var counter = 0;
var nbframes = 12;


dashboard.writeInBlocLooper('bouche', '      press any key to interact    ',dashboard, 3,100,true)

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else {
    // let t = setTimeout(function(){
    //   dashboard.clearBloc('nez')
    // },2000)
    // dashboard.writeInBloc('nez','XXXX')
    var i = setInterval(function(){
        counter++;
        dashboard.writeInBloc('oeil1', eyesframes[counter%eyesframes.length])
        dashboard.writeInBloc('oeil2', eyesframes[counter%eyesframes.length])
        if(counter === nbframes) {
            clearInterval(i);
        }
    }, 200);
  }
});
