/**
* Dashboard
* @author: Jean-Yves Chaillou
* @version: 1.0.4
* @since: 15.03.2020
* @see: https://github.com/kwabounga/dashboard
*
* @usage: use dashboard to print info in cli
* @contact: jeanyves.chaillou@gmail.com
*/

// get Modules
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


/**
* Dashboard
* @Object
* @return {Dashboard} -the constructor
*/

function Dashboard() {

  this.width = cliWidth();
  this.height = cliHeight();

  this.cbs = cbs.init(this.width, this.height);
  this.blocs = [];
  this.lScope = this;
  this.ansie = ansiEscapes;
  this.eventRegistered = [];
  this.currentLoopAnimation = [];

  liberateCursor(this.lScope);
}

/**
* setScreen
* @method clean the cli screen
* @return {Dashboard} - the dashboard object
*/
Dashboard.prototype.setScreen = function(clear = true) {
  if (clear) {
    process.stdout.write(ansiEscapes.cursorTo(0, 0));
    let out = ''
    for (var i = 0; i < this.height; i++) {
      for (var j = 0; j < this.width; j++) {
        // process.stdout.write(' ')
        out += ' '
      }
      // process.stdout.write('\n')
      out += '\n'
    }
    process.stdout.write(out)

    liberateCursor(this.lScope);
  }

  return this;
}


/* BLOC SYSTEM */

/**
* getBloc
* @method  to get blocs informations by id
* @param {int} is the bloc id
* @return {bloc} - the obj bloc informations
*/
Dashboard.prototype.getBloc = function(id) {
  return this.blocs[id];
}


/**
* getBlocByName
* @method  to get blocs informations by name
* @param {String} name the bloc name
* @return {bloc} - the obj bloc informations
*/
Dashboard.prototype.getBlocByName = function(name) {
  for (var i = 0; i < this.blocs.length; i++) {
    if (this.blocs[i].name == name) {

      return this.blocs[i]
    }
  }
  return null;
}


/**
* clearBloc
* @method to clear / clean a bloc
* @param {String | int} name the bloc name
* @return {Dashboard} - the dashboard object
*/
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
  let out = '';
  for (var i = 1; i < h - 1; i++) {
    for (var j = 1; j < w - 1; j++) {
      if (i == 1 | i == h - 1 | j == 1 | j == w - 1) {
        // process.stdout.write(ansiEscapes.cursorForward());
        out += ansiEscapes.cursorForward()
        // process.stdout.write(ansiEscapes.cursorForward());
      } else {
        // process.stdout.write(' ');
        out += ' '
      }
    }
    // process.stdout.write(ansiEscapes.cursorTo(x, i + y));
    out += ansiEscapes.cursorTo(x, i + y)
  }
  process.stdout.write(out);
  liberateCursor(this.lScope);
  return this;
}

/**
* makeBloc
* @method to declare / create a bloc
* @param {String | int} name the bloc name
* @param {int} x the x position of the bloc in chara/columns
* @param {int} y the y position of the bloc in lines/row
* @param {int} w the width of the bloc in chara/columns
* @param {int} h the height of the bloc in lines/row
* @return {Dashboard} - the dashboard object
*/
Dashboard.prototype.makeBloc = function(name, x, y, w, h) {
  // process.stdout.write(ansiEscapes.cursorHide);
  this.blocs.push(bloc(name, x, y, w, h));
  process.stdout.write(ansiEscapes.cursorTo(x, y));
  let out = '';
  for (var i = 0; i < h; i++) {
    for (var j = 0; j < w; j++) {
      if (j == 0 || j == w - 1) {
        // process.stdout.write('|');
        out += '|';
      } else if (i == 0 || i == h - 1) {
        // process.stdout.write('─');
        out += '─';

      } else {
        // process.stdout.write(ansiEscapes.cursorForward());
        out += ansiEscapes.cursorForward()
      }
    }
    // process.stdout.write(ansiEscapes.cursorTo(x, i + y));
    out += ansiEscapes.cursorTo(x, i + y)
  }
  process.stdout.write(out)
  liberateCursor(this.lScope);
  return this;
}


/**
* writeInBloc
* @method to write in a bloc
* @param {String | int} _bloc the bloc name or this id
* @param {String} txt the text | can be formated text
* @return {Dashboard} - the dashboard object
*/
Dashboard.prototype.writeInBloc = function(_bloc, txt) {
  let blocInfo;
  if (typeof _bloc == 'string') {
    blocInfo = this.getBlocByName(_bloc)

  } else {
    blocInfo = this.getBloc(_bloc)

  }
  process.stdout.write(ansiEscapes.cursorTo(blocInfo.x, blocInfo.y))

  let lines = txt.split('\n');
  let out = ''
  for (var i = 0; i < lines.length; i++) {
    let line = lines[i];
    out += ansiEscapes.cursorTo(Math.floor(blocInfo.x + ((blocInfo.w - line.length) / 2)), (i - 1 + Math.floor(blocInfo.y + (blocInfo.h - lines.length) / 2)));
    // process.stdout.write(ansiEscapes.cursorTo(Math.floor(blocInfo.x + ((blocInfo.w - line.length) / 2)), (i - 1 + Math.floor(blocInfo.y + (blocInfo.h - lines.length) / 2))));
    out += line
    // process.stdout.write(line)
  }
  process.stdout.write(out)
  liberateCursor(this.lScope);
  return this
}


