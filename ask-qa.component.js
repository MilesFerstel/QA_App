import React, { Component } from 'react';
import axios from 'axios';

export default class AskQa extends Component {

    constructor(props) {
        super(props);

        this.onChangeQaQuestion = this.onChangeQaQuestion.bind(this);
        this.onChangeQaDescription = this.onChangeQaDescription.bind(this);
        this.onChangeQaAnswer = this.onChangeQaAnswer.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            qa_question:'',
            qa_description:'',
            qa_answer:''
        }
    }

    onChangeQaQuestion(e){
            this.setState({
                qa_question: e.target.value
            });
    }

    onChangeQaDescription(e){
            this.setState({
                qa_description: e.target.value
            });
    }

    onChangeQaAnswer(e){
            this.setState({
                qa_answer: e.target.value
            });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`QA Question: ${this.state.qa_question}`);
        console.log(`QA Description: ${this.state.qa_description}`);
        console.log(`QA Answer: ${this.state.qa_answer}`);

        const newQa = {
            qa_question: this.state.qa_question,
            qa_description: this.state.qa_description,
            qa_answer: this.state.qa_answer
        }
        
        axios.post('http://localhost:4000/qas/add', newQa)
            .then(res => console.log(res.data));

        this.setState({
            qa_question:'',
            qa_description:'',
            qa_answer:''
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Ask a Question</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Question: </label>
                        <input type= "text"
                                className="form-control"
                                value={this.state.qa_question}
                                onChange={this.onChangeQaQuestion}
                                />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type= "text"
                                className="form-control"
                                value={this.state.qa_description}
                                onChange={this.onChangeQaDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Answer: </label>
                        <input type= "text"
                                className="form-control"
                                value={this.state.qa_answer}
                                onChange={this.onChangeQaAnswer}
                                />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Ask Question" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}