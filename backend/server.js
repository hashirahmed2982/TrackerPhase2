let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dbConfig = require('./database/db');


// Express Route
const userRoute = require('../server/routes/userRoutes')
const companyRoute = require('../server/routes/companyRoutes')
const transactionRoute = require('../server/routes/transactionRoutes')
const categoryRoute = require('../server/routes/categoryRoutes')
const userRoutes = require('./routes/user')
const walletRoute = require('./routes/walletRoutes')
const adminRoute = require('./routes/adminRoutes')




// Connecting MongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, ).then(() => {
console.log('Database successfully connected!')
},
error => {
	console.log('Could not connect to database : ' + error)
}
)

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));
app.use(cors());
app.use('/user', userRoute);
app.use('/company', companyRoute);
app.use('/transaction', transactionRoute);
app.use('/category', categoryRoute);
app.use('/wallet', walletRoute);
app.use('/admin', adminRoute);

// app.use('/categories', categoryRoute);
// app.use('/', require("./routes/authRoutes"))
app.use('/api/user', userRoutes)




// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
console.log('Connected to port ' + port)
})

// 404 Error
app.use((req, res, next) => {
res.status(404).send('Error 404!')
console.log(res)
});

app.use(function (err, req, res, next) {
console.error(err.message);
if (!err.statusCode) err.statusCode = 500;
res.status(err.statusCode).send(err.message);
});