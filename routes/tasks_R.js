const express = require('express');
const router = express.Router();
const { format } = require('date-fns'); // הוסף את החבילה date-fns

module.exports = router;

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/date", function (req, res) {
    const date = new Date().toLocaleDateString();
    res.render("date", { date });
});

router.get("/time", function (req, res) {
    const randomTime = format(new Date(), "HH:mm:ss");
    res.render("time", { exactTime: randomTime });
});

// נשאר הקוד הקיים של POST /clockIn ו-POST /clockOut כפי שהוא
// ...
