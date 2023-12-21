import React from "react";
import "./App.css";
import Header from "./components/Header";
import QAList from "./components/QAList";
import QuestionGuide from "./components/QuestionGuide";
import { useChatQAStore } from "./store";

export default function App() {
  const { questionSet } = useChatQAStore();
  return (
    <div className="App">
      <Header />
      <QuestionGuide />
      <QAList questionsSet={questionSet} />
    </div>
  );
}
