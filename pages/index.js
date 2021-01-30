import React, { useState } from 'react';
import styled from 'styled-components';
// eslint-disable-next-line import/no-unresolved
import { useRouter } from 'next/router';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import db from '../db.json';

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

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  function submitForm(e) {
    e.preventDefault();
    router.push(`/quiz?name=${name}`);
  }

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          <Widget>
            <Widget.Header>
              <h1>{db.title}</h1>
            </Widget.Header>
            <Widget.Content>
              <p>{db.description}</p>
              <form onSubmit={submitForm}>
                <Input
                  name="username"
                  value={name}
                  placeholder="Qual seu alter ego? Guardamos segredo"
                  onChange={(e) => setName(e.target.value)}
                />
                <Button type="submit" disabled={name.length === 0}>
                  {`Bora ${name}`}
                </Button>
              </form>
            </Widget.Content>
          </Widget>

          <Widget>
            <Widget.Content>
              <h1>Quizes da Galera</h1>

              <p>Em construção...</p>
            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/elciojunior7" />
      </QuizBackground>
    </>
  );
}
