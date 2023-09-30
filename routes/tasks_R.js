const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('./db'); // Assuming you have a module for database connection

router.use(bodyParser.urlencoded({ extended: true }));

module.exports = router;

router.get("/", function (req, res) {
    res.render("Employees", {});
});

// Add Employee
router.post('/Add', function (req, res) {
    const name = req.body.name;
    // Use Prepared Statements to prevent SQL Injection
    const query = 'INSERT INTO Employees (name) VALUES (?)';
    db.query(query, [name], function (err, result) {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding employee');
        } else {
            res.redirect('/');
        }
    });
});

// Delete Employee
router.post('/Delete/:id', function (req, res) {
    const id = req.params.id;
    // Use Prepared Statements to prevent SQL Injection
    const query = 'DELETE FROM Employees WHERE id = ?';
    db.query(query, [id], function (err, result) {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting employee');
        } else {
            res.redirect('/');
        }
    });
});

// Record Entry/Exit
router.post('/Update', function (req, res) {
    const employeeId = req.body.employee;
    const entryTime = req.body.entryTime;
    const exitTime = req.body.exitTime;
    // Use Prepared Statements to prevent SQL Injection
    const query = 'INSERT INTO Attendance (employee_id, entry_time, exit_time) VALUES (?, ?, ?)';
    db.query(query, [employeeId, entryTime, exitTime], function (err, result) {
        if (err) {
            console.error(err);
            res.status(500).send('Error recording entry/exit');
        } else {
            res.redirect('/');
        }
    });
});