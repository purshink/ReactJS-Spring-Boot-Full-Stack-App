import React from "react";
import Footer from "../../../fragments/footer/Footer";
import TestResultsService from "../../../../../api/test/TestResultsService";
import AuthenticationService from "../../../../../api/authentication/AuthenticationService";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../../../../css/Test.module.css";
import style from "../../../../../css/Footer.module.css";
import layout from "../../../../../css/UserHome.module.css";
import BackgroundHome from "../../../fragments/background/BackgroundHome";

const TestForm = () => {
  let key = 1;
  let username = AuthenticationService.getLoggedInUser();
  let [loading, setLoading] = useState(true);

  const questions = [
    {
      questionText: "What is missing in your life?",
      value: "categoryOne",
      answerOptions: [
        { answerText: "Excitement", category: "FUN" },
        { answerText: "Mental stimulation", category: "INTELLECTUAL" },
        { answerText: "Pushing my boundaries", category: "ACTIVE" },
        { answerText: "Creativity", category: "CREATIVE" },
      ],
    },
    {
      questionText: "Do you enjoy social activities?",
      value: "categoryTwo",
      answerOptions: [
        { answerText: "Yes", category: "SOCIAL" },
        { answerText: "No", category: "OTHER" },
        { answerText: "Sometimes", category: "SOCIAL" },
        { answerText: "Not sure", category: "OTHER" },
      ],
    },
    {
      questionText: "Are you an active person?",
      value: "categoryThree",
      answerOptions: [
        { answerText: "Yes", category: "ACTIVE" },
        { answerText: "No", category: "OTHER" },
        { answerText: "Sometimes", category: "ACTIVE" },
        { answerText: "Not sure", category: "OTHER" },
      ],
    },
    {
      questionText: "How did you spend your last weekend?",
      value: "categoryFour",
      answerOptions: [
        { answerText: "On the computer", category: "INTELLECTUAL" },
        { answerText: "On the couch", category: "RELAX" },
        { answerText: "Outside", category: "ACTIVE" },
        { answerText: "Other", category: "OTHER" },
      ],
    },
    {
      questionText: "Where did you spent your last vacation?",
      value: "categoryFive",
      answerOptions: [
        { answerText: "In the mountains", category: "ACTIVE" },
        { answerText: "On the beach", category: "RELAX" },
        { answerText: "At home", category: "RELAX" },
        { answerText: "Other", category: "OTHER" },
      ],
    },
    {
      questionText: "What is the best compliment you've ever received?",
      value: "categorySix",
      answerOptions: [
        { answerText: "You are creative", category: "CREATIVE" },
        { answerText: "You are fit", category: "ACTIVE" },
        { answerText: "You are smart", category: "INTELLECTUAL" },
        { answerText: "You are a good person", category: "SOCIAL" },
      ],
    },
    {
      questionText: "Are you willing to commit?",
      value: "categorySeven",
      answerOptions: [
        { answerText: "Yes, always", category: "OTHER" },
        { answerText: "Sometimes", category: "OTHER" },
        {
          answerText: "Only if I find the perfect activity",
          category: "OTHER",
        },
        { answerText: "No", category: "OTHER" },
      ],
    },
    {
      questionText: "Your location?",
      value: "location",
      answerOptions: [
        { answerText: "Zurich", category: "ZURICH" },
        { answerText: "Bern", category: "BERN" },
        { answerText: "Luzern", category: "LUZERN" },
        { answerText: "Zug", category: "ZUG" },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [test, setTest] = useState({
    username: username,
  });

  const handleAnswerOptionClick = (answer) => {
    console.log(questions[currentQuestion].value);
    console.log(answer);

    setTest((test) => ({
      ...test,
      [questions[currentQuestion].value]: answer,
    }));

    const nextQuestion = currentQuestion + 1;
    setCurrentQuestion(nextQuestion);
    if (nextQuestion === questions.length) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const check_uploaded = () => {
      if (!loading) {
        TestResultsService(test);
      }
    };
    check_uploaded();
  }, [loading, test]);

  return (
    <>
      <main className={layout.hobbie_main}>
        {currentQuestion === questions.length && (
          <div className={styles.test_form_end}>
            <section className={styles.test_end}>
              Thank you! Please visit your homepage to discover your new hobby!{" "}
              <br></br>
              <button type="submit" className={styles.button}>
                <Link to="/user-home" className={styles.link_home}>
                  Discover
                </Link>
              </button>
            </section>
          </div>
        )}

        {currentQuestion !== questions.length && (
          <div className={styles.test_form}>
            <section className={styles.question_section}>
              {currentQuestion !== questions.length && (
                <div className={styles.question_count}>
                  <span>Question {currentQuestion + 1}</span>
                </div>
              )}

              {currentQuestion !== questions.length && (
                <div className={styles.question_text}>
                  {questions[currentQuestion].questionText}
                </div>
              )}
            </section>
            <section className={styles.answer_section}>
              {currentQuestion !== questions.length &&
                questions[currentQuestion].answerOptions.map((answerOption) => (
                  <button
                    key={key++}
                    className={styles.test_button}
                    onClick={() =>
                      handleAnswerOptionClick(answerOption.category)
                    }
                  >
                    {answerOption.answerText}
                  </button>
                ))}
            </section>
          </div>
        )}
      </main>
      <Footer class={style.footer_hobbie_details} />
      <BackgroundHome />
    </>
  );
};

export default TestForm;
