import Head from 'next/head'

function Header() {
  return (
    <div>
      <Head>
        <title>Quiz do Aranha</title>
        <meta name="title" content="Quiz do Aranha"/>

        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://quiz-spiderman.vercel.app/"/>
        <meta property="og:title" content="Quiz do Aranha"/>
        <meta property="og:image" content="https://i.pinimg.com/originals/f0/3d/e1/f03de1a604d540a1a6e9c03a0d4274ee.jpg"/>

        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content="https://quiz-spiderman.vercel.app/"/>
        <meta property="twitter:title" content="Quiz do Aranha"/>
        <meta property="twitter:image" content="https://i.pinimg.com/originals/f0/3d/e1/f03de1a604d540a1a6e9c03a0d4274ee.jpg"></meta>
      </Head>
    </div>
  )
}

export default Header;