/**
* writeInBlocLooper
* @method to display text with simple animation  loop in a bloc
* @param {String | int} _bloc the bloc name or this id
* @param {String} txt the text | can be formated text
* @param {Dashboard} db the dashboard object
* @param {int} nbloop [optional] the count of loop
* @param {int} interval [optional] the delay in ms between animation steps
* @param {boolean} persistence [optional] if you don't want erase the text at the end
* @return {Dashboard} - the dashboard object
*/
Dashboard.prototype.writeInBlocLooper = function(_bloc, txt, db, nbloop = 10, interval = 250, persistent = true, callBack = null) {
  var resultTxt = txt;
  var counter = 0;
  db.clearBloc(_bloc)
  if(db.currentLoopAnimation.length>0){
    clearInterval(db.currentLoopAnimation[1]);
    db.clearBloc(db.currentLoopAnimation[0])
    db.currentLoopAnimation = []
  }
  let i = setInterval(function() {
    db.writeInBloc(_bloc, resultTxt)
    if (counter === nbloop * txt.length) {
      clearInterval(i);
      if (!persistent) {
        db.clearBloc(_bloc)
      }
      if(callBack){
        callBack()
      }
    }
    db.currentLoopAnimation.push(_bloc)
    db.currentLoopAnimation.push(i)
    resultTxt = resultTxt.slice(1, resultTxt.length) + resultTxt.slice(0, 1)
    counter++;
  }, interval);

  return this
}


/**
* statInBloc
* @method to display stats in a bloc
* @param {String | int} _bloc the bloc name or this id
* @param {Object} stats - stats Object {title:string,maxValue:int,values:[int]}
* @return {Dashboard} - the dashboard object
*/
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
  let out = '';
  for (var i = 0; i < (blocInfo.w - 2); i++) {
    if (i > valuesToDisplay.length) {
      break;
    }
    // process.stdout.write(ansiEscapes.cursorTo((blocInfo.x + i) + 1, (blocInfo.y) + 1))
    out += ansiEscapes.cursorTo((blocInfo.x + i) + 1, (blocInfo.y) + 1)
    for (var j = 0; j < percentChara(valuesToDisplay[i]); j++) {
      let p = 0
      for (var k = (blocInfo.h - 3); k > 1; k--) {
        if (percentChara(valuesToDisplay[i]) >= k) {
          // process.stdout.write('█')
          out += '█'
        } else {
          // process.stdout.write(' ')
          out += ' '
        }
        p++
        // process.stdout.write(ansiEscapes.cursorTo((blocInfo.x + i) + 1, (blocInfo.y + p) + 1))
        out += ansiEscapes.cursorTo((blocInfo.x + i) + 1, (blocInfo.y + p) + 1)
      }
    }
  }

  process.stdout.write(out)
  process.stdout.write(ansiEscapes.cursorTo((blocInfo.x) + 1, (blocInfo.y + (blocInfo.h - 3))))
  process.stdout.write(stats.title)

  liberateCursor(this.lScope);
  return this
}



/**
* bloc
* @method bloc factory
* @param {String | int} name the bloc name
* @param {int} x the x position of the bloc in chara/columns
* @param {int} y the y position of the bloc in lines/row
* @param {int} w the width of the bloc in chara/columns
* @param {int} h the height of the bloc in lines/row
*/
var bloc = function(name, x, y, w, h) {
  return {
    name: name,
    x: x,
    y: y,
    w: w,
    h: h,
  }
}


/**
* blocTextCutter
* @method  to format a long text in a bloc
* @param {String|int} _bloc - the bloc name or this id
* @param {String}_text - the text would be format in bloc's dimensions
* @return {String} - the formated text
*/
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


/* EVENT SYSTEM */

/**
* registrerEvent
* @method  to register a keypress event in cli
* @param {String} keyName the key name
* @param {Function} callBack the function would be executed went the event is dispatched
* @return {Dashboard} - the dashboard object
*/
Dashboard.prototype.registrerEvent = function(keyName, callBack) {
  this.eventRegistered.push([keyName, callBack])
  return this;
}

/**
* initKeyboardEvents
* @method activate the kepress listener events
* @return {Dashboard} - the dashboard object
*/
Dashboard.prototype.initKeyboardEvents = function() {
  const readline = require('readline');
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
      console.log('exit')
      process.stdout.write(this.ansie.clearScreen)
      process.exit(0);
    } else {
      for (var i = 0; i < this.eventRegistered.length; i++) {
        if (this.eventRegistered[i][0] == key.name) {
          this.eventRegistered[i][1](key);
        }
      }
    }
  });
}

/**
* unRegistrerEvent
* @method  to remove a registered Event
* @param {String} keyName the event key name
* @return {Dashboard} - the dashboard object
*/
Dashboard.prototype.unRegistrerEvent = function(keyName) {
  // console.log(this.eventRegistered)
  let id = null
  for (var i = 0; i < this.eventRegistered.length; i++) {
    if (this.eventRegistered[i][0] == keyName) {
      id = i;
    }
  }
  if(id!== null){
    this.eventRegistered.splice(id, 1,)
  }
  // console.log(this.eventRegistered)
  return this;
}


// exportation
module.exports = Dashboard;
