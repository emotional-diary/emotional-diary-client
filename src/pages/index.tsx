import Link from "next/link";

import styles from "../styles/Home.module.css";
import { Container, Main, Footer } from "@components/layout";

export default function Home() {
  return (
    <Container>
      <Main>
        <h1 className={styles.title}>Emotional Diary</h1>
        <p className={styles.description}>AI가 감정을 분석하는 다이어리</p>

        <div className={styles.grid}>
          <Link href="/post/new" className={styles.card}>
            <h3>새로운 일기 &rarr;</h3>
            <p>오늘 하루는 어떻게 보냈을까요?</p>
          </Link>

          <Link href="/posts" className={styles.card}>
            <h3>일기 목록 &rarr;</h3>
            <p>추억이 담겨있어요.</p>
          </Link>

          <Link href="/mypage" className={styles.card}>
            <h3>내 감성 &rarr;</h3>
            <p>그동안 쌓아온 감성을 살펴보아요.</p>
          </Link>

          <Link href="/setting" className={styles.card}>
            <h3>설정 &rarr;</h3>
            <p>나만의 공간을 바꾸어보세요.</p>
          </Link>

          <Link href="/login" className={styles.card}>
            <h3>로그인 &rarr;</h3>
            <p>더욱 다양한 경험을 해보세요.</p>
          </Link>
        </div>
      </Main>

      <Footer>
        <Link
          href="https://www.notion.so/221fc3f4cac443919260bcf0ed246400"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by EDT
        </Link>
      </Footer>
    </Container>
  );
}
