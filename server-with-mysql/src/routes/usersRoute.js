import express from 'express';
import moment from 'moment';
import db from '../config/db.js';

let router = express.Router();

router.get('/fetchAllEmployees',(req,res) => {
	db.query("SELECT * FROM users", function(err, result) {
		if(err) {
			res.status(500).json(err)
		}
		else {
			res.json({ employees: result })
		}
	})
});

router.post("/addEmployee",(req,res) => {
	let data = req.body.data;
	let userData = {
		firstName: data.firstName,
		lastName: data.lastName,
		email: data.email,
		gender: data.gender,
		dateOfBirth: data.dateOfBirth,
		age: data.age,
		createdAt: moment().format("YYYY-MM-DD HH:mm:ss")
	}
      let queryData = 'INSERT INTO `users` SET ?'
	    db.query(queryData, userData, function(err, result){
		if(err) {
			res.status(500).json(err)
		} else {
			res.json();
		}
	})
});

router.get('/fetchEmployee/:empId',(req,res) => {
	db.query("SELECT * FROM users WHERE empId =" + req.params.empId, function(err,result) {
		if(err) {
			res.status(500).json(err);
		}
		else {
			res.json({ employee: result[0] })
		}
	} )
})

router.put("/updateEmployee", (req, res) => {
    let data = req.body.data;
    let userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        age: data.age,
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss")
    }
	db.query("UPDATE users SET ? WHERE empId =  " + data.empId, userData, function(err, result){
		if(err){
			res.status(500).json(err)
		} else {
			res.json()
		}
	})
});

router.delete('/deleteEmployee/:empId',(req, res) => { 
	db.query("DELETE FROM users WHERE empId =" + req.params.empId, function(err, result){
		if(err) {
			res.status(500).json(err);
		}
		else {
			res.json(req.params.id)
		}

	});
});

router.post("/deleteMultipleEmployees", (req, res) => {
    let idArr = req.body.empIdArr;
    if(idArr.length > 1) {
        idArr.forEach((item, index) => {
			db.query("DELETE FROM users WHERE empId =" + item, function(err, result) {
                if(idArr.length === index+1) {
                    res.json();
                }
            });
        });
    }
})

export default router