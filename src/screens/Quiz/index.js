/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
// import db from '../../../db.json';
import Button from '../../components/Button';
import GitHubCorner from '../../components/GitHubCorner';
import Header from '../../components/Header';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import Widget from '../../components/Widget';
import AlternativeForm from '../../components/AlternativeForm';
import BackLinkArrow from '../../components/BackLinkArrow';
import Lottie from 'react-lottie';
import animationData from '../../../loading.json'

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
  const router = useRouter();
  const playername = router.query.name;
  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        {`${playername}, você acertou
            ${result.filter((currentResult) => currentResult).length}
          pergunta(s)`}
      </Widget.Header>

      <Widget.Content>
        <table>
          <tbody>
            {result.map((r, index) => (
              <tr key={index}>
                <td>
                  {`Pergunta
                  ${index + 1}
                  =`}
                  {r === true ? ' Acertou' : ' Errou'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        <Lottie options={defaultOptions}
          height={300}
          width={300}
        />
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
  const router = useRouter();
  const playername = router.query.name;
  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
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
                  checked={false}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={selectedOption === undefined}>
            Confirmar
          </Button>
          {isOptionSubmitted && isCorrect && <p className='success'>Boa {playername}, acertou em cheio</p>}
          {isOptionSubmitted && !isCorrect && <p className='failed'>{playername}, essa você errou ;/</p>}
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

export default function Home({ externalQuestions, externalBg }) {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [result, setResult] = useState([]);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const totalQuestions = externalQuestions.length;

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
      setScreenState(screenStates.LOADING);
      setTimeout(() => {
        setScreenState(screenStates.RESULT);
      }, 1500);
    }
  }

  return (
    <>
      <Header />
      <QuizBackground backgroundImage={externalBg}>
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
