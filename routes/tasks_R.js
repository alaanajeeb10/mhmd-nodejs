const express = require('express');
const router = express.Router();
const { format } = require('date-fns'); // הוסף את החבילה date-fns

module.exports = router;

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", function (req, res) {
    res.render("tasks", {});
});


router.post('/clockIn', function (req, res) {
    const { name, id } = req.body;
    const date = new Date().toLocaleDateString();

    saveEntry(id, name, id, date, () => {
        const randomTime = format(new Date(), "HH:mm:ss");
        res.json({ date: date, exactTime: randomTime });
    });
});
async function deleteRow(idx) {
    let objToServer = {};
    objToServer.idx = idx;
    let response = await fetch("/Delete", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objToServer),
    });

    // לאחר מחיקת השורה, עדכן את הטבלה
    CreateTable();
}

router.post('/clockOut', function (req, res) {
    const { name, id } = req.body;

    saveExit(id, () => {
        const randomTime = format(new Date(), "HH:mm:ss");
        res.json({ exactTime: randomTime });
    });
});


function saveEntry(employeeId, name, id, date, callback) {
    const formattedTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const query = `INSERT INTO entry_exit (employee_id, name, id, date, entry_time) VALUES (${employeeId}, '${name}', '${id}', '${date}', '${formattedTime}')`;

    db_pool.query(query, function (err, rows, fields) {
        if (err) {
            console.error(err);
        } else {
            console.log('Entry saved successfully');
            callback();
        }
    });
}

function saveExit(employeeId, callback) {
    const formattedTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const query = `UPDATE entry_exit SET exit_time = '${formattedTime}' WHERE employee_id = ${employeeId} AND exit_time IS NULL`;

    db_pool.query(query, function (err, rows, fields) {
        if (err) {
            console.error(err);
        } else {
            console.log('Exit saved successfully');
            callback();
        }
    });
}