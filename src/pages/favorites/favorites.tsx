import { useSelector } from 'react-redux';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Spinner from '../../components/spinner/spinner';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import FavoritesPageCard from '../../components/favorite-card/favorite-card';
import { selectIsFavorites } from '../../store/favorite/selectors';
import { selectGroupedFavorites } from '../../store/favorite/selectors';
import { selectFavoritesLoadingStatus } from '../../store/favorite/selectors';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatchType } from '../../store';
import { CityName, AppRoute } from '../../const';
import { setCity } from '../../store/offers/action';

function FavoritesPage() {
  const hasOffers = useSelector(selectIsFavorites);
  const groupingCitiesOffer = useSelector(selectGroupedFavorites);
  const isLoading = useSelector(selectFavoritesLoadingStatus);
  const dispatch = useDispatch<AppDispatchType>();

  return (
    <div className={`page ${!hasOffers && 'page--favorites-empty'}`}>
      <Header/>

      {isLoading ? (
        <Spinner/>
      ) : (
        <main className={`page__main page__main--favorites ${!hasOffers && 'page__main--favorites-empty'}`}>
          <div className="page__favorites-container container">
            {hasOffers ? (
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {Object.entries(groupingCitiesOffer).map(([city, cityOffers]) => (
                    <li className="favorites__locations-items" key={city}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <Link
                            className="locations__item-link"
                            to={AppRoute.Root}
                            onClick={() => dispatch(setCity(city as CityName))}
                          >
                            <span>{city}</span>
                          </Link>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {cityOffers.map((offer) => (
                          <FavoritesPageCard key={offer.id} offer={offer} />
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ) : (
              <FavoritesEmpty/>
            )}

          </div>
        </main>
      )}

      <Footer/>
    </div>
  );
}

export default FavoritesPage;
