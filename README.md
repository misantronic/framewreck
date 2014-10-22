frameWreck
=========

A lightweight *jQuery-like* JavaScript library (~ 800b) featuring **CSS Selectors**, **DOM Manipulation/Traversing**, **AJAX-Requests** and a native **Event-System**.

Source:
```javascript
F=function(c){var _=this,x,l,i,j,a,e,m="length",q="querySelectorAll",h="innerHTML",d=document,g;if(_.__proto__.constructor!=F)return new F(c);_.html=function(v){a=[];for(i=0;i<l;i++)e=x[i],a.push(e[h]),v&&(e[h]=v);return v&&this||a.join("").replace(/\s/g,"")};_.each=function(f){for(i=l;i--;)f(_[i],i);return this};_.y=function(){for(i=99;i--;)delete _[i];for(i in x)_[i]=x[i];_[m]=l=x[m]};_.find=function(s){a=[];if(!x)a=d[q](s);else for(i=l;i--;)a[i]=x[i][q](s);x=[];for(i=0;i<a[m];i++)if(a[i][m])for(j=0;j<a[i][m];j++)x.push(a[i][j]);else x.push(a[i]);_.y();return this};_.get=function(g){x=[x[g]];_.y();return this};_.append=function(s){g=s.match(/^</)?0:d[q](s)[0];for(i=l;i--;)g?g.appendChild(x[i]):x[i].innerHTML+=s;return this};_.appendTo=_.append;_.on=function(v,m){for(i=l;i--;)x[i].addEventListener(v,m);return this};_.off=function(v,m){for(i=l;i--;)x[i].removeEventListener(v,m);return this};_.fire=function(v,D){for(i=l;i--;)x[i].dispatchEvent(new CustomEvent(v,{detail:D}));return this};_.ajax=function(M,u,g,d,X){with(X=new XMLHttpRequest)return onreadystatechange=function(){readyState^4||g(this)},open(M,u,g),send(d),X};_.find(c);return this};
```

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
```

### Event-System
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
- [ ] Data-Binding
- [ ] Other great stuff

---

[fw.packed.js] crushed with [RegPack]<br>
Configuration: No Math-Packing, all checkboxes off except "Reassign variable names except: F x l i j a e m q h d g" 

[fw.packed.js]:https://github.com/misantronic/min/blob/master/framewreck/fw.packed.js
[RegPack]:http://siorki.github.io/regPack.html