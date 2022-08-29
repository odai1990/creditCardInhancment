const express = require("express");
const Router = express.Router()
const db = require('../models/connectionDB')
const luhn10 = require('./luhn10')

Router.get('/getAll',(req, res) => {
    db.serialize(() => {
        let sql = "SELECT Id,* FROM Credit";
        db.all(sql, [], (err, rows) => {
            if (err)
                res.json({ data: 'Somthing wrong with database', status: 'Error', type: 'DataBase' });
            else
                res.send({ data: rows, status: 'success', });
        });
    });
});


Router.post('/add',(req, res) => {
    if (luhn10(req.body.cardNumber))
        db.serialize(() => {
            const stmt = db.prepare("INSERT INTO Credit (cardName,CardNumber) VALUES(?,?) ");
            stmt.run(req.body.cardName, Number(req.body.cardNumber));
            stmt.finalize((err, data) => {
                if (err)
                    res.json({ data: 'Somthing wrong with database', status: 'error', type: 'DataBase' });
                else
                    res.send({ data: 'Credit Card information has been saved successfully', status: 'success', });
            });
        });
    else
        res.send({ data: 'Credit Card Number is not valid', status: 'error', });
});
Router.put('/update',(req, res) => {

        db.serialize(() => {
            const stmt = db.prepare("UPDATE  Credit SET  cardName =(?) ,CardNumber=(?) WHERE id=(?) ");
            stmt.run(req.body.cardName, Number(req.body.cardNumber),Number(req.body.id));
            stmt.finalize((err, data) => {
                if (err)
                    res.json({ data: 'Somthing wrong with database', status: 'error', type: 'DataBase' });
                else
                    res.send({ data: 'Credit Card information has been saved successfully', status: 'success', });
            });
        });
   
});
Router.get('/GetById',(req, res) => {


    db.serialize(() => {
        // let sql = "SELECT Id,* FROM Credit";
        const sql = "SELECT * FROM   Credit  WHERE id=(?) ";
   
        db.all(sql, Number(req.query.id), (err, rows) => {
            if (err)
                res.json({ data: 'Somthing wrong with database', status: 'Error', type: 'DataBase' });
            else
                res.send({ data: rows, status: 'success', });
        });
    });

   
   
});


Router.delete('/delete',(req, res) => {
console.log(Number(req.body.id))
        db.serialize(() => {
            const stmt = db.prepare("DELETE FROM Credit WHERE id=(?) ");
            stmt.run( Number(req.body.id));
            stmt.finalize((err, data) => {
                if (err)
                    res.json({ data: 'Somthing wrong with database', status: 'error', type: 'DataBase' });
                else
                    res.send({ data: 'Credit Card information has been Deleted successfully', status: 'success', });
            });
        });

});

module.exports = Router;