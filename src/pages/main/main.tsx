import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../components/header/header';
import Spinner from '../../components/spinner/spinner';

import { AppDispatchType } from '../../store';
import { fetchOffers } from '../../store/offers/action';
import {
  selectOffersByCity,
  selectIsOffersLoading,
} from '../../store/offers/selectors';

import MainPageCitiesTabs from '../../components/main-cities-tabs/main-cities-tabs';
import MainPageCities from '../../components/cities/cities';
import MainEmpty from '../../components/main-empty/main-empty';

function MainPage() {
  const dispatch = useDispatch<AppDispatchType>();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchOffers());
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const filteredOffers = useSelector(selectOffersByCity);

  const hasOffers = filteredOffers.length > 0;
  const isOffersLoading = useSelector(selectIsOffersLoading);

  let content;

  if (isOffersLoading) {
    content = <Spinner />;
  } else if (hasOffers) {
    content = <MainPageCities />;
  } else {
    content = <MainEmpty />;
  }

  return (
    <div className="page page--gray page--main ">
      <Header />

      <main
        className={`page__main page__main--index ${
          hasOffers ? '' : 'page__main--index-empty'
        }`}
      >
        <MainPageCitiesTabs />
        {content}
      </main>
    </div>
  );
}

export default MainPage;
