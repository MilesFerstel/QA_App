import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Qa = props => (
    <tr>
        <td>{props.qa.qa_question}</td>
        <td>{props.qa.qa_description}</td>
        <td>{props.qa.qa_answer}</td>
        <td>
            <Link to={"/answer/"+props.qa._id}>Answer</Link>
        </td>
    </tr>
)

export default class QaList extends Component {

    constructor(props) {
        super(props);
        this.state = {qas: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/qas/')
            .then(response => {
                this.setState({ qas: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    qaList() {
        return this.state.qas.map(function(currentQa, i){
            return <Qa qa={currentQa} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>QA List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Description</th>
                            <th>Answer</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.qaList() }
                    </tbody>
                </table>
            </div>
        )
    }
}