var nav = {
	menu: [
		{ name: 'Home', link: '#home', id: 'home level-0' },
		{ name: 'Getting started', link: '#getting-started', id: 'getting-started level-0' },
		{
			name: 'Modules', link: '#modules', id: 'modules level-0',
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

	F('#content-output')
		.html('')
		.loadTemplate('templates/'+ path +'.tpl.html', function() {
			// look for tabs
			F('.tabs').each(function(item) {
				var tabLi = item.find('ul > li');
				tabLi.on('click', function(e) {
					tabLi.removeClass('active');
					var i = F(this).addClass('active').attr('data-i');

					item.find('.tab-content > div').hide(0.25, function() {
						item.find('.tab-content > div').get(i).show(0.5);
					});

					return false;
				});
			});
		});


}

parseContent(location.href);