# framewreck [![Build Status](https://travis-ci.org/misantronic/framewreck.svg?branch=master)](https://travis-ci.org/misantronic/framewreck) [![Dependency Status](https://gemnasium.com/misantronic/frameWreck.svg)](https://gemnasium.com/misantronic/frameWreck)

**A lightweight modular JavaScript framework.**

Main features:
 - Minified and GZipped only ~1.5 kb
 - [CSS Selectors](#core-css-selectors)
 - [CSS Manipulation](#css-module)
 - [DOM Manipulation](#dom-module)
 - [Traversing](#dom-module)
 - [AJAX-Requests](#ajax-module)
 - [Events](#event-module)
 - [Data](#data-module)
 - [Chaining](#chaining)
 
Optional features:
 - [Animations](#animate-module)
 - [Bindings](#binding-module)

## Install with Bower
```shell
$ bower install framewreck
```

## Embed via CDN

You can use [this generator](http://rawgit.com/misantronic/framewreck/master/cdn/index.html) to choose from all available modules and generate a dynamic URL.

### all main modules
```html
<script src="//cdn.jsdelivr.net/g/framewreck"></script>
```

**or**

### module wise
```html
<script src="//cdn.jsdelivr.net/framewreck/latest/modules/core/fw.core.min.js"></script>
<script>
// asynchronously load other modules 
F().require([
		'//cdn.jsdelivr.net/framewreck/latest/modules/animate/fw.animate.min.js',
		'//cdn.jsdelivr.net/framewreck/latest/modules/dom/fw.dom.min.js',
		'...'
	], function() {
		// ...
	});
</script>
```

## Modules

### Core: CSS Selectors
```javascript
// load module
F().require(['dist/modules/core/fw.core.min.js']);

// IDs and classes
F('#id');
F('#id').find('.class');
F('#id .class').find('a');

// Index selectors
F('#id .class:0')
F('#id:1 .class:0 p')

// Pseudo classes
F('#id .class:first-child');
F('#id .class').find('a:first-of-type');
F('#id .class').find('a:last-of-type');
```

#### Selector methods
```javascript
// Index selector
F('#id .class').get(1);

// Next / Previous siblings
F('#id').next();
F('#id').prev();

// Parent elements
F('#id').parent();
```

### CSS module

```javascript
// load module
F().require(['dist/modules/core/fw.core.min.js', 'dist/modules/css/fw.css.min.js']);

// Set CSS
F('#id').css({ display: 'block', 'background-color': 'blue', padding: 10, width: 200 });
F('#id').css('background-color', 'blue');

// Get CSS
var cssValue = F('#id').css('padding') // outputs '10px'
```

### DOM module

```javascript
// load module
F().require(['dist/modules/core/fw.core.min.js', 'dist/modules/dom/fw.dom.min.js']);

// Output HTML of a selector
var html = F('#id').find('.class').html();

// Set HTML of a selector
F('#id').find('.class').html('<a href="#">Link</a>');

// Append HTML/Text to a DOM-Element
F('#id').append('<a href="#">Link</a>');

// Move an existing DOM-Element to another
F('#id-2').appendTo('.class-1');

// create HTML-Elements in F() constructor
F('<a href="#">Link</a>').appendTo('body');

// Set/get value of an input/textarea
F('input').val('value');
var value = F('input').val();

// Set/get Select selected value
F('body').find('select').val(1)
var value = F('body').find('select').val();

// Checkbox / Radio buttons
F('input.checkboxOrRadio').checked(true); 	// checks a checkbox or radio button
F('input.checkboxOrRadio').checked(false); 	// unchecks a checkbox or radio button
F('input.checkboxOrRadio').checked(); 		// return checkbox or radio button state

// Serialize
F('form').serialize(); // output an object containg all serialized form-field values

// Add / Remove classes
F('#id').addClass('myClass');
F('#id').removeClass('myClass');

// Remove elements
F('#id').remove();

// Attributes
F('#id').attr('id');					// return attribute
F('#id').attr('class', 'myClass');		// set attribute
F('#id').attr('data-test', 'myData');	// set custom attribute
```

### Event module

Add/Remove/Fire default or custom events using the browsers native event-system.

```javascript
// load module
F().require(['dist/modules/core/fw.core.min.js', 'dist/modules/events/fw.events.min.js']);

var eventHandler = function(e) {
	console.log(e, e.detail); // output event and given parameter object
};

// common events
F('a.button').on('click', eventHandler);
F('a.button').on('mouseover', eventHandler);
...

// custom events
F('#id').on('myEvent', eventHandler);
F('#id').fire('myEvent', { name: '@misantronic' } );
F('#id').off('myEvent', eventHandler);
```

### AJAX module

Make asynchronously XHR-Requests via GET/POST

```javascript
// load module
F().require(['dist/modules/core/fw.core.min.js', 'dist/modules/ajax/fw.ajax.min.js']);

F().ajax(
	'get', 
	'http://server.com/api?id=1337', 
	function(e) { 
		console.log(e.responseText) 
	});
	
F().ajax(
	'post', 
	'http://server.com', 
	function(e) { 
		console.log(e.responseText) 
	}, 
	{ name: '@misantronic' }
);
```

### Data module

The data module enables saving all types of data to the context using the dynamic DOM attribute structure.

```javascript
// load module
F().require(['dist/modules/css/fw.core.min.js', 'dist/modules/data/fw.data.min.js']);

F('#id').data('myObject', { name: '@misantronic' });
F('#id').data('myObject') // outputs { name: '@misantronic' }
```

### Chaining

Any method returning `F` can be chained to the next.

```javascript
// load module
F('#id')
	.find('.class')
	.html('test')
	.on('event', eventHandler)
	.fire('event', { name: '@misantronic' } )
	.off('event', eventHandler);
```

### Animate module

The animate module makes CSS3-Transforms and Animations super-easy using a unique synatx.<br>
The commands in the animation queue are invoked at the same time ( `[ 'X:5 Y:5 W:10' ]` ) or one after another ( `[ 'X:5' , 'Y:5', 'W:10' ]` ).

*Note:* This module is optional and not included in dist/framewreck.min.js<br>
Dependencies: [CSS](#css-module), [Events](#event-module), [Data](#data-module)

#### Basic examples

```javascript
// load module
F().require(['dist/modules/core/fw.core.min.js', 'dist/modules/events/fw.events.min.js', 'dist/modules/data/fw.data.min.js', 'dist/modules/animate/fw.animate.min.js']);

// animate( Array animationQueue )
// syntax: propery:value[[,duration],delay]

F('#id').animate( ['O:0'] ); 							// changes #id's opacity to 0
F('#id').animate( ['X:100'] ); 							// translates x #id 100 pixels
F('#id').animate( ['X:100 Y:100'] ); 					// translates x/y #id 100 pixels
F('#id').animate( ['X:100 Y:100', 'O:0.5', 'W:100'] ); 	// queuing: translates x/y #id 100 pixels, after that change the opacity to 0.5, after that change the width to 100px
F('#id').animate( ['S:2'] );							// scale #id to factor 2
F('#id').animate( ['R:30'] );							// rotate #id 30 deg

F('#id').animate( ['X:100,2,1'] );						// translates x #id 100 pixels with a duration of 2s and a delay of 1s
```

#### Shorthands

```javascript
$('#id').hide();		// non-animated hiding of #id
$('#id').show(1);		// fade in #id with a duration of 1s
$('#id').hide(0.5);		// hide #id with a duration of 0.5s
```

#### Callback

```javascript
F('#id').animate( [ 'O:0' ], function() {	// is invoked as soon as the animation stops
	this.css({ display: 'none' }) 
});
```

#### Easing

A cheatsheet with available easing functions can be found at [easings.net](http://easings.net).

```javascript
F('#id').animate( ['X:100'], 'ease-out' );
F('#id').animate( ['X:100'], function() { 
	alert("done") 
}, 'ease-out' );
```

#### Notes

All translations are relative to the contexts initial position

```javascript
F('#id').animate( ['X:100', 'X:100'] ); 		// #id is still at 100
```

#### Property Overview

Property | CSS | Example
--- | --- | ---
O | opacity | `F('#id').animate( ['O:0.5'] )`
X | translateX() | `F('#id').animate( ['X:50'] )`
Y | translateY() | `F('#id').animate( ['Y:-10'] )`
R | rotate() | `F('#id').animate( ['R:-90'] )`
S | scale() | `F('#id').animate( ['S:3'] )`
W | width | `F('#id').animate( ['W:100'] )`
H | height | `F('#id').animate( ['H:100'] )`
P | padding | `F('#id').animate( ['P:10'] )`
PT | padding-top | `F('#id').animate( ['PT:10'] )`
PR | padding-right | `F('#id').animate( ['PR:10'] )`
PB | padding-bottom | `F('#id').animate( ['PB:10'] )`
PL | padding-left | `F('#id').animate( ['PL:10'] )`
M | margin | `F('#id').animate( ['M:10'] )`
MT | margin-top | `F('#id').animate( ['MT:10'] )`
MR | margin-right | `F('#id').animate( ['MR:10'] )`
MB | margin-bottom | `F('#id').animate( ['MB:10'] )`
ML | margin-left | `F('#id').animate( ['ML:10'] )`

### Binding module

The binding-module makes it possible to bind values of DOM-elements in a bidirectional way.

*Note:* This module is optional and not included in dist/framewreck.min.js<br>
Dependencies: [Events](#event-module), [Dom](#dom-module)

#### Howto

First define a binding-field which is suppossed to be filled with data on the HTML-view.
Optionally, you can also define a form-element, which will be connected to your binding-field.
```html
<span data-bindings="name"></div>
...
<input type="text" id="inp_name">
```

Now, you bind your data to the binding-field
```javascript
// load module
F().require(['dist/modules/core/fw.core.min.js', 'dist/modules/events/fw.events.min.js', 'dist/modules/dom/fw.dom.min.js', 'dist/modules/bindings/fw.bindings.min.js']);

// register binding-field 'name', fill it with '@misantronic' and connect it to #inp_name
F('#inp_name').registerBindable( 'name', '@misantronic' );
```
The binding-field 'name' will now be filled with your data.
Also, If you change #inp_name, the binding-field will update automatically its value as well. You can leave that out if you don't have a form-element.

```javascript
// update binding-field (and form-element)
F().setBindable( 'name', 'David Skx' );

// get binding-field value
F().getBindable( 'name' );
```

## Contact and comments

If you have any questions, praise or contempt feel free to write me: <misantronic@posteo.se>.
Of course, you can file an issue if you find evil bugs.<br>
For the sake of keeping things simple and small, I did not take care of optimizing my scripts for crappy browsers like IE8 etc.