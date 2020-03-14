const ansiStyle = require('ansi-styles');
const ansiEscapes = require('ansi-escapes');
let liberateCursor = function(_scope){
  process.stdout.write(ansiEscapes.cursorTo(_scope.width,_scope.height) + ansiEscapes.eraseStartLine);
  process.stdout.write(ansiEscapes.cursorTo(0,_scope.height-2) + ansiEscapes.eraseEndLine);
}
function Dashboard(w, h, clear = false) {
  // console.log(ansiEscapes)
  // return;
  this.width = w;
  this.height = h;
  this.blocs = []

  // process.stdout.write(ansiEscapes.cursorHide);
  if (clear) {
    process.stdout.write(ansiEscapes.cursorTo(0,0));
    for (var i = 0; i < this.height; i++) {
      for (var j = 0; j < this.width; j++) {
        process.stdout.write(' ')
      }
      process.stdout.write('\n')
    }

    liberateCursor(this);
  }
}

Dashboard.prototype.setScreen = function() {
  // process.stdout.write(ansiEscapes.cursorSavePosition);
  // process.stdout.write(ansiEscapes.clearScreen + ansiEscapes.cursorUp());
  // console.log('w:',w ,'h',h);
  liberateCursor(this);

  return this;
}

Dashboard.prototype.writeInBloc = function(_bloc, txt) {
  let blocInfo;
  if (typeof _bloc == 'string') {
    blocInfo = this.getBlocByName(_bloc)

  } else {
    blocInfo = this.getBloc(_bloc)

  }
  // let blocInfo = this.getBloc(id);
  process.stdout.write(ansiEscapes.cursorTo(blocInfo.x, blocInfo.y))

  let lines = txt.split('\n');
  for (var i = 0; i < lines.length; i++) {
    let line = lines[i];
    process.stdout.write(ansiEscapes.cursorTo(Math.floor(blocInfo.x + ((blocInfo.w - line.length) / 2)), (i - 1 + Math.floor(blocInfo.y + (blocInfo.h - lines.length) / 2))));
    process.stdout.write(line)
  }
  liberateCursor(this);
  return this
}
Dashboard.prototype.getBloc = function(id) {
  return this.blocs[id];
}
Dashboard.prototype.getBlocByName = function(name) {
  for (var i = 0; i < this.blocs.length; i++) {
    if (this.blocs[i].name == name) {

      return this.blocs[i]
    }
  }
  return null;
}
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
  for (var i = 1; i < h-1; i++) {
    for (var j = 1; j < w-1; j++) {
      if (i == 1 | i == h-1 | j == 1 | j == w-1) {
        process.stdout.write(ansiEscapes.cursorForward());
        // process.stdout.write(ansiEscapes.cursorForward());
      } else {
        process.stdout.write(' ');

      }
    }
    process.stdout.write(ansiEscapes.cursorTo(x, i + y));
  }
  liberateCursor(this);
  return this;
}
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

  liberateCursor(this);
  return this;
}

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
