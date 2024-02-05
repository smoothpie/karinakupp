import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from '@/components/Link'
import Select from '@/components/Select'
import s from './Navbar.module.css'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const { pathname, asPath, query, locale } = router;
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  useEffect(() => {
    if (isBurgerMenuOpen) {
      document.body.style.height = '100vh';
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.height = 'unset';
      document.body.style.overflowY = 'unset';
    }
  }, [isBurgerMenuOpen]);

  console.log(isBurgerMenuOpen)

  const handleLanguageChange = (langValue: string) => {
    router.push({ pathname, query }, asPath, { locale: langValue });

    router.events.on('routeChangeComplete', () => {
      router.reload()
    });
  };

  const languageOptions = [
    { label: 'EN', value: 'en' },
    { label: 'RU', value: 'ru' },
  ];

  const languageSwitch = (
    <div className={s.languageSwitch} onClick={() => handleLanguageChange(locale === "en" ? "ru": "en")}>
      {locale === 'en' ? 'RU' : 'EN'}
    </div>
  );

  return (
    <nav className={s.container}>
      <Link href="/">
        <div className={s.logo}>
          {t("navbar.home")}
        </div>
      </Link>
      <div className={s.links}>
        {/* <Select
          options={languageOptions}
          selectedOption={languageOptions.find(option => option.value === locale)}
          onChange={(value: string) => handleLanguageChange(value)}
        /> */}
        {languageSwitch}
        <Link href="/about">{t("navbar.about")}</Link>
        <Link href="/blog">{t("navbar.blog")}</Link>
        {/* <Link href="/dump">Brain dump</Link> */}
        <Link href="/projects">{t("navbar.projects")}</Link>
        {/* <Link href="/music">Music</Link>
        <Link href="/writing">Writing</Link> */}
        {/* <Link href="/favorites">Favorites</Link>
        <Link href="/misc">Misc</Link> */}
      </div>

      <div className={s.burgerMenuContainer}>
        <input type="checkbox" onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)} />
        
        <span></span>
        <span></span>
        <span></span>
        
        <ul className={s.burgerMenu}>
          <Link href="/"><li>{t("navbar.home")}</li></Link>
          <Link href="/about"><li>{t("navbar.about")}</li></Link>
          <Link href="/blog"><li>{t("navbar.blog")}</li></Link>
          <Link href="/projects"><li>{t("navbar.projects")}</li></Link>
          <div className={s.languageSwitchContainer}>
            {languageSwitch}
          </div>
        </ul>
      </div>
    </nav>
  )
}