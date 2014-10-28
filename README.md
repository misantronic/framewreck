# frameWreck [![Build Status](https://travis-ci.org/misantronic/framewreck.svg?branch=master)](https://travis-ci.org/misantronic/framewreck) [![Dependency Status](https://gemnasium.com/misantronic/frameWreck.svg)](https://gemnasium.com/misantronic/frameWreck)

A lightweight modular JavaScript framework.

Modular structure featuring:
 - CSS Selectors
 - CSS Manipulation
 - DOM Manipulation
 - Traversing
 - AJAX-Requests
 - Events
 - Data 
 - Minified and GZipped only ~1 kb

## Install with Bower
```shell
$ bower install framewreck
```

## Embed

### All modules
```html
<script src="dist/frameWreck.min.js"></script>
```

**or**

### Module wise
```html
<script src="fw.core.min.js"></script>
<script>
// synchronously load modules 
F().require([
		'src/modules/events/fw.events.min.js',
		'src/modules/dom/fw.dom.min.js',
		'src/modules/css/fw.css.min.js',
		'src/modules/ajax/fw.ajax.min.js',
		'src/modules/data/fw.data.min.js'
	]);	

// all modules are loaded synchronously, 
// so you can chain module functions right away
// note: all modules are globally available after loading.
F('#id')
	.require([
		'src/modules/events/fw.events.min.js',
		'src/modules/data/fw.data.min.js'
	])
	.on('click', function() { alert('clicked!'); })
	.data('my favorite id');
</script>
```

## Modules

### Core: CSS Selectors
```javascript
F().require(['src/modules/css/fw.core.min.js']);

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
F().require(['src/modules/css/fw.core.min.js', 'src/modules/css/fw.css.min.js']);

// Set CSS
F('#id').css({ display: 'block', backgroundColor: 'blue', padding: '10px' });

// Get CSS
var cssValue = F('#id').css('padding') // outputs '10px'
```

### DOM Module
```javascript
F().require(['src/modules/css/fw.core.min.js', 'src/modules/dom/fw.dom.min.js']);

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

// Checkbox / Radio buttons
F('input.checkboxOrRadio').checked(true); 	// checks a checkbox or radio button
F('input.checkboxOrRadio').checked(false); 	// unchecks a checkbox or radio button
F('input.checkboxOrRadio').checked(); 		// return checkbox or radio button state

// Serialize
F('form').serialize(); // output an object containg all serialized form-field values

// Remove elements
F('#id').remove();
```

### Event Module
```javascript
F().require(['src/modules/css/fw.core.min.js', 'src/modules/events/fw.events.min.js']);

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
F().require(['src/modules/css/fw.core.min.js', 'src/modules/ajax/fw.ajax.min.js']);

F().ajax('get', 'http://server.com/api?id=1337', function(e){ console.log(e.responseText) });
F().ajax('post', 'http://server.com', function(e){ console.log(e.responseText) }, { name: '@misantronic' });
```

### Data Module
```javascript
F().require(['src/modules/css/fw.core.min.js', 'src/modules/data/fw.data.min.js']);

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