
const ansiStyle = require('ansi-styles');
const ansiEscapes = require('ansi-escapes');
const cliWidth = require('cli-width');
const cliHeight = require('./exports/cli-height');

const cbs = require('./exports/cli_bootstrap');
// to replace the cursor before liberate cli without scrolling console
let liberateCursor = function(_scope) {
  process.stdout.write(ansiEscapes.cursorTo(_scope.width, _scope.height) + ansiEscapes.eraseStartLine);
  process.stdout.write(ansiEscapes.cursorTo(0, _scope.height - 2) + ansiEscapes.eraseEndLine);
}

// object declaration
function Dashboard() {

  this.width = cliWidth();
  this.height = cliHeight();

  this.cbs = cbs.init(this.width, this.height);
  this.blocs = [];
  this.lScope = this;
  this.ansie = ansiEscapes;
  this.eventRegistered = [];

  liberateCursor(this.lScope);
}

Dashboard.prototype.blocTextCutter = function (_bloc,_text) {
  let blocInfo;
  if (typeof _bloc == 'string') {
    blocInfo = this.getBlocByName(_bloc)

  } else {
    blocInfo = this.getBloc(_bloc)

  }
  let w = blocInfo.w
  let h = blocInfo.h
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

Dashboard.prototype.initKeyboardEvents = function() {
  const readline = require('readline');
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
      process.stdout.write(this.ansie.clearScreen)
      process.exit();
    } else {
      for (var i = 0; i < this.eventRegistered.length; i++) {
        if (this.eventRegistered[i][0] == key.name) {
          this.eventRegistered[i][1](key);
        }
      }
    }


  });
}
// screen initialisation
Dashboard.prototype.setScreen = function(clear = true) {
  if (clear) {
    process.stdout.write(ansiEscapes.cursorTo(0, 0));
    for (var i = 0; i < this.height; i++) {
      for (var j = 0; j < this.width; j++) {
        process.stdout.write(' ')
      }
      process.stdout.write('\n')
    }

    liberateCursor(this.lScope);
  }

  return this;
}

// to write in a bloc
Dashboard.prototype.writeInBloc = function(_bloc, txt) {
  let blocInfo;
  if (typeof _bloc == 'string') {
    blocInfo = this.getBlocByName(_bloc)

  } else {
    blocInfo = this.getBloc(_bloc)

  }
  process.stdout.write(ansiEscapes.cursorTo(blocInfo.x, blocInfo.y))

  let lines = txt.split('\n');
  for (var i = 0; i < lines.length; i++) {
    let line = lines[i];
    process.stdout.write(ansiEscapes.cursorTo(Math.floor(blocInfo.x + ((blocInfo.w - line.length) / 2)), (i - 1 + Math.floor(blocInfo.y + (blocInfo.h - lines.length) / 2))));
    process.stdout.write(line)
  }
  liberateCursor(this.lScope);
  return this
}

// to display stats in a bloc
Dashboard.prototype.statInBloc = function(_bloc, stats) {
  if (!stats.title || !stats.maxValue || !stats.values) return;

  let blocInfo;
  if (typeof _bloc == 'string') {
    blocInfo = this.getBlocByName(_bloc)

  } else {
    blocInfo = this.getBloc(_bloc)
  }
  let percentChara = function(_v) {
    if (_v == ' ' || _v == '') return 0;

    let prctValue = _v * 100 / stats.maxValue;
    let nbRowChara = Math.round(prctValue * (blocInfo.h - 3) / 100);
    return nbRowChara
  }

  process.stdout.write(ansiEscapes.cursorTo(blocInfo.x, blocInfo.y))
  let valuesToDisplay = stats.values.slice(Math.max((stats.values.length) - (blocInfo.w - 2), 0), Math.max(stats.values.length, 0));

  for (var i = 0; i < (blocInfo.w - 2); i++) {
    if (i > valuesToDisplay.length) {
      break;
    }
    process.stdout.write(ansiEscapes.cursorTo((blocInfo.x + i) + 1, (blocInfo.y) + 1))

    for (var j = 0; j < percentChara(valuesToDisplay[i]); j++) {
      let p = 0
      for (var k = (blocInfo.h - 3); k > 1; k--) {
        if (percentChara(valuesToDisplay[i]) >= k) {
          process.stdout.write('█')
        } else {
          process.stdout.write(' ')
        }
        p++
        process.stdout.write(ansiEscapes.cursorTo((blocInfo.x + i) + 1, (blocInfo.y + p) + 1))
      }
    }
  }
  process.stdout.write(ansiEscapes.cursorTo((blocInfo.x) + 1, (blocInfo.y + (blocInfo.h - 3))))
  process.stdout.write(stats.title)

  liberateCursor(this.lScope);
  return this
}

