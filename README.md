<h1><img src="https://raw.githubusercontent.com/google/material-design-icons/master/action/2x_web/ic_dashboard_black_24dp.png" valign="bottom"> frameWreck</h1>

A lightweight modular JavaScript framework.

[![Build Status](https://travis-ci.org/misantronic/frameWreck.svg?branch=master)](https://travis-ci.org/misantronic/frameWreck)

Modular structure featuring:
 - CSS Selectors
 - CSS Manipulation
 - DOM Manipulation
 - Traversing
 - AJAX-Requests
 - Events
 - Data

### Install with Bower
```shell
$ bower install bootstrap
```

### Usage:
```html
<script src="fw.core.min.js"></script>

<script>
// synchronously load modules 
F().require([
		'modules/events/fw.events.min.js',
		'modules/dom/fw.dom.min.js',
		'modules/css/fw.css.min.js',
		'modules/ajax/fw.ajax.min.js',
		'modules/data/fw.data.min.js'
	]);	

// all modules are loaded synchronously, 
// so you can chain module functions right away
F('#id')
	.require([
		'modules/events/fw.events.min.js',
		'modules/data/fw.data.min.js'
	])
	.on('click', function() { alert('clicked!'); })
	.data('my favorite id');
</script>
```
*Note:* All modules are globally available after loading.


### Core: CSS Selectors
```javascript
// IDs and classes
F('#id');
F('#id').find('.class');
F('#id .class').find('a');

// Index selectors
F('#id .class').get(1);
F('#id .class:0')
F('#id:1 .class:0 p')

// Pseudo classes
F('#id .class:first-child');
F('#id .class').find('a:first-of-type');
F('#id .class').find('a:last-of-type');
```

### CSS Module
```javascript
F().require(['modules/css/fw.css.min.js']);

// Set CSS
F('#id').css({ display: 'block', backgroundColor: 'blue', padding: '10px' });

// Get CSS
var cssValue = F('#id').css('padding') // outputs '10px'
```

### DOM Module
```javascript
F().require(['modules/dom/fw.dom.min.js']);

// Output HTML of a selector
var html = F('#id').find('.class').html();

// Set HTML of a selector
F('#id').find('.class').html('<a href="#">Link</a>');

// Append HTML/Text to a DOM-Element
F('#id').append('<a href="#">Link</a>');

// Move an existing DOM-Element to another
F('#id-2').appendTo('.class-1');

// Set/get value of an input/textarea
F('input').val('value');
var value = F('input').val();

// Set/get Select selected value
F('body').find('select').val(1)
var value = F('body').find('select').val();

// Remove elements
F('#id').remove();
```

### Event Module
```javascript
F().require(['modules/events/fw.events.min.js']);

var eventHandler = function(e) {
	console.log(e, e.detail); // output event and given parameter object
};

// common events
F('a.button').on('click', eventHandler);
F('a.button').on('mouseover', eventHandler);
...

// custom events
F('#id').on('myEvent', eventHandler);
F('#id').trigger('myEvent', { name: '@misantronic' } );
F('#id').off('myEvent', eventHandler);
```

### AJAX Module
```javascript
F().require(['modules/ajax/fw.ajax.min.js']);

F().ajax('get', 'http://server.com/api?id=1337', function(e){ console.log(e.responseText) });
F().ajax('post', 'http://server.com', function(e){ console.log(e.responseText) }, { name: '@misantronic' });
```

### Data Module
```javascript
F().require(['modules/data/fw.data.min.js']);

F('#id').data({ name: '@misantronic' });
F('#id').data() // output { name: '@misantronic' }
```

### Chaining
```javascript
F('#id')
	.find('.class')
	.html('test')
	.on('event', eventHandler)
	.trigger('event', { name: '@misantronic' } )
	.off('event', eventHandler);
```

---


[fw.core.packed.js] crushed with [RegPack]<br>
Configuration: No Math-Packing, all checkboxes off except "Reassign variable names except: F" 

[fw.core.packed.js]:https://github.com/misantronic/min/blob/master/framewreck/fw.core.packed.js
[RegPack]:http://siorki.github.io/regPack.html