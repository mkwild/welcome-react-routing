import React, { Component } from 'react';
//import our service
import JeopardyService from "../../jeopardyService";
import JeopardyDisplay from "./JeopardyDisplay"

class Jeopardy extends Component {
  //set our initial state and set up our service as this.client on this component
  constructor(props){
    super(props);
    this.client = new JeopardyService();
    this.state = {
      data: {
        "id": null,
        "answer": "",
        "question": "",
        "value": null,
        "airdate": "",
        "created_at": "",
        "updated_at": "",
        "category_id": null,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": null,
            "title": "",
            "created_at": "",
            "updated_at": "",
            "clues_count": null
            }
        },
      score: 0,
      userAnswer: ""
    }
  }
  //get a new random question from the API and add it to the data object in state
  getNewQuestion() {
    return this.client.getQuestion().then(result => {
      this.setState({
        data: result.data[0]
      })
    })
  }
  //when the component mounts, get the first question
  componentDidMount() {
    this.getNewQuestion();
  }
  //when user types an answer for the question into the form
  handleChange = (event) => {
      this.setState({
          userAnswer: event.target.value
      })
  }
  //when user submits their answer to the question
  handleSubmit = (event) => {
      event.preventDefault()

      if (this.state.userAnswer.toLowerCase() === this.state.data.answer.toLowerCase()) {
        let points = this.state.data.value
        let newScore = this.state.score + points
        this.setState({
            score: newScore
        })
      }
      else {
        let points = this.state.data.value
        let newScore = this.state.score - points
        this.setState({
            score: newScore
        })
        alert(`The correct answer was ${this.state.data.answer}`)
      }
      this.getNewQuestion()
  }
  //display the results on the screen
  render() {

    return (
        <JeopardyDisplay score={this.state.score} category={this.state.data.category.title} value={this.state.data.value} question={this.state.data.question} answer={this.state.data.answer} handleSubmit={this.handleSubmit} handleChange={this.handleChange} userAnswer={this.state.userAnswer} />
    //   <div>
    //     <strong>Score: </strong> {this.state.score}
    //     <br/>
    //     <strong>Category: </strong> {category}
    //     <br/>
    //     <strong>Value: </strong> {this.state.data.value}
    //     <br/>
    //     <strong>Question: </strong> {this.state.data.question}
    //     <br/>
    //     <form onSubmit={this.handleSubmit}>
    //         <div>
    //             <label htmlFor="userAnswer">Answer: </label>
    //             <input
    //                 type="text"
    //                 name="userAnswer"
    //                 value={this.state.userAnswer}
    //                 onChange={this.handleChange}
    //             />
    //         </div>
    //         <button>Submit Answer</button>
    //     </form>
    //   </div>
    );
  }
}

export default Jeopardy;