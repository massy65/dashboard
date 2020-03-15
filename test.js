

// const cliWidth = require('cli-width');
// const cliHeight = require('./exports/cli-height');
const Dashboard = require('./index');
// const w = cliWidth();
// const h = cliHeight();
// const cbs = require('./exports/cli_bootstrap').init(w, h);

let dashboard = new Dashboard();

// var blocTextCutter = function (_text, w, h) {
//   let rW = w - 2;
//   let count = Math.ceil(_text.length / rW)
//   let cuttedText = ''
//   let nbdecalage = 0
//   for (var s = 0; s < count; s++) {
//     let decalage = (_text.charAt(s*rW) == ' ')
//     if(decalage)nbdecalage++;
//     let beg = nbdecalage + s * rW
//     let end = nbdecalage + (s * rW) + rW
//     cuttedText += _text.substring(beg, end) + '\n'
//   }
//   return cuttedText;
// }
// // test 1
// dashboard.setScreen()
// .makeBloc('title',0,0,dashboard.cbs.bsbW(1),dashboard.cbs.bsbH(6))
// .makeBloc('bloc1',0,dashboard.cbs.bsbH(6)-1,dashboard.cbs.bsbW(3),dashboard.cbs.bsbH(3))
// .makeBloc('bloc2',dashboard.cbs.bsbW(3),dashboard.cbs.bsbH(6)-1,dashboard.cbs.bsbW(3)*2,dashboard.cbs.bsbH(3))
// .writeInBloc('title', 'DASHBOARD OF THE DEATH')


// // test 2
// dashboard.setScreen()
//           .makeBloc('title',0,0,dashboard.cbs.bsbW(1),dashboard.cbs.bsbH(6))
//           .makeBloc('bloc1',0,dashboard.cbs.bsbH(6)-1,dashboard.cbs.bsbW(3),dashboard.cbs.bsbH(3))
//           .makeBloc('bloc1_2',0,dashboard.cbs.bsbH(3)+dashboard.cbs.bsbH(6)-1,dashboard.cbs.bsbW(3),dashboard.cbs.bsbH(3))
//           .makeBloc('bloc2',dashboard.cbs.bsbW(3),dashboard.cbs.bsbH(6)-1,dashboard.cbs.bsbW(3)*2,dashboard.cbs.bsbH(3)*2);
//
//
// var someReportExample = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum dui eu justo rutrum, et maximus ex ornare. Ut hendrerit nisl nec posuere iaculis. Donec pulvinar, magna at auctor sagittis, neque ipsum rhoncus leo, eget varius justo nisl vel risus. Vivamus tempus neque quis luctus semper. Proin bibendum, elit eu ultrices accumsan, lacus purus vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum dui eu justo rutrum, et maximus ex ornare. Ut hendrerit nisl nec posuere iaculis. Donec pulvinar, magna at auctor sagittis, neque ipsum rhoncus leo, eget varius justo nisl vel risus. Vivamus tempus neque quis luctus semper. Proin bibendum, elit eu ultrices accumsan, lacus purus vestibulum.';
//
// dashboard.writeInBloc('title', 'DASHBOARD OF THE DEATH')
//           .writeInBloc('bloc1', 'TEM.\n18°\n\nHUM.\n50%')
//           .writeInBloc('bloc1_2', 'STATUS LIGHT\nON\n\nWATER LVL\n40%')
//           .writeInBloc('bloc2', blocTextCutter(someReportExample,dashboard.getBlocByName('bloc2').w))

// █ ▄ _ ... statistiques ?
// test 3
dashboard.setScreen()
          .makeBloc('head',0,0,dashboard.cbs.bsbW(1),dashboard.cbs.bsbH(6))
          .makeBloc('light',0,dashboard.cbs.bsbH(6)-1,dashboard.cbs.bsbW(6),dashboard.cbs.bsbH(6))
          .makeBloc('temp',dashboard.cbs.bsbW(6),dashboard.cbs.bsbH(6)-1,dashboard.cbs.bsbW(6),dashboard.cbs.bsbH(6))
          .makeBloc('humi',0,(dashboard.cbs.bsbH(6)*2)-1,dashboard.cbs.bsbW(6),dashboard.cbs.bsbH(6))
          .makeBloc('acid',dashboard.cbs.bsbW(6),(dashboard.cbs.bsbH(6)*2)-1,dashboard.cbs.bsbW(6),dashboard.cbs.bsbH(6))
          .makeBloc('nutr',0,(dashboard.cbs.bsbH(6)*3)-1,dashboard.cbs.bsbW(6),dashboard.cbs.bsbH(6))
          .makeBloc('wate',dashboard.cbs.bsbW(6),(dashboard.cbs.bsbH(6)*3)-1,dashboard.cbs.bsbW(6),dashboard.cbs.bsbH(6))
          .makeBloc('vent',0,(dashboard.cbs.bsbH(6)*4)-1,dashboard.cbs.bsbW(3),dashboard.cbs.bsbH(6))
          .makeBloc('bloc2',dashboard.cbs.bsbW(3),dashboard.cbs.bsbH(6)-1,dashboard.cbs.bsbW(2),dashboard.cbs.bsbH(3)*2)
          .makeBloc('bloc3',dashboard.cbs.bsbW(3)+dashboard.cbs.bsbW(2),dashboard.cbs.bsbH(6)-1,dashboard.cbs.bsbW(6),dashboard.cbs.bsbH(3))
          .makeBloc('bloc4',dashboard.cbs.bsbW(3)+dashboard.cbs.bsbW(2),dashboard.cbs.bsbH(3)+dashboard.cbs.bsbH(6)-1,dashboard.cbs.bsbW(6),dashboard.cbs.bsbH(3))
          .makeBloc('foot',0,(dashboard.cbs.bsbH(6)*5)-1,dashboard.cbs.bsbW(1),dashboard.cbs.bsbH(6))


