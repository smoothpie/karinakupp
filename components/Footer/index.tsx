import styles from './Footer.module.css'

export default function Footer() {
  return (
    <nav className={styles.container}>
      <div className={styles.logo}>
      
      </div>
      <div className={styles.links}>
        <a href="https://www.chillsubs.com">Chill Subs</a>
        {/* <a href="https://teal.tools">Relocate me</a> */}
        <a href="https://linkedin.com/karina-kupp">LinkedIn</a>
        <a href="https://instagram.com/karinakupp">Instagram</a>
        {/* <a href="https://instagram.com/karinakupp">Let's be friends please</a> */}
      </div>
    </nav>
  )
}