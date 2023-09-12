const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
id: {
	type: Number
},
name: {
	type: String
},
email: {
	type: String
},
password: {
	type: String
},
username: {
	type: String
},
company: {
	type: String
},
role: {
	type: String
}
}, {
	collection: 'Users'
})

// static login method
UserSchema.statics.login = async function(email, password) {
	
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }
if(password == user.password){match = true}else{match = false}
 // const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('Users', UserSchema)