# NightVision

NightVision is Mobile Interactive Debugging System override `console.*`.

![Image](https://raw.githubusercontent.com/potato4d/nightvision/master/screenshot.png)

## Installation

```
$ npm install -D nightvision
```

## Usage

```
require("nightvision").init() // Ready.

consoe.log("text", 1, {hoge: 'aaa'}); // Support .log
consoe.error("text", 1, {hoge: 'aaa'}); // Support .error
```
