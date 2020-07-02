const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const qaRoutes = express.Router();
const PORT = 4000;
const MONGODB_URI = 'mongodb+srv://ferstelmiles:qapassword123@qadb.qp1cl.mongodb.net/<dbname>?retryWrites=true&w=majority';

let Qa = require('./qa.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(MONGODB_URI || 'mongodb://localhost/QaDB', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log("MongoDB database connection established successfully");
});

qaRoutes.route('/').get(function(req, res) {
    
    Qa.find(function(err, qas) {
        if (err) {
            console.log(err);
        } else {
            res.json(qas);
        }
    });
});

qaRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Qa.findById(id, function(err, qa) {
        res.json(qa);
    });
});

qaRoutes.route('/add').post(function(req, res) {
    let qa = new Qa(req.body);
    qa.save()
        .then(qa => {
            res.status(200).json({'qa': 'qa added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new qa failed');
        });
});

qaRoutes.route('/update/:id').post(function(req, res) {
    Qa.findById(req.params.id, function(err, qa) {
        if (!qa)
            res.status(404).send("data is not found");
        else
            qa.qa_question = req.body.qa_question;
            qa.qa_description = req.body.qa_description;
            qa.qa_answer = req.body.qa_answer;
            qa.save().then(qa => {
                res.json('QA updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

app.use('/qas', qaRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});