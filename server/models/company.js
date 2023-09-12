const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CompanySchema = new Schema({
name: {
	type: String
},
id: {
	type: Number
},
compid: {
	type: String
}
}, {
	collection: 'Companies'
})

module.exports = mongoose.model('Companies', CompanySchema)