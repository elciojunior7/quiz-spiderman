import styled from 'styled-components'
import db from '../db.json';
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import Header from '../src/components/Header'
import QuizLogo from '../src/components/QuizLogo'
import QuizBackground from '../src/components/QuizBackground'

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
    return (
      <>
        <Header />
        <QuizBackground backgroundImage={db.bg}>
          <QuizContainer>
            <QuizLogo />

            <Footer />
          </QuizContainer>
          <GitHubCorner projectUrl="https://github.com/elciojunior7" />
        </QuizBackground>
      </>
    );
  }