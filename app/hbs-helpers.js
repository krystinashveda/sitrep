var hbs = require('hbs')
	, fs = require('fs')
	, moment = require('moment')

module.exports = function(app){

	hbs.registerHelper('JSON', function(context) {
		return JSON.stringify(context)
	})

	hbs.registerHelper('now', function(context, options) {
		return Date.now()
	})

	hbs.registerHelper('moment', function(context, options) {
		var format = options.hash.format || 'DD/MM/YYYY'

		if (context === 'now') {
			return moment().format(format)
		} else {
			return moment(context).format(format)
		}
	})

	hbs.registerHelper('timeAgo', function(context, options) {
		return moment(context).fromNow()
	})

	hbs.registerHelper('component', function(component, options) {
		var componentPath = __dirname + '/views/partials/blocks/'+ component +'.html'
			, template = hbs.compile(fs.readFileSync(componentPath, 'utf8'))
			, content = new hbs.handlebars.SafeString(options.fn(this))

		return new hbs.handlebars.SafeString(template({
			content: content
			, args: options.hash
			// , data: options.data.root
		}))
	})

}
