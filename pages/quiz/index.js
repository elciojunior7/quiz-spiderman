/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import db from '../../db.json';
import Button from '../../src/components/Button';
import GitHubCorner from '../../src/components/GitHubCorner';
import Header from '../../src/components/Header';
import QuizLogo from '../../src/components/QuizLogo';
import QuizBackground from '../../src/components/QuizBackground';
import Widget from '../../src/components/Widget';
import AlternativeForm from '../../src/components/AlternativeForm';

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

function ResultWidget({ result }) {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        <p>
          {/* {result.reduce((currentSum, currentResult) => {
             const sum = currentResult === true ? currentSum + 1 : currentSum;
             return sum;
            }, 0)}
          */}
          {`Você acertou
            ${result.filter((currentResult) => currentResult).length}
          pergunta(s)`}
        </p>
        <table>
          {result.map((r, index) => (
            <tr>
              {`Pergunta
              ${index + 1}
              =`}
              {r === true ? ' Acertou' : ' Errou'}
            </tr>
          ))}
        </table>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const questionId = `question__${questionIndex}`;
  const [isOptionSubmitted, setIsOptionSubmited] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const isCorrect = selectedOption === question.answer;
  return (
    <Widget>
      <Widget.Header>
        {/* <BackLinkArrow href="/" /> */}
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativeForm
          onSubmit={(e) => {
            e.preventDefault();
            setIsOptionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsOptionSubmited(false);
              setSelectedOption(undefined);
            }, 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const optionStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedOption === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isOptionSubmitted && optionStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedOption(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={selectedOption === undefined}>
            Confirmar
          </Button>
          {isOptionSubmitted && isCorrect && <p>Boa, acertou em cheio</p>}
          {isOptionSubmitted && !isCorrect && <p>Essa você errou</p>}
        </AlternativeForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function Home() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [result, setResult] = useState([]);
  const totalQuestions = db.questions.length;
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(r) {
    setResult([
      ...result,
      r,
    ]);
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1200);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <>
      <Header />
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          {screenState === screenStates.QUIZ && (
            <QuestionWidget
              question={question}
              questionIndex={questionIndex}
              totalQuestions={totalQuestions}
              onSubmit={handleSubmitQuiz}
              addResult={addResult}
            />
          )}
          {screenState === screenStates.LOADING && <LoadingWidget />}
          {screenState === screenStates.RESULT && <ResultWidget result={result} />}
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/elciojunior7" />
      </QuizBackground>
    </>
  );
}
