import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './assets/style.css';
import QuestionBox from './componenets/QuestionBox';
import Result from './componenets/Result';
import quizServices from "./quizServices";

class Quiz extends Component {
  state = { 
    questionBank: [],
    score:0,
    responses:0
   }


   getQuestions = () =>{

    quizServices().then( question => {
      this.setState({
        questionBank:question
      })
    })
   }

   computAnswer =(answer,correctAnswer) =>{
     if(answer=== correctAnswer){

      this.setState({
        score:this.state.score + 1
      })

      this.setState({
        responses:this.state.responses < 5 ? this.state.responses +1 : 10
      })

     }
   }

   playAgain = () =>{

    this.getQuestions();
    this.setState({
      score:0,
      responses:0
    }); 

   }


   componentDidMount(){
     this.getQuestions();
   }
  render() { 
    return (  
      
      <div className="">
        <div className="title">Stevenviko Quiz App </div>
        
        {this.state.questionBank.length > 0 && 
        this.state.responses < 10  &&
        this.state.questionBank.map(
          ({question, answers, correct, questionId}) =>(
          <QuestionBox question={question} options={answers} key={questionId}
          selected={answer => this.computAnswer(answer,correct)}
          />)
        )}
        {this.state.responses === 10 ? (<h2>{<Result score={this.state.score} playAgain={this.playAgain} />}</h2>) : null}

      </div>
      

    );
  }
}
 


ReactDom.render(<Quiz />, document.getElementById("root"))
