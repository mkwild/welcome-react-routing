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
      data: [{
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
        {
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
        {
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
        ],
    score: 0,
    userAnswer: "",
    categorySelected: false
    }
  }
  //get a new random question from the API and add it to the data object in state
  getNewQuestion() {
    return this.client.getQuestion().then(result => {
      this.setState({
        data: result.data
      })
      console.log(this.state.data)
    })
  }
  //when the component mounts, get the first question
  componentDidMount() {
    this.getNewQuestion();
  }
  //when user selects the category
  handleSelectCategory = (event) => {
    let selection = event.target.name
    let newData = this.state.data
    if(selection === "0") {
        newData = this.state.data[0]
    }
    else if(selection === "1") {
        newData = this.state.data[1]
    }
    else if (selection === "2") {
        newData = this.state.data[2]
    }
    this.setState({
        data: newData,
        categorySelected: true
    })
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
      this.setState({
        data: [{
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
            {
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
            {
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
            ],
        categorySelected: false
      })
      this.getNewQuestion()
  }
  //display the results on the screen
  render() {
    if(!this.state.categorySelected) {
        return (
            <div>
                <button name="0" onClick={this.handleSelectCategory}>{this.state.data[0].category.title}</button>
                <button name="1" onClick={this.handleSelectCategory}>{this.state.data[1].category.title}</button>
                <button name="2" onClick={this.handleSelectCategory}>{this.state.data[2].category.title}</button>
            </div>
        )
    }
    else{
        return (
            <JeopardyDisplay score={this.state.score} category={this.state.data.category.title} value={this.state.data.value} question={this.state.data.question} answer={this.state.data.answer} handleSubmit={this.handleSubmit} handleChange={this.handleChange} userAnswer={this.state.userAnswer} />
        );
    }
  }
}

export default Jeopardy;