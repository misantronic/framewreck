frameWreck
=========

A lightweight *jQuery-like* JavaScript library (~1kb) featuring **CSS Selectors**, **CSS**, **DOM Manipulation/Traversing**, **AJAX-Requests** and **Events**.

### Usage:
```html
<script src="https://raw.githubusercontent.com/misantronic/min/master/framewreck/fw.min.js"></script>
```

### CSS Selectors
```javascript
// IDs and classes
F('#id');
F('#id').find('.class');
F('#id .class').find('a');

// get .class at index 1
F('#id .class').get(1);

// Pseudo classes
F('#id .class:first-child');
F('#id .class').find('a:first-of-type');
F('#id .class').find('a:last-of-type');
```

### DOM Manipulation/Traversing
```javascript
// Output HTML of a selector
var html = F('#id').find('.class').html();

// Set HTML of a selector
F('#id').find('.class').html('<a href="#">Link</a>');

// Append HTML/Text to a DOM-Element
F('#id').append('<a href="#">Link</a>');

// Move an existing DOM-Element to another
F('#id-2').appendTo('.class-1');

// Set / get value of an input/textarea
F('input').val('value');
var value = F('input').val();

// Set / get Select selected value
F('select').val(1)
var value = F('select').val();
```

### CSS
```javascript
// Set CSS
F('#id').css({ display: 'block', backgroundColor: 'blue', padding: '10px' });

// Get CSS
var cssValue = F('#id').css('padding') // outputs '10px'
```

### Events
```javascript
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

### AJAX
```javascript
F().ajax('get', 'http://server.com/api?id=1337', function(e){ console.log(e.responseText) });
F().ajax('post', 'http://server.com', function(e){ console.log(e.responseText) }, { name: '@misantronic' });
```

### Data-Binding
```javascript
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

#### Tasks
- [x] CSS Selectors
- [x] DOM Manipulation
- [x] Traversing
- [x] Events
- [x] AJAX
- [x] Data-Binding
- [ ] Other great stuff

---

[fw.packed.js] crushed with [RegPack]<br>
Configuration: No Math-Packing, all checkboxes off except "Reassign variable names except: F x l i j a e m q h d g G N" 

[fw.packed.js]:https://github.com/misantronic/min/blob/master/framewreck/fw.packed.js
[RegPack]:http://siorki.github.io/regPack.html