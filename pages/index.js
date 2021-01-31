import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import db from '../db.json';
import Link from '../src/components/Link';

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
    router.push(`/quiz?name=${name.toUpperCase()}`);
  }

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          <Widget
            as={motion.section}
            transition={{ 
              delay: 0, 
              duration: 0.5
             }}
            variants={{ 
              show: {opacity: 1, x: '0'},
              hidden: {opacity: 0, x: '-100%'},
            }}
            initial="hidden"
            animate="show"
          >
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

          <Widget
            as={motion.section}
            transition={{ 
              delay: 0.5, 
              duration: 0.5
             }}
            variants={{ 
              show: {opacity: 1, x: '0'},
              hidden: {opacity: 0, x: '-100%'},
            }}
            initial="hidden"
            animate="show"
          >
            <Widget.Content>
              <h1>Quizes da Galera</h1>
              <ul>
                {db.external.map((linkExterno) => {
                  const [projectName, githubUser] = linkExterno
                    .replace(/\//g, '')
                    .replace('https:', '')
                    .replace('.vercel.app', '')
                    .split('.');
                  return (
                    <li key={linkExterno}>
                      <Widget.Topic
                        as={Link}
                        href={`/quiz/${projectName}___${githubUser}`}
                        username={name}
                      >
                        {`${githubUser}/${projectName}`}
                      </Widget.Topic>
                    </li>
                  );
                })}
              </ul>
            </Widget.Content>
          </Widget>
          <Footer
            as={motion.footer}
            transition={{ 
              delay: 1, 
              duration: 0.5
             }}
            variants={{ 
              show: {opacity: 1, x: '0'},
              hidden: {opacity: 0, x: '-100%'},
            }}
            initial="hidden"
            animate="show"
          />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/elciojunior7" />
      </QuizBackground>
    </>
  );
}
