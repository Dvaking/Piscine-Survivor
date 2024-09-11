import { useEffect, useState, useRef } from "react";
import { getTips } from "@hooks";
import { GetTipsProps } from "@types";
import styles from "@styles/TipsPage.module.css";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function Tips() {
  const [tips, setTips] = useState<GetTipsProps[]>([]);
  const [visibleTipIndex, setVisibleTipIndex] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }
    const fetchTips = async () => {
      const fetchedTips = await getTips();
      setTips(fetchedTips);
    };
    fetchTips();
  }, []);

  const toggleAnswer = (index: number) => {
    setVisibleTipIndex(visibleTipIndex === index ? null : index);
  };

  return (
    <main className={styles.main}>
      <div className={styles.heading}>
        <h1>Tips for Coaches</h1>
      </div>
      <div className={styles.containerBg}>
        <div className={styles.container}>
          {tips.map((tip, index) => (
            <div className={styles.tip} key={index}>
              <div className={styles.question} onClick={() => toggleAnswer(index)}>
                <h2>{tip.title}</h2>
                {visibleTipIndex === index ? (
                  <i className="fas fa-chevron-up"></i>
                ) : (
                  <i className="fas fa-chevron-down"></i>
                )}
              </div>
              <div className={`${styles.answer} ${
                  visibleTipIndex === index ? styles.show : ""
                }`}>
              <p>{tip.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
