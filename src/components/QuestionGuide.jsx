import React, { useState, useContext } from "react";
import styles from "./QuestionGuide.module.css";
import { UserDispatch } from "../App";

import axios from "axios";
import useAsync from "./useAsync";

async function openaiAPI(question) {
  // const response = await axios.post(
  //   "http://localhost:3002/get-chatgpt-result-stream",
  //   {
  //     // headers: {
  //     //   "content-type": "application/json",
  //     // },
  //     prompt: "hello",
  //     model: "chatgpt",
  //     uniqueid: "id-1701320901058-0.1831593819aa5",
  //     // "method": "POST",
  //   }
  // );
  // const response = await axios.get(
  //   `https://jsonplaceholder.typicode.com/users/${question}`
  // );
  console.log("request api");
  const response = await fetch(
    "http://localhost:3002/get-chatgpt-result-stream",
    {
      headers: {
        "content-type": "application/json",
      },
      body: '{"prompt":"hello","model":"chatgpt","uniqueid":"id-1701320901058-0.1831593819aa5"}',
      method: "POST",
    }
  );
  const returnRes = response.json();
  console.log(returnRes);
  return returnRes;
}

function QuestionGuide() {
  const [input, setInput] = useState("");
  const dispatch = useContext(UserDispatch);

  const [state, refetch] = useAsync(openaiAPI);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = async () => {
    let answer = await refetch(input);

    const { loading, data, error } = state;
    // let answer = data;
    if (error) answer = error;
    if (!data) answer = "응답없음";

    console.log(answer);
    const qaSet = {
      //배열에 추가할 객체를 만들기
      question: input,
      answer: answer,
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
