import React, { useReducer, createContext } from "react";
import "./App.css";
import Header from "./components/Header";
import QAList from "./components/QAList";
import QuestionGuide from "./components/QuestionGuide";

const INITIAL_QUESTION_SET = [
  {
    question:
      "1. 테스트질문테스트 응답테스트 응답테스트 응답테스트 응답테스트 응답테스트 응답테스트 응답ddddddddddddadsafas응답ddddddddddddadsafas응답ddddddddddddadsafas응답ddddddddddddadsafas",
    answer:
      "1. 테스트 응답테스트 응답테스트 응답테스트 응답테스트 응답테스트 응답테스트 응답테스트 응답테스트 응답테스트 응답테스트 응답테스트 응답테스트 응답테스트 응답",
  },
  { question: 2, answer: "ar" },
];

function reducer(state, action) {
  switch (action.type) {
    case "ADD_QA":
      if (action.qaSet.question === "") return state;
      else return state.concat(action.qaSet);
    default:
      return state;
  }
}
export const UserDispatch = createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_QUESTION_SET);
  return (
    <div className="App">
      <Header />
      <UserDispatch.Provider value={dispatch}>
        <QuestionGuide />
        <QAList questionsSet={state} />
      </UserDispatch.Provider>
    </div>
  );
}

export default App;
