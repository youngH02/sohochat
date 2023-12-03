import React, { useEffect } from "react";
import styles from "./Chat.module.css";

const QA = function QA({ questionsSet }) {
  const { question, answer } = questionsSet;

  return (
    <div>
      <div className={styles.question}>
        <img src="resources/person.png" alt="person icon" />
        <div className={styles.qatxt}> {question}</div>
      </div>
      <div className={styles.answer}>
        <img src="resources/ans.png" alt="answer icon" />
        <div className={styles.qatxt}>{answer}</div>
      </div>
    </div>
  );
};

function QAList({ questionsSet }) {
  return (
    <div className={styles.qalist}>
      {questionsSet.map((questionSet, index) => (
        <QA questionsSet={questionSet} key={index} />
      ))}
    </div>
  );
}

export default QAList;
