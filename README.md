# dashboard
simple cli dashboard


## create a dashboard in the CLI

dashboard clean the console
and give us a bloc system for print in cli

```js
// import dashboard module
const Dashboard = require('@kwabounga/cli_dashboard');
// create obj dashboard
// you can create a dashboard
let dashboard = new Dashboard()

// clean the console
dashboard.setScreen()
```


## bloc system
#### create a bloc
in js
```js
// create empty bloc on the dashboard
// you can create a bloc with this following parameters:
//
// dashboard.makeBloc('blocName', x, y, width, height);
dashboard.makeBloc('blocAlone', 0, 0, 25,10);
// give you a bloc at position column:0,row:0
// with a size of 25 char over 10 text lines
```
in cli
```sh
# like this
> |───────────────────────|
> |                       |
> |                       |
> |                       |
> |                       |
> |                       |
> |                       |
> |                       |
> |───────────────────────|
```
#### write in a bloc
in js
```js
// to write in a bloc use writeInBloc method with passing
// this name and what you want to print in params
// like this:

dashboard.writeInBloc('blocAlone', 'Hello World');
// the bloc system try to center the text in the bloc
```
in cli
```sh
# it'll give you
> |───────────────────────|
> |                       |
> |                       |
> |      Hello World      |
> |                       |
> |                       |
> |                       |
> |                       |
> |───────────────────────|
```
in js
```js
// also you can write with multilines in the bloc.
// you must separate lines with the '\n' char
// like this:

dashboard.writeInBloc('blocAlone', 'Hello World\nthe dashboard\nis amasing!');
// the bloc system try to center the text in the bloc
```

in cli
```sh
# it'll give you
> |───────────────────────|
> |                       |
> |      Hello World      |
> |     the dashboard     |
> |      is amasing!      |
> |                       |
> |                       |
> |                       |
> |───────────────────────|
```
### cli_bootstrap system

dashboard is more easier with cli_bootstrap (cbs) system
cbs give you a tools to generate dimensions as a bootstrap'like

cli_bootstrap using cli-width and cli-height modules for working  
***cli-width*** its make by Ilya Radchenko <ilya@burstcreations.com> **https://github.com/knownasilya/cli-width**  
cli-height its a copy of his module and give you the height of cli

```js
// you can access to cbs by invoking dashboard.cbs
let cbs = dashboard.cbs

// now you can invoque cbs system
// with the method
cbs.bsbW() // read "cli_bootstrap BootStrapBloc Width"
// use the twelve base columns system like bootstrap
// where 1 = size of bloc = cli width
//       2 = size of bloc = cli width / 2
//       12 = size of bloc = cli width / 12
// so
cbs.bsbW(1)
// return the size (in chara/columns) for a bloc of cli size
cbs.bsbW(2)
// return the size (in chara/columns) for a bloc of cli size / 2
```
So to make 'responsives blocs'
```js
dashboard.makeBloc('blocAlone', 0, 0, cbs.bsbW(1),3);
```
```sh
|──────────────────────────────────────────────────────────────────────|
|                                                                      |
|──────────────────────────────────────────────────────────────────────|
```
```js
dashboard.makeBloc('blocAlone', 0, 0, cbs.bsbW(2),3);
```
```sh
|──────────────────────────────────|
|                                  |
|──────────────────────────────────|
```
```js
// you can make multiple blocs
dashboard.makeBloc('bloc1', 0, 0, cbs.bsbW(2),3);
dashboard.makeBloc('bloc2', cbs.bsbW(2), 0, cbs.bsbW(2),3);
dashboard.makeBloc('bloc3', 0, 0, cbs.bsbW(2),3);
```
```sh
|──────────────────────────────────||──────────────────────────────────|
|                                  ||                                  |
|──────────────────────────────────||──────────────────────────────────|      
|──────────────────────────────────────────────────────────────────────|
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|──────────────────────────────────────────────────────────────────────|
```

```js
// you can write in each bloc by access with the name
dashboard.writeInBloc('bloc1', '\nHello World');
```
```sh
|──────────────────────────────────||──────────────────────────────────|
|           Hello World            ||                                  |      
|──────────────────────────────────||──────────────────────────────────|      
|──────────────────────────────────────────────────────────────────────|      
|                                                                      |      
|                                                                      |      
|                                                                      |      
|                                                                      |      
|──────────────────────────────────────────────────────────────────────|
```

### 'pipe'  feature

dashboard obj's functions return dashboard obj so you can chaine it
like this


```js
dashboard.setScreen()
.makeBloc('title',0,0,cbs.bsbW(1),cbs.bsbH(6))
.makeBloc('bloc1',0,cbs.bsbH(6)-1,cbs.bsbW(3),cbs.bsbH(3))
.makeBloc('bloc2',cbs.bsbW(3),cbs.bsbH(6)-1,cbs.bsbW(3)*2,cbs.bsbH(3))
.writeInBloc('title', 'DASHBOARD OF THE DEATH')
```


