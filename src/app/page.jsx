// import Links from '@/components/navbar/links/Links';
// import Link from 'next/link';
import Image from 'next/image';
import styles from './home.module.css'

export const metadata = {
  title: {
    default: "Blog App HomePage",
    template: "%s | Blog App"
  },
  description: "Contact details for the blog app",
};
const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Creative Thoughts Agency </h1>
        <p className={styles.desc}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi quisquam doloremque cumque necessitatibus est exercitationem explicabo laborum accusamus nulla. Provident?</p>
        <div className={styles.buttons}>
          <button className={styles.button}>Learn More</button>
          <button className={styles.button}>Contact</button>
        </div>
        <div className={styles.brands}>
          <Image className={styles.brands} src="/brands.png" alt="brands" fill />

        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/hero.gif" alt="home" fill className={styles.heroImg} />
      </div>


    </div>

  );
};

export default Home;