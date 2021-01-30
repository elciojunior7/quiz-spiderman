/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ externalDB }) {
  return (
    <div>
      {/* <pre>
        {JSON.stringify(props, null, 4)}
      </pre> */}
      <ThemeProvider theme={externalDB.theme}>
        <QuizScreen
          externalQuestions={externalDB.questions}
          externalBg={externalDB.bg}
        />
      </ThemeProvider>
    </div>
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');
  const externalDB = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error();
    })
    .then((convertedResponse) => convertedResponse)
    .catch(() => {
      // eslint-disable-next-line no-console
      console.error('Não conseguimos trazer os dados');
    });
  return {
    props: {
      externalDB,
    },
  };
}
