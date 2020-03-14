# dashboard
simple cli dashboard


## create a dashboard in the CLI

dashboard clean the console
and give us a bloc system for print in cli

```js
// import dashboard module
const Dashboard = require('./exports/dashboard');
// create obj dashboard
// you can create a dashboard giving this width and height
let dashboard = new Dashboard(50,30)

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
// activating cli_bootstrap system
//
// first get w and h cli by activating cliWidth and cliHeight
const cliWidth = require('cli-width');
const cliHeight = require('./exports/cli-height');
const w = cliWidth();
const h = cliHeight();
// then initialize cbs system with it
const cbs = require('./exports/cli_bootstrap').init(w, h);

// now you can invoque cbs system

// the method
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

```js
// you can make basic text animation loop with writeInBlocLooper function
// le text will be loop 3 times and update aniamtion each 100 MS , last param is for persistence
dashboard.writeInBlocLooper('title', '      DASH BOARD OF THE DEATH    ',dashboard, 3,100,true)
```
