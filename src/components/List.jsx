import { useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getFilms } from '../app/store';
import styles from './List.module.css';

const List = () => {
  const dispatch = useDispatch();
  const { films, loading, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getFilms());
  }, [dispatch]);

  const content = error ? (
    <p className={styles['error']}>
      {'Fetching data failed with error: ' + error}
    </p>
  ) : (
    <>
      {loading ? (
        <Loader
          className={styles['loader']}
          type="Puff"
          color="yellow"
          height={100}
          width={100}
        />
      ) : (
        films.map((film) => <div key={film.episode_id}>{film.title}</div>)
      )}
    </>
  );

  return <div className={styles['container']}>{content}</div>;
};

export default List;
