let mongoose = require("mongoose"),
express = require("express"),
router = express.Router();


const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)


let TransactionSchema = require("../models/transaction");


function formatDate(date) {
    const year = date.getUTCFullYear().toString().substr(-2);
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }




router.get("/transactions", (req, res , next) => {
    const user_id = req.user._id

    console.log(user_id);
TransactionSchema.find({user_id}).then((result) => {
    res.json(result);
})
.catch((err)=>{
    next(err);
})
});
router.get("/transactionsall", (req, res , next) => {
   

   
TransactionSchema.find().then((result) => {
    res.json(result);
})
.catch((err)=>{
    next(err);
})
});

router.post("/transactions", (req, res, next) => {

    const newTransaction = new TransactionSchema({
        ...req.body,  // Set the date field to the current date
    });
    console.log("in");

    newTransaction.save()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.delete("/transactions/:id",
(req, res, next) => {
TransactionSchema.findByIdAndRemove(
	req.params.id).then((result) => {
        res.status(200).json({
            msg: result,
        });
    })
    .catch((err)=>{
        next(err);
    })
    
});


// UPDATE student
router
.route("/transactions/:id")
// Get Single Student
.get((req, res,next) => {
	TransactionSchema.findById
		(req.params.id).then((result) => {
            res.json(result);
        })
        .catch((err)=>{
            next(err);
        })
})

// Update Student Data
.put((req, res, next) => {
	TransactionSchema.findByIdAndUpdate(
	req.params.id,
	{
		$set: req.body,
	}).then((result) => {
        res.json(result);
		console.log("data updated successfully !");
    })
    .catch((err)=>{
        next(err);
    })
});

module.exports = router;