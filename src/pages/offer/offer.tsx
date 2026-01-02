import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Spinner from '../../components/spinner/spinner';

import OfferPageDetails from '../../components/offer-details/offer-details';
import NotFoundScreen from '../not-found-page/not-found-page';
import Card from '../../components/place-card/place-card';

import { AppDispatchType } from '../../store';
import { fetchOfferById, fetchNearbyOffers } from '../../store/offers/action';
import { fetchReviewsByOfferId } from '../../store/reviews/action';
import {
  selectOffer,
  selectIsOfferLoading,
  selectOffersNearbyByOffer,
} from '../../store/offers/selectors';
import { OfferPreview } from '../../types/offer-preview';

function OfferPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatchType = useDispatch();

  const offer = useSelector(selectOffer);
  const isOfferLoading = useSelector(selectIsOfferLoading);

  const nearOffersLimit = 3;
  const offersNear = useSelector(
    selectOffersNearbyByOffer(offer, nearOffersLimit)
  );

  useEffect(() => {
    let isMounted = true;

    if (id && isMounted) {
      dispatch(fetchOfferById(id));
      dispatch(fetchNearbyOffers(id));
      dispatch(fetchReviewsByOfferId(id));
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, id]);

  return (
    <div className="page">
      {!offer && !isOfferLoading ? (
        <NotFoundScreen />
      ) : (
        <>
          <Header />
          <main className="page__main page__main--offer">
            {isOfferLoading && (
              <>
                <Spinner />
                <Footer />
              </>
            )}
            {offer && (
              <>
                <OfferPageDetails offer={offer} offersNearby={offersNear} />
                <div className="container">
                  <section className="near-places places">
                    <h2 className="near-places__title">
                      Other places in the neighbourhood
                    </h2>
                    <div className="near-places__list places__list">
                      {offersNear.map((nearbyOffer: OfferPreview) => (
                        <Card key={nearbyOffer.id} offer={nearbyOffer} block="near-places" />
                      ))}
                    </div>
                  </section>
                </div>
              </>
            )}
          </main>
        </>
      )}
    </div>
  );
}

export default OfferPage;