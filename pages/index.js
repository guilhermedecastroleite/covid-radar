import Head from 'next/head'
import axios from 'axios';

import styles from '../styles/Home.module.css'

import getCountryData from './api/country'

export async function getServerSideProps() {
    const res = await getCountryData({ country: 'Brazil' });
    const countryData = res.data;
    return {
      props: {
        countryData
      },
    }
}

export default function Home({ countryData }) {
  console.log('Country Data: ', countryData);

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
