const ansiStyle = require('ansi-styles');
const ansiEscapes = require('ansi-escapes');

function Dashboard(w,h) {
  this.width = w;
  this.height = h;
  this.blocs = []

  // process.stdout.write(ansiEscapes.cursorHide);
}

Dashboard.prototype.setScreen = function(){
  // process.stdout.write(ansiEscapes.cursorSavePosition);
  // process.stdout.write(ansiEscapes.clearScreen + ansiEscapes.cursorUp());
  // console.log('w:',w ,'h',h);
  process.stdout.write(ansiEscapes.clearScreen + ansiEscapes.cursorDown(this.height-1));

  return this;
}

Dashboard.prototype.writeInBloc = function(id, txt){
  let blocInfo =  this.getBloc(id);
  process.stdout.write(ansiEscapes.cursorTo(blocInfo.x,blocInfo.y))

  let lines = txt.split('\n');
  for (var i = 0; i < lines.length; i++) {
    let line = lines[i];
    process.stdout.write(ansiEscapes.cursorTo(Math.floor(blocInfo.x + ((blocInfo.w - line.length) / 2)), (i-1 + Math.floor(blocInfo.y + (blocInfo.h-lines.length)/2))));
    process.stdout.write(line)
  }
  process.stdout.write(ansiEscapes.cursorDown(this.height-1) + ansiEscapes.eraseStartLine);
  return this
}
Dashboard.prototype.getBloc = function(id){
  return this.blocs[id];
}
Dashboard.prototype.getBlocByName = function(name){
  for (var i = 0; i < this.blocs.length; i++) {
    if(this.blocs[i].name == name){

      return this.blocs[i]
    }
  }
  return null;
}
Dashboard.prototype.makeBloc = function(name,x,y,w,h){
  // process.stdout.write(ansiEscapes.cursorHide);
  this.blocs.push(bloc(name,x,y,w,h));
  process.stdout.write(ansiEscapes.cursorTo(x,y));
  for (var i = 0; i < h; i++) {
    for (var j = 0; j < w; j++) {
      if(i== 0 || i == h-1){
        process.stdout.write('*');

      } else if(j==0 || j== w-1 ){
        process.stdout.write('*');
      } else {
        process.stdout.write(ansiEscapes.cursorForward());

      }
    }
    process.stdout.write(ansiEscapes.cursorTo(x,i+y));
  }

  // process.stdout.write(ansiEscapes.cursorDown(this.height-1));
  // process.stdout.write(ansiEscapes.cursorShow);
  return this;
}

var bloc = function(name,x,y,w,h){
  return {
    name:name,
    x:x,
    y:y,
    w:w,
    h:h,
  }
}
module.exports = Dashboard;
