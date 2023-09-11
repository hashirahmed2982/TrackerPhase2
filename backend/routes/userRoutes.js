let mongoose = require("mongoose"),
express = require("express"),
router = express.Router();

let UserSchema = require("../models/user");
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

router.get("/users", (req, res , next) => {
    console.log("user");
UserSchema.find().then((result) => {
    res.json(result);
})
.catch((err)=>{
    next(err);
})
});
router.get("/curruser", (req, res , next) => {
    const user_id = req.user._id
UserSchema.find(user_id).then((result) => {
    res.json(result);
})
.catch((err)=>{
    next(err);
})
});

router.post("/users", (req, res, next) => {
    console.log("in");
UserSchema.create(req.body).then((result) => {
    res.json(result);
})
.catch((err)=>{
    next(err);
})
});

router.delete("/users/:id",
(req, res, next) => {
UserSchema.findByIdAndRemove(
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
.route("/users/:id")
// Get Single Student
.get((req, res,next) => {
	UserSchema.findById
		(req.params.id).then((result) => {
            res.json(result);
        })
        .catch((err)=>{
            next(err);
        })
})

// Update Student Data
.put((req, res, next) => {
	UserSchema.findByIdAndUpdate(
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