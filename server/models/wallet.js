const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let WalletSchema = new Schema({
name: {
	type: String
},
wallid: {
	type: Number
}
}, {
	collection: 'Wallet'
})

module.exports = mongoose.model('Wallet', WalletSchema)