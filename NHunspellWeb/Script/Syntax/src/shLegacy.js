/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/
 *
 * @version
 * 2.0.287 (February 06 2009)
 *
 * @author
 * Alex Gorbatchev
 * 
 * @copyright
 * Copyright (C) 2004-2009 Alex Gorbatchev.
 *
 * Licensed under a GNU Lesser General Public License.
 * http://creativecommons.org/licenses/LGPL/2.1/
 *
 * SyntaxHighlighter is donationware. You are allowed to download, modify and distribute 
 * the source code in accordance with LGPL 2.1 license, however if you want to use 
 * SyntaxHighlighter on your site or include it in your product, you must donate.
 * http://alexgorbatchev.com/wiki/SyntaxHighlighter:Donate
 */
var dp = {
	SyntaxHighlighter : {}
};

dp.SyntaxHighlighter = {
	parseParams: function(
						input,
						showGutter, 
						showControls, 
						collapseAll, 
						firstLine, 
						showColumns
						)
	{
		function getValue(list, name)
		{
			var regex = new XRegExp('^' + name + '\\[(?<value>\\w+)\\]$', 'gi'),
				match = null
				;
			
			for (var i = 0; i < list.length; i++) 
				if ((match = regex.exec(list[i])) != null)
					return match.value;
			
			return null;
		};
		
		function defaultValue(value, def)
		{
			return value != null ? value : def;
		};
		
		function asString(value)
		{
			return value != null ? value.toString() : null;
		};

		var parts = input.split(':'),
			brushName = parts[0],
			options = {},
			straight = { 'true' : 'true' }
			reverse = { 'true' : 'false' },
			result = null,
			defaults = SyntaxHighlighter.defaults
			;
		
		for (var i in parts)
			options[parts[i]] = 'true';

		showGutter = asString(defaultValue(showGutter, defaults.gutter));
		showControls = asString(defaultValue(showControls, defaults.toolbar));
		collapseAll = asString(defaultValue(collapseAll, defaults.collapse)); 
		showColumns = asString(defaultValue(showColumns, defaults.ruler));
		firstLine = asString(defaultValue(firstLine, defaults['first-line'])); 
		
		result = {
			brush			: brushName,
			gutter			: defaultValue(reverse[options.nogutter], showGutter),
			toolbar			: defaultValue(reverse[options.nocontrols], showControls),
			collapse		: defaultValue(straight[options.collapse], collapseAll),
			ruler			: defaultValue(straight[options.showcolumns], showColumns),
			'first-line'	: defaultValue(getValue(parts, 'firstline'), firstLine)
		};
		
		return result;
	},
	
	HighlightAll: function(
						name, 
						showGutter /* optional */, 
						showControls /* optional */, 
						collapseAll /* optional */, 
						firstLine /* optional */, 
						showColumns /* optional */
						)
	{
		function findValue()
		{
			var a = arguments;
			
			for (var i = 0; i < a.length; i++) 
			{
				if (a[i] === null) 
					continue;
				
				if (typeof(a[i]) == 'string' && a[i] != '') 
					return a[i] + '';
				
				if (typeof(a[i]) == 'object' && a[i].value != '') 
					return a[i].value + '';
			}
			
			return null;
		};

		function findTagsByName(list, name, tagName)
		{
			var tags = document.getElementsByTagName(tagName);
			
			for (var i = 0; i < tags.length; i++) 
				if (tags[i].getAttribute('name') == name) 
					list.push(tags[i]);
		}
		
		var elements = [],
			highlighter = null,
			registered = {},
			propertyName = 'innerHTML'
			;
		
		// for some reason IE doesn't find <pre/> by name, however it does see them just fine by tag name... 
		findTagsByName(elements, name, 'pre');
		findTagsByName(elements, name, 'textarea');

		if (elements.length === 0)
			return;
		
		for (var i = 0; i < elements.length; i++)
		{
			var element = elements[i],
				params = findValue(
					element.attributes['class'], element.className, 
					element.attributes['language'], element.language
					),
				language = ''
				;
			
			if (params === null) 
				continue;

			params = dp.SyntaxHighlighter.parseParams(
				params,
				showGutter, 
				showControls, 
				collapseAll, 
				firstLine, 
				showColumns
				);

			SyntaxHighlighter.highlight(params, element);
		}
	}
};
