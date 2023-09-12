let mongoose = require("mongoose"),
express = require("express"),
router = express.Router();





let TransactionSchema = require("../models/transaction");

router.post("/transactions", (req, res , next) => {
    const company = req.body.company
    console.log('check',company);
    //console.log(user_id);
TransactionSchema.find({company}).then((result) => {
    res.json(result);
})
.catch((err)=>{
    next(err);
})
});

module.exports = router;