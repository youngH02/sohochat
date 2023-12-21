import React, { useState } from "react";
import styles from "./QuestionGuide.module.css";

import { useChatQAStore } from "../store";

function QuestionGuide() {
  const [input, setInput] = useState("");
  const { addQuestion, addAnswer } = useChatQAStore();
  const [isDisable, setIsDisable] = useState(false);

  async function requestChat(input) {
    setIsDisable(true);
    const response = await fetch(
      "http://localhost:3002/get-chatgpt-result-stream",
      {
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          prompt: input,
          model: "chatgpt",
          uniqueid: "id-1701320901058-0.1831593819aa5",
        }),
        method: "POST",
      }
    );
    const reader = response.body.getReader();
    reader.read().then(function pump({ done, value }) {
      if (done) {
        setInput("");
        setIsDisable(false);
        return;
      } else {
        const answer = new TextDecoder().decode(value);
        // dispatch({ type: ACTION.ADD_ANSWER, set: { question: input, answer } });
        addAnswer(answer);
      }
      return reader.read().then(pump);
    });
  }

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = async () => {
    if (input === "") return;
    // dispatch({ type: ACTION.ADD_QA, qaSet });
    const qaSet = {
      question: input,
      answer: "",
    };
    addQuestion(qaSet);
    await requestChat(input);
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
          disabled={isDisable}
          placeholder="질문을 입력해주세요."
        />
        <button
          onClick={handleClick}
          className={isDisable ? styles.changeColor : ""}
          disabled={isDisable}>
          <img src="resources/send.png" alt="send icon" />
        </button>
      </div>
    </div>
  );
}

export default QuestionGuide;
