import express from 'express';
import { ref } from '../config/database';
import { database } from 'firebase';
import moment from 'moment';

const router = express.Router();

router.get("/fetchAllEmployees", (req, res) => {
    ref.child('employees').once("value")
        .then(empData => {
            if(empData.val() !== null) {
                let empArray = Object.values(empData.val()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
                res.json({ employees: empArray })
            } else {
                res.json({ employees: [] })
            }
        })
});

router.post("/addEmployee", (req, res) => {
    let data = req.body.data;
    let pushKey = ref.child("employees").push().getKey()
    let setData = {
        empId: pushKey,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        age: data.age,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss")
    }
    ref.child('employees/'+pushKey).set(setData)
        .then(() => {
            res.json();
         })
});

router.get("/fetchEmployee/:empId", (req, res) => {
    ref.child('employees/'+req.params.empId).once("value")
        .then(empData => {
            if(empData.val() !== null) {
                res.json({ employee: empData.val() })
            } else {
                res.json({ employee: {} })
            }
        })
});

router.put("/updateEmployee", (req, res) => {
    let data = req.body.data;
    let setData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        age: data.age,
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss")
    }
    ref.child('employees/'+data.empId).update(setData)
        .then(() => {
            res.json();
    })
});

router.delete("/deleteEmployee/:empId", (req, res) => {
    ref.child('employees/'+req.params.empId).remove()
    .then(() => {
        res.json()
    })
});

router.post("/deleteMultipleEmployees", (req, res) => {
    let idArr = req.body.empIdArr;
    if(idArr.length > 1) {
        idArr.forEach((item, index) => {
            console.log(item, index)
            ref.child('employees/'+item).remove()
            .then(() => {
                if(idArr.length === index+1) {
                    res.json();
                }
            })
        })
    }
})

export default router;