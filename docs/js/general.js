var nav = {
	menu: [
		{ name: 'Home', link: '#home', id: 'home' },
		{ name: 'Getting started', link: '#getting-started', id: 'getting-started' },
		{
			name: 'Modules', id: 'modules',
			submenu: [
				{ submenuName: 'Core', submenuLink: '#api-core' },
				{ submenuName: 'CSS', submenuLink: '#api-css' },
				{ submenuName: 'DOM', submenuLink: '#api-dom' },
				{ submenuName: 'Events', submenuLink: '#api-events' },
				{ submenuName: 'Data', submenuLink: '#api-data' },
				{ submenuName: 'AJAX', submenuLink: '#api-ajax' },
				{ submenuName: 'Animate', submenuLink: '#api-animate' },
				{ submenuName: 'Bindables', submenuLink: '#api-bindables' },
				{ submenuName: 'Templates', submenuLink: '#api-templates' }
			]
		}
	]
};

F().loadTemplate('templates/nav.tpl.html', function() {
	F('#nav-wrapper').append(this);

	F('nav a').on('click', function() {
		parseContent(this.href);

		return false;
	});
}, nav);

function parseContent(path) {
	path = path.split('#')[1] || 'home';

	F('#content-output').html('');
	//F('#'+ path).template().appendTo('#content-output');
	F().loadTemplate('templates/'+ path +'.tpl.html', function() {
		this.appendTo('#content-output');
	});
}

parseContent(location.href);