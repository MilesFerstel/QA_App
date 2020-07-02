const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Qa = new Schema({
    qa_question: {
        type: String
    },
    qa_description: {
        type: String
    },
    qa_answer: {
        type: String
    }
});

module.exports = mongoose.model('Qa', Qa);