import React, {Component} from 'react'


var firebase = require('firebase')
var uuid = require('uuid')

 var config = {
     apiKey: "AIzaSyDHk0RPIdYMxaabyr_r5bhThPze8YB77pY",
     authDomain: "usurvey-001.firebaseapp.com",
     databaseURL: "https://usurvey-001.firebaseio.com",
     projectId: "usurvey-001",
     storageBucket: "usurvey-001.appspot.com",
     messagingSenderId: "1044358092500"
 };
 firebase.initializeApp(config);


class Usurvey extends Component {


    nameSubmit(){
        var studentName = this.refs.name.value
        this.setState({studentName: studentName}, () =>{
            console.log(this.state)
        })
    }

    answerSelected(event){
        var answers = this.state.answer
        
        if(event.target.name === "answer1"){
            answers.answer1 = event.target.value
        }else if(event.target.name === "answer2"){
            answers.answer2 = event.target.value
        }else if(event.target.name === "answer3"){
            answers.answer3 = event.target.value
        }
    }

    questionSubmited(){
        firebase.database().ref('uSurvey/' + this.state.uid).set({
            studentName: this.state.studentName,
            answer: this.state.answer
        })

        this.setState({
            isSubmitted: true
        })
    }

    constructor(){
        super()
        this.state = {
            uid: uuid.v1(),
            studentName: "",
            answer: {
                answer1: "",
                answer2: "",
                answer3: ""
            },
            isSubmitted: false
        }

        this.nameSubmit = this.nameSubmit.bind(this)
        this.answerSelected = this.answerSelected.bind(this)
        this.questionSubmited = this.questionSubmited.bind(this)
    }


    render(){

        var studentName
        var questions

        if(this.state.studentName === "" && this.state.isSubmitted === false){
            studentName = <div>
                <h3>Hey.. please tell your name..</h3>
                <form onSubmit={this.nameSubmit}>
                    <input class="input" type="text" placeholder="enter your name" ref="name"/>
                </form>
            </div>;

            questions = ""
        }else if(this.state.studentName != "" && this.state.isSubmitted === false){
            studentName = <div>
                <h3>Wellcome to U-Survey, {this.state.studentName}</h3>
            </div>

            questions = <div>
                <h3>Here are some question for you..</h3>
                <form onSubmit={this.questionSubmited}>
                    <div class="card">
                        <label>What kind course your interested</label><br />
                        <input type="radio" name="answer1" ref="question1" value="technology" onChange={this.answerSelected} />tech <br />
                        <input type="radio" name="answer1" ref="question2" value="art" onChange={this.answerSelected} />art <br />
                        <input type="radio" name="answer1" ref="question3" value="design" onChange={this.answerSelected} />design <br />
                        
                    </div>
                    
                    <div class="card">
                        <label>You are a ?</label><br />
                        <input type="radio" name="answer2" ref="question1" value="student" onChange={this.answerSelected} />student <br />
                        <input type="radio" name="answer2" ref="question2" value="professional" onChange={this.answerSelected} />professional <br />
                        <input type="radio" name="answer2" ref="question3" value="artist" onChange={this.answerSelected} />artist <br />
                        
                    </div>

                    <div class="card">
                        <label>is online learning helpfull ?</label><br />
                        <input type="radio" name="answer3" ref="question1" value="yes" onChange={this.answerSelected} />yes <br />
                        <input type="radio" name="answer3" ref="question2" value="not sure" onChange={this.answerSelected} />not sure <br />
                        <input type="radio" name="answer3" ref="question3" value="no" onChange={this.answerSelected} />no <br />
                        
                    </div>

                    <input type="submit" value="submit" class="feedback-button"/>



                </form>
            </div>

        }else if(this.state.isSubmitted === true){
            studentName = <div>
                <h1>Thanks, {this.state.studentName}</h1>
            </div>;

            questions = <div>
                <h3>Your answer is:</h3>
                <ul>
                    <li>{this.state.answer.answer1}</li>
                    <li>{this.state.answer.answer2}</li>
                    <li>{this.state.answer.answer3}</li>
                </ul>
            </div>
            setTimeout(() => {
                window.location.reload()
            }, 3000);
        }

        return(
            <div class="header">
                {studentName}
                --------------------------
                {questions}

            </div>
        )
    }
}

export default Usurvey

