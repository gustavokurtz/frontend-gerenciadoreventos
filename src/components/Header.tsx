import { Link } from "react-router-dom";
import styles from "../Header.module.css";

const Header = () => {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>NLW </h1>
      <div className={styles.links}>
        <Link to="/" className={styles.navLink}>Eventos</Link>
        <Link to="/create-event" className={styles.navLink}>Criar Evento</Link>
        <Link to="/ranking" className={styles.navLink}>Ranking</Link>
        <Link to="/subscription" className={styles.navLink}>Inscrição</Link> {/* Novo link */}
      </div>
    </nav>
  );
};

export default Header;
