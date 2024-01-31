import Link from '@/components/Link'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.container}>
      <Link href="/">
        <div className={styles.logo}>
          Karina Kupp [Kupryianovich]
        </div>
      </Link>
      <div className={styles.links}>
        <Link href="/about">About</Link>
        <Link href="/blog">Blog</Link>
        {/* <Link href="/dump">Brain dump</Link> */}
        <Link href="/projects">Projects // Dev</Link>
        {/* <Link href="/music">Music</Link>
        <Link href="/writing">Writing</Link> */}
        {/* <Link href="/favorites">Favorites</Link>
        <Link href="/misc">Misc</Link> */}
      </div>

      <div className={styles.burgerMenuContainer}>
        <input type="checkbox" />
        
        <span></span>
        <span></span>
        <span></span>
        
        <ul className={styles.burgerMenu}>
          <Link href="/"><li>Home</li></Link>
          <Link href="/about"><li>About</li></Link>
          <Link href="/blog"><li>Blog</li></Link>
          <Link href="/projects"><li>Projects</li></Link>
        </ul>
      </div>
    </nav>
  )
}