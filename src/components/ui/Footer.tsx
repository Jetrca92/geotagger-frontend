import { FC } from 'react'
import styles from 'styles/scss/footer.module.scss'
import logo from 'styles/images/logo-footer.png'

const Footer: FC = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerInner}>
        <img src={logo} className={styles.footerLeft} alt="logo" />
        <div className={styles.footerRight}>
          All Rights Reserved | skillupmentor.com
        </div>
      </div>
    </div>
  )
}

export default Footer
