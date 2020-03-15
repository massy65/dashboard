

const cliWidth = require('cli-width');
const cliHeight = require('./exports/cli-height');
const Dashboard = require('./exports/dashboard');
const w = cliWidth();
const h = cliHeight();
const cbs = require('./exports/cli_bootstrap').init(w, h);

let dashboard = new Dashboard(w,h);

var blocTextCutter = function (_text, w, h) {
  let rW = w - 2;
  let count = Math.ceil(_text.length / rW)
  let cuttedText = ''
  let nbdecalage = 0
  for (var s = 0; s < count; s++) {
    let decalage = (_text.charAt(s*rW) == ' ')
    if(decalage)nbdecalage++;
    let beg = nbdecalage + s * rW
    let end = nbdecalage + (s * rW) + rW
    cuttedText += _text.substring(beg, end) + '\n'
  }
  return cuttedText;
}
// // test 1
// dashboard.setScreen()
// .makeBloc('title',0,0,cbs.bsbW(1),cbs.bsbH(6))
// .makeBloc('bloc1',0,cbs.bsbH(6)-1,cbs.bsbW(3),cbs.bsbH(3))
// .makeBloc('bloc2',cbs.bsbW(3),cbs.bsbH(6)-1,cbs.bsbW(3)*2,cbs.bsbH(3))
// .writeInBloc('title', 'DASHBOARD OF THE DEATH')


// // test 2
// dashboard.setScreen()
//           .makeBloc('title',0,0,cbs.bsbW(1),cbs.bsbH(6))
//           .makeBloc('bloc1',0,cbs.bsbH(6)-1,cbs.bsbW(3),cbs.bsbH(3))
//           .makeBloc('bloc1_2',0,cbs.bsbH(3)+cbs.bsbH(6)-1,cbs.bsbW(3),cbs.bsbH(3))
//           .makeBloc('bloc2',cbs.bsbW(3),cbs.bsbH(6)-1,cbs.bsbW(3)*2,cbs.bsbH(3)*2);
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
          .makeBloc('head',0,0,cbs.bsbW(1),cbs.bsbH(6))
          .makeBloc('light',0,cbs.bsbH(6)-1,cbs.bsbW(6),cbs.bsbH(6))
          .makeBloc('temp',cbs.bsbW(6),cbs.bsbH(6)-1,cbs.bsbW(6),cbs.bsbH(6))
          .makeBloc('humi',0,(cbs.bsbH(6)*2)-1,cbs.bsbW(6),cbs.bsbH(6))
          .makeBloc('acid',cbs.bsbW(6),(cbs.bsbH(6)*2)-1,cbs.bsbW(6),cbs.bsbH(6))
          .makeBloc('nutr',0,(cbs.bsbH(6)*3)-1,cbs.bsbW(6),cbs.bsbH(6))
          .makeBloc('wate',cbs.bsbW(6),(cbs.bsbH(6)*3)-1,cbs.bsbW(6),cbs.bsbH(6))
          .makeBloc('vent',0,(cbs.bsbH(6)*4)-1,cbs.bsbW(3),cbs.bsbH(6))
          .makeBloc('bloc2',cbs.bsbW(3),cbs.bsbH(6)-1,cbs.bsbW(2),cbs.bsbH(3)*2)
          .makeBloc('bloc3',cbs.bsbW(3)+cbs.bsbW(2),cbs.bsbH(6)-1,cbs.bsbW(6),cbs.bsbH(3))
          .makeBloc('bloc4',cbs.bsbW(3)+cbs.bsbW(2),cbs.bsbH(3)+cbs.bsbH(6)-1,cbs.bsbW(6),cbs.bsbH(3))
          .makeBloc('foot',0,(cbs.bsbH(6)*5)-1,cbs.bsbW(1),cbs.bsbH(6))


var someReportExample = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum dui eu justo rutrum, et maximus ex ornare. Ut hendrerit nisl nec posuere iaculis. Donec pulvinar, magna at auctor sagittis, neque ipsum rhoncus leo, eget varius justo nisl vel risus. Vivamus tempus neque quis luctus semper. Proin bibendum, elit eu ultrices accumsan, lacus purus vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum dui eu justo rutrum, et maximus ex ornare. Ut hendrerit nisl nec posuere iaculis. Donec pulvinar, magna at auctor sagittis, neque ipsum rhoncus leo, eget varius justo nisl vel risus. Vivamus tempus neque quis luctus semper. Proin bibendum, elit eu ultrices accumsan, lacus purus vestibulum.';

dashboard.writeInBloc('head', 'OVERVIEW INDOOR CULTURE')
          .writeInBloc('light', '\nLIGHT\nON')
          .writeInBloc('temp', '\nTEMP.\n18°')
          .writeInBloc('humi', '\nHUMI.\n55%')
          .writeInBloc('acid', '\nPH\n7.5')
          .writeInBloc('nutr', '\nLAST\n6h')
          .writeInBloc('wate', '\nLEVEL\n50%')
          .writeInBloc('vent', '\nVENT\nOFF')
          .writeInBloc('bloc2', blocTextCutter(someReportExample,dashboard.getBlocByName('bloc2').w))
          .statInBloc('bloc3', {title:'statistics',values:[4,5.5,2,6,3],maxValue:10})
          .statInBloc('bloc4', {title:'size',values:[4,5.5,6,7,6,5,6,7,8,9],maxValue:10})


// // for ReadMe
// dashboard.setScreen()
// dashboard.makeBloc('bloc1', 0, 0, cbs.bsbW(2),4);
// dashboard.makeBloc('bloc2', cbs.bsbW(2), 0, cbs.bsbW(2),4);
// dashboard.makeBloc('bloc3', 0, 3, cbs.bsbW(1),7);
// dashboard.writeInBloc('bloc1', '\nHello World');
//

// // animation
// dashboard.setScreen()
//           .makeBloc('oeil1',cbs.bsbW(6),cbs.bsbH(6), cbs.bsbW(6),cbs.bsbH(6))
//           .makeBloc('oeil2',cbs.bsbW(6)*4,cbs.bsbH(6), cbs.bsbW(6),cbs.bsbH(6))
//           .makeBloc('nez',cbs.bsbW(6)*2,(cbs.bsbH(6)*3)-2, cbs.bsbW(6)*2,cbs.bsbH(6))
//           .makeBloc('bouche',cbs.bsbW(6),(cbs.bsbH(6)*5)-2, cbs.bsbW(6)*4,cbs.bsbH(6))
//           .writeInBloc('oeil1', ' [] ')
//           .writeInBloc('oeil2', ' [] ')
//
// let eyesframes = [' [] ', '[]  ', ' [] ', '  []']
// var counter = 0;
// var nbframes = 12;
//
//
// dashboard.writeInBlocLooper('bouche', '      press any key to interact    ',dashboard, 3,100,true)
//
// const readline = require('readline');
// readline.emitKeypressEvents(process.stdin);
// process.stdin.setRawMode(true);
// process.stdin.on('keypress', (str, key) => {
//   if (key.ctrl && key.name === 'c') {
//     process.exit();
//   } else {
//     var i = setInterval(function(){
//         counter++;
//         dashboard.writeInBloc('oeil1', eyesframes[counter%eyesframes.length])
//         dashboard.writeInBloc('oeil2', eyesframes[counter%eyesframes.length])
//         if(counter === nbframes) {
//             counter = 0;
//             clearInterval(i);
//         }
//     }, 200);
//   }
// });
