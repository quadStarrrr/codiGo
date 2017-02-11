import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Question from './Question.jsx';

class QuestionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    }
  }

  componentDidMount() {
    //make request to our database to get list of questions
    //update questions arr
    axios.get('/loadForum')
      .then(res => {
        const tempArr = [];
        res.data.forEach((el, i) => {
          tempArr.unshift(<Question 
                        key={i}
                        id={el.question_id}
                        description={el.question_title}
                        questionText={el.question_text}
                        username={this.props.username}
                      />);
        });
        this.setState({ questions: tempArr });
      })
      .catch((err) => {
        console.log(err);
      });

  // store response of each one in <Question title="Test" description="testing 123" />
  }

  render() {
    return (
      <div className="question-container">
        <div className="question-box">
          <h1>Hello {this.props.username}</h1>
          <Link to='/createQuestion'><input className="loginButton btn" value="Ask a Question" /></Link>
        </div>
        <div className="questions">
          {this.state.questions}
        </div>
      </div>
    )
  }
}


export default QuestionContainer;