let mongoose = require("mongoose"),
express = require("express"),
router = express.Router();

let CompanySchema = require("../models/company");

router.get("/companies", (req, res , next) => {
    console.log("company");
CompanySchema.find().then((result) => {
    res.json(result);
})
.catch((err)=>{
    next(err);
})
});

router.post("/companies", (req, res, next) => {
    console.log("company");
    CompanySchema.create(req.body).then((result) => {
    res.json(result);
})
.catch((err)=>{
    next(err);
})
});

router.delete("/companies/:id",
(req, res, next) => {
    CompanySchema.findByIdAndRemove(
	req.params.id).then((result) => {
        res.status(200).json({
            msg: result,
        });
    })
    .catch((err)=>{
        next(err);
    })
    
});


// UPDATE company
router
.route("/companies/:id")
// Get Single company
.get((req, res,next) => {
	CompanySchema.findById
		(req.params.id).then((result) => {
            res.json(result);
        })
        .catch((err)=>{
            next(err);
        })
})

// Update company Data
.put((req, res, next) => {
	CompanySchema.findByIdAndUpdate(
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