import React from 'react';
// eslint-disable-next-line import/no-unresolved
import Head from 'next/head';

function Header() {
  return (
    <Head>
      <title>Quiz do Aranha</title>
      <meta name="title" content="Quiz do Aranha" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://quiz-spiderman.vercel.app/" />
      <meta property="og:title" content="Quiz do Aranha" />
      <meta property="og:image" content="https://raw.githubusercontent.com/elciojunior7/quiz-spiderman/main/public/assets/bg.jpg" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://quiz-spiderman.vercel.app/" />
      <meta property="twitter:title" content="Quiz do Aranha" />
      <meta property="twitter:image" content="https://raw.githubusercontent.com/elciojunior7/quiz-spiderman/main/public/assets/bg.jpg" />

      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
    </Head>
  );
}

export default Header;
