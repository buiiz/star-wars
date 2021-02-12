import { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getFilms } from '../app/store';
import Controls from './Controls';
import Modal from './Modal';
import styles from './List.module.css';

const List = () => {
  const dispatch = useDispatch();
  const { films, loading, error } = useSelector((state) => state);

  const [search, setSearch] = useState('');
  const [isSorted, setIsSorted] = useState(false);
  // const [modalActive, setModalActive] = useState(false);
  // const [currentFilm, setCurrentFilm] = useState({});

  useEffect(() => {
    dispatch(getFilms());
  }, [dispatch]);

  // const handleClick = (film) => {
  //   setCurrentFilm(film)
  //   setModalActive(true);
  // };

  return (
    <>
      <div className={styles['container']}>
        <Controls
          search={search}
          setSearch={setSearch}
          isSorted={isSorted}
          setIsSorted={setIsSorted}
        />
        <div className={styles['list']}>
          {error ? (
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
                films
                  .filter((value) => {
                    if (search === '') {
                      return value
                    } else if (value.title.toLowerCase().includes(search.toLowerCase())) {
                      return value
                    } else {
                      return null
                    }
                  })
                  .sort((a, b) => {
                    const titleA = a.title.toLowerCase()
                    const titleB = b.title.toLowerCase()

                    if (isSorted) {
                      if (titleA > titleB) return 1;
                      if (titleA < titleB) return -1;
                      if (titleA === titleB) return 0;
                    }
                  })
                  .map((film) => (
                    <div
                      key={film.episode_id}
                      className={styles['film']}
                    // onClick={() => handleClick(film)}
                    >
                      {film.title}
                    </div>
                  )
                  )
              )}
            </>
          )}
        </div>
      </div>

      {/* <Modal active={modalActive} setActive={setModalActive} film={currentFilm} /> */}
    </>
  );
};

export default List;
