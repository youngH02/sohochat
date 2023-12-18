import React, { useReducer, createContext } from "react";
import "./App.css";
import Header from "./components/Header";
import QAList from "./components/QAList";
import QuestionGuide from "./components/QuestionGuide";

const INITIAL_QUESTION_SET = [
  {
    id: 1,
    question: "유플러스 우리가게 패키지에 대해서 알려줘",
    answer:
      "유플러스에서 제공하는 우리가게패키지는 온라인 비즈니스를 운영하는 소상공인 및 개인사업자들이 온라인상으로 자신의 상품 및 서비스를 판매할 수 있도록 돕는 서비스입니다.",
  },
];

const ACTION = { ADD_QA: "ADD_QA", ADD_ANSWER: "ADD_ANSER" };
function reducer(state, action) {
  switch (action.type) {
    case ACTION["ADD_QA"]:
      if (action.qaSet.question === "") return state;
      return state.concat({ id: state.length + 1, ...action.qaSet });
    case ACTION["ADD_ANSWER"]:
      // console.log(state);
      return state.map((set) =>
        set.id === state.length
          ? { ...set, answer: set.answer + action.set.answer }
          : set
      );

    default:
      return state;
  }
}
export const UserDispatch = createContext(null);

function App() {
  const [questionSet, dispatch] = useReducer(reducer, INITIAL_QUESTION_SET);
  return (
    <div className="App">
      <Header />
      <UserDispatch.Provider value={dispatch}>
        <QuestionGuide />
        <QAList questionsSet={questionSet} />
      </UserDispatch.Provider>
    </div>
  );
}

export { App as default, ACTION };
