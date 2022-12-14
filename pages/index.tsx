import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Solana Pay</title>
        <meta name="description" content="Generated by Metacamp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Solana Pay</h1>
        <Link href="/qrni">
          <button>Non-Interactive QR</button>
        </Link>
        <Link href="/qri">
          <button>Interactive QR</button>
        </Link>
      </main>
    </div>
  );
}
