
import { useDispatch, useSelector } from 'react-redux';
import OfferPageReview from '../offer-review/offer-review';
import { selectReviewsCount, selectReviewsSortedByDate } from '../../store/reviews/selectors';

import { OfferPreview } from '../../types/offer-preview';

import { useNavigate } from 'react-router-dom';
import { AppDispatchType } from '../../store';
import { AppRoute } from '../../const';

import { Offer } from '../../types/offer';

import { capitalize, addPluralEnding } from '../../utils/common';

import Map from '../../components/map/map';
import OfferPageForm from '../offer-form/offer-form';
import { selectIsAuth } from '../../store/user/selectors';
import { changeFavoriteStatus } from '../../store/favorite/action';


type OfferDetailsProps = {
    offer: Offer;
    offersNearby: OfferPreview[];
  };

function OfferPageDetails({ offer, offersNearby }: OfferDetailsProps) {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch<AppDispatchType>();
  const navigate = useNavigate();

  const reviewCount = useSelector(selectReviewsCount);

  const maxReviewsOnPage = 10;
  const sortedReviews = useSelector(
    selectReviewsSortedByDate(maxReviewsOnPage)
  );

  if (reviewCount === 0) {
    return null;
  }

  const handleFavoriteClick = () => {
    if (!isAuth) {
      navigate(AppRoute.Login);
      return;
    }

    dispatch(
      changeFavoriteStatus({
        offerId: offer.id,
        status: offer.isFavorite ? 0 : 1,
      })
    );
  };

  return (
    <section className="offer">
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {offer.images.slice(0, 6).map((image) => (
            <div className="offer__image-wrapper" key={image}>
              <img className="offer__image" src={image} alt="Photo studio" />
            </div>
          ))}
        </div>
      </div>
      <div className="offer__container container">
        <div className="offer__wrapper">
          {offer.isPremium && (
            <div className="offer__mark">
              <span>Premium</span>
            </div>
          )}
          <div className="offer__name-wrapper">
            <h1 className="offer__name">{offer.title}</h1>
            <button
              className={`offer__bookmark-button button ${
                offer.isFavorite ? 'offer__bookmark-button--active' : ''
              }`}
              type="button"
              onClick={handleFavoriteClick}
            >
              <svg className="offer__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">
                {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
              </span>
            </button>
          </div>
          <div className="offer__rating rating">
            <div className="offer__stars rating__stars">
              <span style={{ width: `${Math.round(offer.rating) * 20}%` }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="offer__rating-value rating__value">
              {offer.rating}
            </span>
          </div>
          <ul className="offer__features">
            <li className="offer__feature offer__feature--entire">
              {capitalize(offer.type)}
            </li>
            <li className="offer__feature offer__feature--bedrooms">
              {offer.bedrooms} Bedroom{addPluralEnding(offer.bedrooms)}
            </li>
            <li className="offer__feature offer__feature--adults">
                Max {offer.maxAdults} adult{addPluralEnding(offer.maxAdults)}
            </li>
          </ul>
          <div className="offer__price">
            <b className="offer__price-value">&euro;{offer.price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>
          <div className="offer__inside">
            <h2 className="offer__inside-title">What&apos;s inside</h2>
            <ul className="offer__inside-list">
              {offer.goods.map((good) => (
                <li className="offer__inside-item" key={`${good}`}>
                  {good}
                </li>
              ))}
            </ul>
          </div>
          <div className="offer__host">
            <h2 className="offer__host-title">Meet the host</h2>
            <div className="offer__host-user user">
              <div
                className={`offer__avatar-wrapper ${
                  offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''
                } user__avatar-wrapper`}
              >
                <img
                  className="offer__avatar user__avatar"
                  src={offer.host.avatarUrl}
                  width="74"
                  height="74"
                  alt="Host avatar"
                />
              </div>
              <span className="offer__user-name">{offer.host.name}</span>
              {offer.host.isPro && (
                <span className="offer__user-status">Pro</span>
              )}
            </div>
            <div className="offer__description">
              <p className="offer__text">{offer.description}</p>
            </div>
          </div>
          <section className="offer__reviews reviews">
            <h2 className="reviews__title">
                    Reviews &middot; <span className="reviews__amount">{reviewCount}</span>
            </h2>
            <ul className="reviews__list">
              {sortedReviews.map((review) => (
                <OfferPageReview key={review.id} review={review} offer={offer}/>
              ))}
            </ul>

            {isAuth && <OfferPageForm offerId={offer.id} />}
          </section>
        </div>
      </div>
      <Map currentOffer={offer} offers={offersNearby} block="offer__map" />
    </section>
  );
}

export default OfferPageDetails;
