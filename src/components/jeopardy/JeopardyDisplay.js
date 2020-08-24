import React, { Component } from "react"

class JeopardyDisplay extends Component {

    render() {
        return(
            <div>
                <strong>Category: </strong> {this.props.category}
                <br/>
                <strong>Value: </strong> {this.props.value}
                <br/>
                <strong>Question: </strong> {this.props.question}
                <br/>
                <form onSubmit={this.props.handleSubmit}>
                    <div>
                        <label htmlFor="userAnswer">Answer: </label>
                        <input
                            type="text"
                            name="userAnswer"
                            value={this.props.userAnswer}
                            onChange={this.props.handleChange}
                        />
                    </div>
                    <button>Submit Answer</button>
                </form>
                <br/>
                <strong>Score: </strong> {this.props.score}
            </div>
        )
    }
}

export default JeopardyDisplay