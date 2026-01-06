import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { AppRoute, CityName } from '../../const';
import { setCity } from '../../store/offers/action';
import { selectCity } from '../../store/offers/selectors';

const cities = Object.values(CityName);

const MainPageCitiesTabs: FC = () => {
  const dispatch = useDispatch();
  const city = useSelector(selectCity);

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map((c) => (
              <li className="locations__item" key={c}>
                <Link
                  className={`locations__item-link tabs__item ${
                    city === c ? 'tabs__item--active' : ''
                  }`}
                  to={AppRoute.Root}
                  onClick={(event) => {
                    event.preventDefault();
                    dispatch(setCity(c as CityName));
                  }}
                >
                  <span>{c}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default MainPageCitiesTabs;
