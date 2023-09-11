let mongoose = require("mongoose"),
express = require("express"),
router = express.Router();

let WalletSchema = require("../models/wallet");

router.get("/wallets", (req, res , next) => {
    console.log("wallet");
    WalletSchema.find().then((result) => {
    res.json(result);
})
.catch((err)=>{
    next(err);
})
});

router.post("/wallets", (req, res, next) => {
    console.log("in");
    WalletSchema.create(req.body).then((result) => {
    res.json(result);
})
.catch((err)=>{
    next(err);
})
});

router.delete("/wallets/:id",
(req, res, next) => {
    WalletSchema.findByIdAndRemove(
	req.params.id).then((result) => {
        res.status(200).json({
            msg: result,
        });
    })
    .catch((err)=>{
        next(err);
    })
    
});

router
.route("/wallets/:id")
// Get Single Student
.get((req, res,next) => {
	WalletSchema.findById
		(req.params.id).then((result) => {
            res.json(result);
        })
        .catch((err)=>{
            next(err);
        })
})

// Update Student Data
.put((req, res, next) => {
	WalletSchema.findByIdAndUpdate(
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