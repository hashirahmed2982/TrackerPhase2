let mongoose = require("mongoose"),
express = require("express"),
router = express.Router();

let CategorySchema = require("../models/category");

router.get("/categories", (req, res , next) => {
    console.log("user");
CategorySchema.find().then((result) => {
    res.json(result);
})
.catch((err)=>{
    next(err);
})
});

router.post("/categories", (req, res, next) => {
    console.log("in");
CategorySchema.create(req.body).then((result) => {
    res.json(result);
})
.catch((err)=>{
    next(err);
})
});

router.delete("/categories/:id",
(req, res, next) => {
CategorySchema.findByIdAndRemove(
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
.route("/categories/:id")
// Get Single Student
.get((req, res,next) => {
	CategorySchema.findById
		(req.params.id).then((result) => {
            res.json(result);
        })
        .catch((err)=>{
            next(err);
        })
})

// Update Student Data
.put((req, res, next) => {
	CategorySchema.findByIdAndUpdate(
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