var query = require('db/v3/query');

var LIST_PRODUCTS_QUERY = 'select PRODUCT_ID, PRODUCT_NAME, PRODUCT_DESCRIPTION, PRODUCT_IMAGE, VENDOR_NAME, SOLUTION_REPOSITORY, SOLUTION_URI'
	+ ' from PROMART_PRODUCTS'
	+ ' join PROMART_VENDORS on PRODUCT_VENDOR = VENDOR_ID'
	+ ' join PROMART_SOLUTIONS on PRODUCT_SOLUTION = SOLUTION_ID'
	+ ' order by PRODUCT_ID';

var trialLandscape = 'http://trial.ingress.dev.promart.shoot.canary.k8s-hana.ondemand.com/services/v3/web/ide-git/index.html';

exports.list = function(settings) {
	var resultSet = query.execute(LIST_PRODUCTS_QUERY);
	var products = resultSet.map(function(entity) {
		return {
			'id': entity.product_id,
			'name': entity.product_name,
			'image': entity.product_image,
			'description': entity.product_description,
			'vendor': entity.vendor_name,
			'trialLink': trialLandscape + '?repository=' + entity.solution_repository + '&uri=' + entity.solution_uri
		}
	});
	return products;
};

exports.get = function(id) {
	return null;
};

