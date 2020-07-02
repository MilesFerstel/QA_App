import React, { Component } from 'react';
import axios from 'axios';


export default class AnswerQa extends Component {

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

    componentDidMount() {
        axios.get('http://localhost:4000/qas/'+this.props.match.params.id)
            .then(response => {
                this.setState({ 
                    qa_question: response.data.qa_question,
                    qa_description: response.data.qa_description,
                    qa_answer: response.data.qa_answer
                })
            })
            .catch(function (error){
                console.log(error);
            })
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

        const obj = {
            qa_question: this.state.qa_question,
            qa_description: this.state.qa_description,
            qa_answer: this.state.qa_answer
        };
        console.log(obj);
        
        axios.post('http://localhost:4000/qas/add', this.props.match.params.id, obj)
            .then(res => console.log(res.data));

            this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 align="center">Answer Question</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Question: </label>
                        <input type = "text"
                                className="form-control"
                                value={this.state.qa_question}
                                onChange={this.onChangeQaQuestion}
                                />
                    </div>
                    <div className="form-group">
                    <label>Description: </label>
                        <input type = "text"
                                className="form-control"
                                value={this.state.qa_description}
                                onChange={this.onChangeQaDescription}
                                />
                    </div>
                    <div className="form-group">
                    <label>Answer: </label>
                        <input type = "text"
                                className="form-control"
                                value={this.state.qa_answer}
                                onChange={this.onChangeQaAnswer}
                                />
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Answer Question" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}