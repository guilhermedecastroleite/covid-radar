import Head from 'next/head'

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Covid Radar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Covid Radar
        </h1>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/guilhermedecastroleite"
          target="_blank"
          rel="noopener noreferrer"
        >
          Guilherme Leite
        </a>
      </footer>
    </div>
  )
}
