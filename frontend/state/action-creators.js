// ❗ You don't need to add extra action creators to achieve MVP
import * as types from './action-types';
import axios from 'axios';

export function moveClockwise() {
  return({
    type: types.MOVE_CLOCKWISE
  })
 }

export function moveCounterClockwise() {
  return({
    type: types.MOVE_COUNTERCLOCKWISE
  })
 }

export function selectAnswer(value) {
  return({
    type: types.SET_SELECTED_ANSWER,
    payload: value
  })
 }

export function setMessage(value) { 
  return({
    type: types.SET_INFO_MESSAGE,
    payload: value
  })
}

export function setQuiz(state) {
  return({
    type: types.SET_QUIZ_INTO_STATE,
    payload: state
  })
 }

export function inputChange(state, id, value) {
  return({
    type:types.INPUT_CHANGE,
    payload: {...state, [id]: value }
  })
 }

export function resetForm() {
  return({
    type: types.RESET_FORM
  })
 }

// ❗ Async action creators
export const fetchQuiz = () => (dispatch) => {
  // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
  // On successful GET:
  // - Dispatch an action to send the obtained quiz to its state
    // dispatch(setQuiz(null));
      dispatch(setQuiz(null));
      console.log("WTF BRO");
      axios.get('http://localhost:9000/api/quiz/next')
        .then(res => {
          dispatch(setQuiz(res.data))
        })
        .catch(err => {
          console.error(err)
        });
}
 
export function postAnswer(answer) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    axios.post('http://localhost:9000/api/quiz/answer', answer)
      .then(res => {
        // console.log(res)
        dispatch(selectAnswer(null));
        dispatch(setMessage(res.data.message));
        dispatch(fetchQuiz());
      })
      .catch(err => {
        // console.log(err)
        dispatch(selectAnswer(null));
        dispatch(setMessage(err.data.message));
        dispatch(fetchQuiz());
      })
  }
}
export function postQuiz(formState) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new', formState)
      .then(res => {
        dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`));
        dispatch(resetForm());
      })
      .catch(err => {
        console.log(err)
      })
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
