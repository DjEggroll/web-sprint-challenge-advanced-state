import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './../state/action-creators';
import { fetchQuiz } from './../state/action-creators';


export function Quiz(props) {
  console.log(props);
  const { quiz, selectedAnswer } = props;
  

  useEffect(() => {
    props.fetchQuiz();
  }, []);

  const handleClick = (evt) => {
    props.selectAnswer(evt.target.value);
    props.setMessage('');
    
    
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if(selectedAnswer === '1'){
      props.setMessage('Nice job! That was the correct answer')
    } else {
      props.setMessage('What a shame! That was the incorrect answer')
    }
    props.fetchQuiz();
    props.selectAnswer(null);
  }
  
  return (
    <div id="wrapper">
      { 
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className={selectedAnswer === '1' ?"answer selected" : "answer" }>
                {quiz.answers[0].text}
                <button onClick={handleClick} value='1'>
                  {selectedAnswer === '1' ? `SELECTED` : `Select`}
                </button>
              </div>

              <div className={selectedAnswer === '2' ? "answer selected" : "answer" }>
                {quiz.answers[1].text}
                <button onClick={handleClick} value='2'>
                  {selectedAnswer === '2' ? `SELECTED` : `Select`}
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <button disabled={selectedAnswer ? false : true } id="submitAnswerBtn">Submit answer</button>
            </form>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(st => st, actionCreators)(Quiz)