var someReportExample = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum dui eu justo rutrum, et maximus ex ornare. Ut hendrerit nisl nec posuere iaculis. Donec pulvinar, magna at auctor sagittis, neque ipsum rhoncus leo, eget varius justo nisl vel risus. Vivamus tempus neque quis luctus semper. Proin bibendum, elit eu ultrices accumsan, lacus purus vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum dui eu justo rutrum, et maximus ex ornare. Ut hendrerit nisl nec posuere iaculis. Donec pulvinar, magna at auctor sagittis, neque ipsum rhoncus leo, eget varius justo nisl vel risus. Vivamus tempus neque quis luctus semper. Proin bibendum, elit eu ultrices accumsan, lacus purus vestibulum.';

dashboard.writeInBloc('head', 'OVERVIEW INDOOR CULTURE')
          .writeInBloc('light', '\nLIGHT\nON')
          .writeInBloc('temp', '\nTEMP.\n18°')
          .writeInBloc('humi', '\nHUMI.\n55%')
          .writeInBloc('acid', '\nPH\n7.5')
          .writeInBloc('nutr', '\nLAST\n6h')
          .writeInBloc('wate', '\nLEVEL\n50%')
          .writeInBloc('vent', '\nVENT\nOFF')
          .writeInBloc('bloc2', dashboard.blocTextCutter('bloc2',someReportExample))
          .statInBloc('bloc3', {title:'humi. /100',values:[40,55,20,60,30,0,10,0,10,20,30,40,50,60,70,90,80],maxValue:100})
          .statInBloc('bloc4', {title:'size / 150',values:[10,15,20,25,30,45,50,60,70,100,110,120,130,130,140,142,145],maxValue:150})
          .registrerEvent('t', ()=>{
            dashboard.writeInBlocLooper('foot', '   some action with t key     ', dashboard, 1, 300, false)
          })
          .registrerEvent('k', ()=>{
            dashboard.writeInBlocLooper('foot', '   some action with k key     ', dashboard, 3, 100, false)
          })
          .initKeyboardEvents();

// // for ReadMe
// dashboard.setScreen()
// dashboard.makeBloc('bloc1', 0, 0, dashboard.cbs.bsbW(2),4);
// dashboard.makeBloc('bloc2', dashboard.cbs.bsbW(2), 0, dashboard.cbs.bsbW(2),4);
// dashboard.makeBloc('bloc3', 0, 3, dashboard.cbs.bsbW(1),7);
// dashboard.writeInBloc('bloc1', '\nHello World');
//

// // animation
// dashboard.setScreen()
//           .makeBloc('oeil1',dashboard.cbs.bsbW(6),dashboard.cbs.bsbH(6), dashboard.cbs.bsbW(6),dashboard.cbs.bsbH(6))
//           .makeBloc('oeil2',dashboard.cbs.bsbW(6)*4,dashboard.cbs.bsbH(6), dashboard.cbs.bsbW(6),dashboard.cbs.bsbH(6))
//           .makeBloc('nez',dashboard.cbs.bsbW(6)*2,(dashboard.cbs.bsbH(6)*3)-2, dashboard.cbs.bsbW(6)*2,dashboard.cbs.bsbH(6))
//           .makeBloc('bouche',dashboard.cbs.bsbW(6),(dashboard.cbs.bsbH(6)*5)-2, dashboard.cbs.bsbW(6)*4,dashboard.cbs.bsbH(6))
//           .writeInBloc('oeil1', ' [] ')
//           .writeInBloc('oeil2', ' [] ')
//
// let eyesframes = [' [] ', '[]  ', ' [] ', '  []']
// var counter = 0;
// var nbframes = 12;
//
//
// dashboard.writeInBlocLooper('bouche', '      press any key to interact    ',dashboard, 3,100,true)

// const readline = require('readline');
// readline.emitKeypressEvents(process.stdin);
// process.stdin.setRawMode(true);
// process.stdin.on('keypress', (str, key) => {
//   if (key.ctrl && key.name === 'c') {
//     process.stdout.write(dashboard.ansie.clearScreen)
//     process.exit();
//   } else {
//     // var i = setInterval(function(){
//     //     counter++;
//     //     dashboard.writeInBloc('oeil1', eyesframes[counter%eyesframes.length])
//     //     dashboard.writeInBloc('oeil2', eyesframes[counter%eyesframes.length])
//     //     if(counter === nbframes) {
//     //         counter = 0;
//     //         clearInterval(i);
//     //     }
//     // }, 200);
//   }
// });
