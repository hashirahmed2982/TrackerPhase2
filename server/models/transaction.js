const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TransactionSchema = new Schema({
    Transid: {
        type: Number
    },
    createdat: {
        type: String
    },
    updatedat: {
        type: String
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    type: {
        type: String
    },
    user: {
        type: String
    },
    amount: {
        type: String
    },
    wallet: {
        type: String
    },
    user_id: {
        type: String,
        required: true
      },
    company: {
        type: String,
        
      }
    },

 {
	collection: 'Transactions'
})

module.exports = mongoose.model('Transactions', TransactionSchema)