```sh


|──────────────────────────────────────────────────────────────────────|
|                                                                      |
|                        DASHBOARD OF THE DEATH                        |      
|                                                                      |      
|                                                                      |      
|──────────────────────────────────────────────────────────────────────|      
|──────────────────────||──────────────────────────────────────────────|      
|                      ||                                              |      
|                      ||                                              |      
|                      ||                                              |      
|                      ||                                              |      
|                      ||                                              |      
|                      ||                                              |      
|                      ||                                              |      
|                      ||                                              |      
|                      ||                                              |      
|                      ||                                              |      
|                      ||                                              |      
|──────────────────────||──────────────────────────────────────────────|
```

### extras
```js
// you can make basic text animation loop with writeInBlocLooper function
// le text will be loop 3 times and update aniamtion each 100 MS , last param is for persistence
dashboard.writeInBlocLooper('title', '      DASH BOARD OF THE DEATH    ',dashboard, 3,100,true)
```
```js
// you can display simples statistics in a bloc
// the method will display the most lasts informations as he can
dashboard.statInBloc('bloc4', {title:'size',values:[2,4,6,7,8,9,14,15.5,16,17,16,15,16,17,18,19],maxValue:25})
```
### helpers
```js
// you can format text  in a bloc
dashboard.blocTextCutter(_bloc: string, _text: String)
// /!\ return the formated text not the Dashboard /!\
```
```js
// you can get bloc informations
dashboard.getBloc(id: string)
dashboard.getBlocByName(name: string)
// return a bloc(name: string, x: int, y: int, w: int, h: int)
// /!\ return a bloc object not the Dashboard /!\
```

you can mix all features to get the board  you want
```sh


|──────────────────────────────────────────────────────────────────────|      
|                                                                      |      
|                        DASHBOARD OF THE DEATH                        |      
|                                                                      |      
|──────────────────────────────────────────────────────────────────────|
|──────────||──────────||──────────────────────────────────||──────────|      
|          ||          ||Lorem ipsum dolor sit amet, consec||          |      
|  LIGHT   ||  TEMP.   ||tetur adipiscing elit. Vestibulum ||        █ |      
|    ON    ||   18°    ||fermentum dui eu justo rutrum, et ||        ██|      
|          ||          ||maximus ex ornare. Ut hendrerit ni||       ███|      
|──────────||──────────||sl nec posuere iaculis. Donec pulv||      ████|      
                        |inar, magna at auctor sagittis, ne||     █████|      
|──────────||──────────||que ipsum rhoncus leo, eget varius||     █████|      
|          ||          ||justo nisl vel risus. Vivamus temp||    ██████|      
|  HUMI.   ||    PH    ||us neque quis luctus semper. Proin||   ███████|      
|   55%    ||   7.5    || bibendum, elit eu ultrices accums||  ████████|      
|          ||          ||an, lacus purus vestibulum. Lorem ||statistics|      
|──────────||──────────||psum dolor sit amet, consectetur a||──────────|      
                        |ipiscing elit. Vestibulum fermentu|
|──────────||──────────||m dui eu justo rutrum, et maximus ||──────────|      
|          ||          ||ex ornare. Ut hendrerit nisl nec p||          |      
|   LAST   ||  LEVEL   ||osuere iaculis. Donec pulvinar, ma||          |      
|    6h    ||   50%    ||na at auctor sagittis, neque ipsum||          |      
|          ||          || rhoncus leo, eget varius justo ni||        ██|      
|──────────||──────────||sl vel risus. Vivamus tempus neque|| █████████|      
                        | quis luctus semper. Proin bibendu||██████████|      
|──────────────────────||m, elit eu ultrices accumsan, lacu||██████████|      
|                      ||       s purus vestibulum.        ||██████████|      
|         VENT         ||                                  ||██████████|      
|         OFF          ||                                  ||██████████|      
|                      ||                                  ||size      |      
|──────────────────────||──────────────────────────────────||──────────|      
|──────────────────────────────────────────────────────────────────────|      
|                                                                      |      
|                                                                      |      
|──────────────────────────────────────────────────────────────────────|
```


### keypress events
```js
// in addition , dashboard give you a simple key board event system
//  to interact with cli by pressing the keyboard
// like this
// dashboard.registrerEvent(keyName: string, callBack: fn(key))
//
// so the following instruction prepare the dashboard to get keypress t event:
dashboard.registrerEvent('t', (key)=>{
  dashboard.writeInBloc('title', 'YOU PRESS THE ' + key.name + ' KEY!')
})
// the register can be chained
dashboard.registrerEvent('t', (key)=>{
  dashboard.writeInBloc('title', 'YOU PRESS THE ' + key.name + ' KEY!')
}).registrerEvent('b', (key)=>{
  dashboard.writeInBloc('bloc1', 'YOU PRESS THE ' + key.name + ' KEY!')
})
// then let activate the keypress listener
//
dashboard.initKeyboardEvents();

// the command ctrl + 'c' is registered to quit the app
```
