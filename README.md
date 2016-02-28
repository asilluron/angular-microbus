# angular-microbus
[![Circle CI](https://circleci.com/gh/asilluron/angular-microbus/tree/master.svg?style=shield)](https://circleci.com/gh/asilluron/angular-microbus/tree/master)

[![Join the chat at https://gitter.im/asilluron/angular-microbus](https://badges.gitter.im/asilluron/angular-microbus.svg)](https://gitter.im/asilluron/angular-microbus?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


Microbus service for angular. 100% ES6 and 100% Tested

## Usage
Import the 'microbus' module and begin using the message bus
```
let myApp = angular.module('myApp', ['microbus']);
```

After importing the microbus module, you can use the microbus service anywhere in your app

### Push to the bus
```
function(scope, microbus) {
  microbus.push({some: 'data'}, {key: 'org.namespace'});
}
```

## Consume from the bus
```
function(scope, microbus) {
  var cb = data => { console.log(`new color added: ${data}!`) };
  microbus.consume(cb, {key: colors});

  // microbus.push('blue', {key: 'org.namespace'}); --> 'new color added: blue!'
}
```


## Development
```
npm install
npm run tdd
```
