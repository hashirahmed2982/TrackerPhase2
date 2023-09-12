const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
name: {
	type: String
},
id: {
	type: Number
}
}, {
	collection: 'Categories'
})

module.exports = mongoose.model('Categories', CategorySchema)