import React, { useState, useContext } from "react";
import styles from "./QuestionGuide.module.css";
import { UserDispatch } from "../App";

function QuestionGuide() {
  const [input, setInput] = useState("");
  const dispatch = useContext(UserDispatch);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    const qaSet = {
      //배열에 추가할 객체를 만들기
      question: input,
      answer: "answertest",
    };

    dispatch({ type: "ADD_QA", qaSet });

    setInput("");
  };

  return (
    <div className={styles.question_guide}>
      <header>
        ChatGPT에게 물어보기 &nbsp;
        <span className={styles.question_guide_beta}>beta</span>
      </header>
      <p>
        오늘은 무엇을 도와드릴까요?
        <br />
        chatGPT에게 물어보세요.
      </p>
      <div>
        <input
          name="question"
          type="text"
          onChange={handleChange}
          value={input}
          placeholder="질문을 입력해주세요."
        />
        <button onClick={handleClick}>
          <img src="resources/send.png" alt="send icon" />
        </button>
      </div>
    </div>
  );
}

export default QuestionGuide;
