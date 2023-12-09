import React, { useState, useContext } from "react";
import styles from "./QuestionGuide.module.css";
import { UserDispatch } from "../App";

// import axios from "axios";
// import useAsync from "./useAsync";
//https://chanhuiseok.github.io/posts/js-6/

function requestStreamData(){

}

async function openaiAPI(question) {
  // const response = await axios.get(
  //   `https://jsonplaceholder.typicode.com/users/${question}`
  // );
  console.log("request api");
  try{
    const response = await fetch(
      "http://localhost:3002/get-chatgpt-result-stream",
      {
        headers: {
          "content-type": "application/json",
        },
         body: `{"prompt":${question},"model":"chatgpt","uniqueid":"id-1701320901058-0.1831593819aa5"}`,
        method: "POST",
      }
    )
    console.log(response);
    if(response.ok){
      const returnRes = response.json();
      console.log("res>>>>>>>")
      console.log(returnRes);
      return returnRes;
    }else{
      throw new Error(response.type)
    }
  }catch (e){
    console.log(`응답오류 : `)
    console.log(e)
    return "응답오류"
  }
  
}

const streamTest = (e) =>{

const stream = new ReadableStream({
  start(controller) {
    console.log("start");
    let num = 0;

    const interval = setInterval(() => {
      controller.enqueue(num++);
      if (num === 10) {
        controller.close();
        clearInterval(interval);
      }
    }, 1_000);



  },
});

  const reader = stream.getReader();
reader.read().then(function print({ done, value }) {
  if (done) return console.log("done");
  console.log({ value });
  reader.read().then(print);
});
}


function QuestionGuide() {
  const [input, setInput] = useState("");
  const dispatch = useContext(UserDispatch);

  // const [state, refetch] = useAsync(openaiAPI);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = async () => {
    
    // let answer = await refetch(input);
    // const { loading, data, error } = state;
    // let answer = data;
    // if (error) answer = error;
    // if (!data) answer = "응답없음";

    let answer = await openaiAPI(input)
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
         <button onClick={streamTest}></button>
      </div>
    </div>
  );
}

export default QuestionGuide;