// to display text with simple animation  loop in a bloc
Dashboard.prototype.writeInBlocLooper = function(_bloc, txt, db, nbloop = 10, interval = 250, persistent = true) {
  // if(Array.isArray(txt)){
  //   TODO array txt feature?
  // }
  var resultTxt = txt;
  var counter = 0;
  var i = setInterval(function() {
    db.writeInBloc(_bloc, resultTxt)
    if (counter === nbloop * txt.length) {
      clearInterval(i);
      if (!persistent) {
        db.clearBloc(_bloc)
      }
    }
    resultTxt = resultTxt.slice(1, resultTxt.length) + resultTxt.slice(0, 1)
    counter++;
  }, interval);

  return this
}

// to get blocs informations by id
Dashboard.prototype.getBloc = function(id) {
  return this.blocs[id];
}

// to get blocs informations by name
Dashboard.prototype.getBlocByName = function(name) {
  for (var i = 0; i < this.blocs.length; i++) {
    if (this.blocs[i].name == name) {

      return this.blocs[i]
    }
  }
  return null;
}

// to clear / clean a bloc
Dashboard.prototype.clearBloc = function(_bloc) {
  // process.stdout.write(ansiEscapes.scrollDown);
  // ,x,y,w,h
  let b;
  if (typeof _bloc == 'string') {
    b = this.getBlocByName(_bloc)

  } else {
    b = this.getBloc(_bloc)

  }
  let x = b.x;
  let y = b.y;
  let w = b.w;
  let h = b.h;
  process.stdout.write(ansiEscapes.cursorTo(x, y));
  for (var i = 1; i < h - 1; i++) {
    for (var j = 1; j < w - 1; j++) {
      if (i == 1 | i == h - 1 | j == 1 | j == w - 1) {
        process.stdout.write(ansiEscapes.cursorForward());
        // process.stdout.write(ansiEscapes.cursorForward());
      } else {
        process.stdout.write(' ');

      }
    }
    process.stdout.write(ansiEscapes.cursorTo(x, i + y));
  }
  liberateCursor(this.lScope);
  return this;
}

// to create a bloc
Dashboard.prototype.makeBloc = function(name, x, y, w, h) {
  // process.stdout.write(ansiEscapes.cursorHide);
  this.blocs.push(bloc(name, x, y, w, h));
  process.stdout.write(ansiEscapes.cursorTo(x, y));
  for (var i = 0; i < h; i++) {
    for (var j = 0; j < w; j++) {
      if (j == 0 || j == w - 1) {
        process.stdout.write('|');
      } else if (i == 0 || i == h - 1) {
        process.stdout.write('─');

      } else {
        process.stdout.write(ansiEscapes.cursorForward());

      }
    }
    process.stdout.write(ansiEscapes.cursorTo(x, i + y));
  }

  liberateCursor(this.lScope);
  return this;
}
Dashboard.prototype.registrerEvent = function(keyName, callBack) {
  this.eventRegistered.push([keyName, callBack])
  return this;
}

// a bloc
var bloc = function(name, x, y, w, h) {
  return {
    name: name,
    x: x,
    y: y,
    w: w,
    h: h,
  }
}
module.exports = Dashboard;
