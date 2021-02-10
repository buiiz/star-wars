import styles from './Header.module.css';

const Header = () => {
  let content = <h1>Star Wars Films</h1>;

  return <div className={styles['container']}>{content}</div>;
};

export default Header;
