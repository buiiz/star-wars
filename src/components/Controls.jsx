import cn from 'classnames';

import styles from './Controls.module.css';

const Controls = ({ search, setSearch, isSorted, setIsSorted }) => {
  let content = (
    <form className={styles['controls']}>
      <input
        className={styles['search']}
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') e.preventDefault() }}
        placeholder='Search...'
      />

      <div className={styles['sort']}>
        <span>Sort by name?</span>
        <label className={styles['switch']}>
          <input
            type="checkbox"
            checked={isSorted}
            onChange={(e) => setIsSorted(e.target.checked)}
          />
          <span className={cn(styles['slider'], styles['round'])}></span>
        </label>
      </div>
    </form>
  );

  return <div className={styles['container']}>{content}</div>;
};

export default Controls;
