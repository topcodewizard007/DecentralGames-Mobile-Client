import ButtonPlay from '../../buttons/ButtonPlay/ButtonPlay';
import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className={styles.main}>
      <div className={styles.gradient} />
      <div className={styles.back} />
      <div className={styles.text_container}>
        <h1 className={styles.play_title}>Free To Play.</h1>
        <h1 className={styles.play_title}>Play To Earn.</h1>
        <h1 className={styles.play_title}>(ICE) Poker.</h1>
      </div>

      <ButtonPlay />
    </div>
  );
};

export default HomePage;
