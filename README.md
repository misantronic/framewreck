# framewreck [![Build Status](https://travis-ci.org/misantronic/framewreck.svg?branch=master)](https://travis-ci.org/misantronic/framewreck) [![Dependency Status](https://gemnasium.com/misantronic/frameWreck.svg)](https://gemnasium.com/misantronic/frameWreck)

> When [jQuery](http://jquery.com) gets too bulky – wreck it up with framewreck.

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
 - [Template-Engine](#template-engine)

## Install with Bower
```shell
$ bower install framewreck
```

## Embed via CDN

You can use [this generator](http://rawgit.com/misantronic/framewreck/master/cdn/index.html) to choose from all available modules and generate a dynamic URL.

### main modules
```html
<script src="//cdn.jsdelivr.net/g/framewreck"></script>
```

### all modules
```html
<script src="//cdn.jsdelivr.net/framewreck/latest/framewreck.all.js"></script>
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
F().require(
	[
		'//cdn.jsdelivr.net/framewreck/latest/modules/core/fw.core.min.js'
	], function() {

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
	});
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

---

### CSS module

```javascript
// load module
F().require(
	[
		'//cdn.jsdelivr.net/framewreck/latest/modules/core/fw.core.min.js', 
		'//cdn.jsdelivr.net/framewreck/latest/modules/css/fw.css.min.js'
	], function() {

		// Set CSS
		F('#id').css({ display: 'block', 'background-color': 'blue', padding: 10, width: 200 });
		F('#id').css('background-color', 'blue');
		
		// Get CSS
		var cssValue = F('#id').css('padding') // outputs '10px'
		
	});
```

---

### DOM module

```javascript
// load module
F().require(
	[
		'//cdn.jsdelivr.net/framewreck/latest/modules/core/fw.core.min.js', 
		'//cdn.jsdelivr.net/framewreck/latest/modules/dom/fw.dom.min.js'
	], function() {

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
	
	});
```

---

### Event module

Add/Remove/Fire default or custom events using the browsers native event-system.

```javascript
// load module
F().require(
	[
		'//cdn.jsdelivr.net/framewreck/latest/modules/core/fw.core.min.js', 
		'//cdn.jsdelivr.net/framewreck/latest/modules/events/fw.events.min.js'
	], function() {

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
		
	});
```

---

### AJAX module

Make asynchronously XHR-Requests via GET/POST

```javascript
// load module
F().require(
	[
		'//cdn.jsdelivr.net/framewreck/latest/modules/css/fw.core.min.js', 
		'//cdn.jsdelivr.net/framewreck/latest/modules/ajax/fw.ajax.min.js'
	], function() {

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
		
	});
```

---

### Data module

The data module enables saving all types of data to the context using the dynamic DOM attribute structure.

```javascript
// load module
F().require(
	[
		'//cdn.jsdelivr.net/framewreck/latest/modules/css/fw.core.min.js', 
		'//cdn.jsdelivr.net/framewreck/latest/modules/data/fw.data.min.js'
	], function() {
		
		F('#id').data('myObject', { name: '@misantronic' });
		F('#id').data('myObject') // outputs { name: '@misantronic' }
	
	});
```

---

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

---

### Animate module

The animate module makes CSS3-Transforms and Animations super-easy using a unique synatx.<br>
The commands in the animation queue are invoked at the same time ( `[ 'X:5 Y:5 W:10' ]` ) or one after another ( `[ 'X:5' , 'Y:5', 'W:10' ]` ).

*Note:* This module is optional and not included in dist/framewreck.min.js<br>
Dependencies: [CSS](#css-module), [Events](#event-module), [Data](#data-module)

#### Basic examples

```javascript
// load module
F().require(
	[
		'//cdn.jsdelivr.net/framewreck/latest/modules/core/fw.core.min.js', 
		'//cdn.jsdelivr.net/framewreck/latest/modules/css/fw.css.min.js', 
		'//cdn.jsdelivr.net/framewreck/latest/modules/events/fw.events.min.js', 
		'//cdn.jsdelivr.net/framewreck/latest/modules/data/fw.data.min.js', 
		'//cdn.jsdelivr.net/framewreck/latest/modules/animate/fw.animate.min.js'
	], function() {

		// animate( Array animationQueue )
		// syntax: propery:value[[,duration],delay]
		
		F('#id').animate( ['O:0'] ); 							// changes #id's opacity to 0
		F('#id').animate( ['X:100'] ); 							// translates x #id 100 pixels
		F('#id').animate( ['X:100 Y:100'] ); 					// translates x/y #id 100 pixels
		F('#id').animate( ['X:100 Y:100', 'O:0.5', 'W:100'] ); 	// queuing: translates x/y #id 100 pixels, after that change the opacity to 0.5, after that change the width to 100px
		F('#id').animate( ['S:2'] );							// scale #id to factor 2
		F('#id').animate( ['R:30'] );							// rotate #id 30 deg
		
		F('#id').animate( ['X:100,2,1'] );						// translates x #id 100 pixels with a duration of 2s and a delay of 1s
	
	});
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

---

### Binding module

The binding-module makes it possible to bind values of DOM-elements in a bidirectional way.

*Note:* This module is optional and not included in dist/framewreck.min.js<br>
Dependencies: [Events](#event-module), [Dom](#dom-module)

#### Howto

See the example at [jsfiddle.net](http://jsfiddle.net/5rfwokb3/)

Define a binding-element which is suppossed to be filled with data on your view.<br>
You can also define a form-element, which will be connected to your binding-element.
```html
<!-- Binding-element -->
Hi, my name is <span data-bindable="name"></span>

<!-- Form-element -->
<input type="text" id="inp_name">
```

Now, you bind your data to the binding-element

```javascript
// load module
F().require(
	[
		'//cdn.jsdelivr.net/framewreck/latest/modules/core/fw.core.min.js', 
		'//cdn.jsdelivr.net/framewreck/latest/modules/events/fw.events.min.js', 
		'//cdn.jsdelivr.net/framewreck/latest/modules/dom/fw.dom.min.js', 
		'//cdn.jsdelivr.net/framewreck/latest/modules/bindings/fw.bindings.min.js'
	], function() {

		// register binding-element 'name', fill it with '@misantronic' and connect it to #inp_name
		F('#inp_name').registerBindable( 'name', '@misantronic' );
		```
		
		The binding-element `name` will now be filled with your data.<br>
		You can now get/set data:
		
		```javascript
		// update binding-element (and form-element)
		F().setBindable( 'name', 'David Skx' );
		
		// get binding-element value
		F().getBindable( 'name' );
	
	});
```

Since `#inp_name` is connected to the binding-element, it will automatically update its value everytime you change it.

### Template-Engine

The template-engine is inspired by common engines like mustache or handlebars<br>but wrecked down to ~1 Kb.<br>
All templates are wrapped in `<script type="x-tmpl-framewreck"></script>` and follow the popular handlebar-`{{...}}`-syntax.<br>

*Note:* This module is optional and not included in dist/framewreck.min.js<br>
Dependencies: [AJAX](#ajax-module) *(if you want to use `loadTemplate`)*

#### Template-Example

```html
<script id="template" type="x-tmpl-framewreck">
	<h1>{{title}}</h1>
	
	{{#if description}}
		<p>{{description}}</p>
	{{/if}}
	
	{{projects}}
		<div class="project">
			<h2>{{name}}</h2>
			<bockquote>
				<p>{{quote}}</p>
			</bockquote>
	
			{{#if versions}}
				<h3>Versions:</h3>
				{{versions}}
					<p>v.{{ value}}</p>
				{{/versions}}
			{{#else}}
				<p>NO Versions</p>
			{{/if}}
			
			{{#if tests}}
				<h3>Tests:</h3>
				{{tests}}
					{{#if show == 5}}
					<p>
						Test ran on {{run}}.
					</p>
					{{/if}}
				{{/tests}}
			{{/if}}
			
			{{#if ! tests}}
				No Tests
			{{/if}}
			
			{{#if not tests}}
				Really no Tests
			{{/if}}
	
			<h3>Code:</h3>
			<pre><code class="lang-javascript">{{{code}}}</code></pre>
		</div>
	{{/projects}}
</script>
```

Run Parser:
```javascript
// load module
F().require(
	[
		'//cdn.jsdelivr.net/framewreck/latest/modules/core/fw.core.min.js', 
	 	'//cdn.jsdelivr.net/framewreck/latest/modules/templates/fw.templates.min.js'
	], function() {
		var context = {
			title: '512byt.es',
			description: '<a href="https://github.com/misantronic">@misantronic</a>\'s javascript <a href="http://en.wikipedia.org/wiki/Code_golf">code golf</a> projects.<br>',
			projects: [
				{
					name: 'Invasion',
					quote: 'A Space Invader clone. Invaders from outer space are coming to kill your mom! (501 bytes)',
					code: 'p=389;$=l=m=t=0;c=" _ ";onkeydown=function(e){(k=e.which)==39?p++:k==37?p--:!l&(l=p)};setInterval(\'_="<pre>";l&(l-=20)<0&&(l=0);m=(m+=20)>p?b[+new Date%6]:m;for(i=0;i<400;i++){if(i%20==0)_+="\\n";if(~b[n="indexOf"](l))b.splice(b[n](l),1),$+=5,l=0;if(~b[n](p)||p==m)p=n,b=[],c="xxx";_+=i==p?"oIo":~b[n](i)?".#.":i==m&&m?" * ":i==l&&l?" | ":c}document.body.innerHTML=_+="\\nP "+$;t+=o;for(i in b)b[i]+=t%5e3==0?20:t%2e3==0?1:t%1e3==0&&-1\',o=50);for(b=[],j=2;j<136;j+=j==14||j==94?29:j==55?27:2)b.push(j)',
					tests: [
						{ run: "2014-11-05", show: 5 },
						{ run: "2014-11-04", show: 0 },
						{ run: "2014-11-03", show: 0 }
					],
					versions: [
						"1.0.0", "1.1.0", "1.2.0"
					]
				},
				{
					name: 'Tron',
					quote: 'Destroy your friends! Competitive 1on1 Tron-clone. (757 bytes)',
					code: 'a=A=0;with(c.getContext("2d"))onkeyup=function(e){d=(k=e.which)==39?2:k==37?4:k==38?1:k==40?3:d;D=k==87?1:k==68?2:k==83?3:k==65?4:D;k==32&&X&S()},(S=function(){X=0;w=[{x:795,y:400}];d=1;W=[{x:5,y:0}];D=3;v=setInterval(\'c.width=c.width;p1[H="innerHTML"]=A+=z(w,d,W,"blue",0);p2[H]=a+=z(W,D,w,"red",1);if(X)clearInterval(v)\',60)})(),z=function(f,g,F,B,b){h={x:f[l=f[m="length"]-1].x,y:f[l].y};beginPath();L=lineWidth=10;h.x+=g==2?L:g==4&&-L;h.y+=g==3?L:g==1&&-L;if(F[I="filter"](t=function(o){return o.x==(T=this).x&o.y==T.y},h)[m]||f[I](t,h)[m])return X=1;strokeStyle=_=createLinearGradient(0,0,800,0);for($ in _);_[$](b,"magenta");_[$](.3,"#AFD2E6");_[$](.6,"#FF1493");_[$](!b,B);for(i=f.push({x:h.x,y:h.y})-1;i--;){lineTo(f[i].x,f[i].y)};stroke();return 0}'
				},
				{
					name: 'Script Loader',
					quote: 'Dynamically load scripts (131 bytes)',
					code: 'function l(a,c,f){with(document)for(;(f=createElement(\'script\')).src=a.shift();head.appendChild(f))f.onload=function(){c&&c(this)}}'
				}
			]
		};
		
		F('#template').template(context).appendTo('body');
	
	});
```

In this example, accessing the `{{projects}}...{{/projects}}`-Tag actually invokes an each-loop which iterates through the `projects`-array, 
defined in `context`. It will outputs three project-blocks.

#### Helper functions

You can define your own helper functions which are accessible from any context in any template.

```javascript
F('#template')
	.registerHelper('link', function(href, title, target) {
		target = target || '_self';
		return '<a href="'+ href +'" title="'+ title +'" target="'+ target +'">'+ title +'</a>'
	})
	.template(context).appendTo('#page-wrapper');
```

```html
<script id="template" type="x-tmpl-framewreck">
	{{link "http://512byt.es" "Visit 512byt.es" "_blank"}}
</script>
```

#### Loading external templates

```javascript
// define context
var navContext = {
	menu: [
		{ name: 'Home', link: '/home' },
		{ name: 'Projects', link: '/projects' }
	]
}

// load template
F().loadTemplate('templates/nav.tpl.html', function() {
	// this is an F-instance containing the template
	F('#nav-wrapper').append(this);

}, navContext);
```


## Contact and comments

If you have any questions, praise or contempt feel free to write me: <misantronic@posteo.se>.
Of course, you can file an issue if you find evil bugs.<br>
For the sake of keeping things simple and small, I did not take care of optimizing my scripts for crappy browsers like IE8 etc.