import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  console.log(props);
  const onChange = evt => {
    props.inputChange(props.form, evt.target.id, evt.target.value);
  }

  const onSubmit = evt => {
    evt.preventDefault();
    props.postQuiz({
      "question_text": props.form.newQuestion,
      "true_answer_text": props.form.newTrueAnswer,
      "false_answer_text": props.form.newFalseAnswer
    });
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={props.form.newQuestion} />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={props.form.newTrueAnswer}/>
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={props.form.newFalseAnswer}/>
      <button disabled={props.form.newQuestion.trim() && props.form.newFalseAnswer.trim() && props.form.newTrueAnswer.trim() ? false : true} id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
