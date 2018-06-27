
module.exports = {
	getById: function (req, res, next) {
		console.log(req.body);
		serieModel.findById(req.params.serieId, function (err, serieInfo) {
			if (err) {
				next(err);
			} else {
				res.json({ status: "success", message: "Serie found.", data: { series: serieInfo } });
			}
		});
	},
	global.actions_json[type+path].method: function (req, res, next) {
		console.log("coucou");
		var type = req.method;
    var path = req.originalUrl;
		let seriesList = [];
		global.schemas[global.actions_json[type+path].schema].find({}, function (err, series) {
			if (err) {
				next(err);
			} else {
				for (let serie of series) {
					seriesList.push({ id: serie._id, name: serie.name });
				}
				res.json({ status: "success", message: "Series list found.", data: { series: seriesList } });
			}
		});
	},
	updateById: function (req, res, next) {
		serieModel.findByIdAndUpdate(req.params.serieId, { name: req.body.name }, function (err, serieInfo) {
			if (err)
				next(err);
			else {
				res.json({ status: "success", message: "Serie updated successfully.", data: null });
			}
		});
	},
	deleteById: function (req, res, next) {
		serieModel.findByIdAndRemove(req.params.serieId, function (err, serieInfo) {
			if (err)
				next(err);
			else {
				res.json({ status: "success", message: "Serie deleted successfully.", data: null });
			}
		});
	},
	create: function (req, res, next) {
		serieModel.create({ name: req.body.name, released_on: req.body.released_on }, function (err, result) {
			if (err)
				next(err);
			else {
				res.json({ status: "success", message: "Serie added successfully.", data: null });
			}
		});
	}
}