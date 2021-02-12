import { useEffect, useState } from 'react';
import cn from 'classnames';
import { IoMdClose } from 'react-icons/io';
import styles from './Modal.module.css';
import Loader from 'react-loader-spinner';

const Modal = ({ active, setActive, film }) => {
  let [loading, setLoading] = useState(true);
  // let [characters, setCharacters] = useState([]);
  let [planets, setPlanets] = useState([]);
  let [starships, setStarships] = useState([]);
  // let [vehicles, setVehicles] = useState([]);
  // let [species, setSpecies] = useState([]);

  useEffect(() => {
    setLoading(true)
    if (Object.entries(film).length !== 0) {
      Promise.all(
        [
          Promise.all(film.planets.map(url => fetch(url).then(res => res.json())))
            .then(res => setPlanets([...res])),

          Promise.all(film.starships.map(url => fetch(url).then(res => res.json())))
            .then(res => setStarships([...res]))
        ]
      ).then(() => setLoading(false));
    }
  }, [film]);

  return (
    <div
      className={cn(styles['modal'], active ? styles['active'] : null)}
      onClick={() => setActive(false)}
    >
      {loading
        ? <Loader
          className={styles['loader']}
          type="Puff"
          color="yellow"
          height={100}
          width={100}
        />
        : <div
          className={cn(styles['modal-content'], active ? styles['active'] : null)}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <h2>{film.title}</h2>
            <p><b>№:</b> {film.episode_id}</p>
            <p><b>Opening:</b> {film.opening_crawl}</p>
            <p><b>Director:</b> {film.director}</p>
            <p><b>Producer:</b> {film.producer}</p>
            <p><b>Release:</b> {film.release_date}</p>
            <div>
              <b>Planets:</b>
              <ul>
                {planets.map((planet, index) => <li key={index}>{planet.name}</li>)}
              </ul>
            </div>
            <div>
              <b>Starships:</b>
              <ul>
                {starships.map((starship, index) => <li key={index}>{starship.name}</li>)}
              </ul>
            </div>
          </div>
        </div>}

      <button className={styles['close-btn']} type="button" onClick={() => setActive(false)}>
        <IoMdClose />
      </button>
    </div>
  );
};

export default Modal;
