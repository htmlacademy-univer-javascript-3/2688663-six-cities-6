import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import Card from '../place-card/place-card';
import Map from '../map/map';

import { OfferPreview} from '../../types/offer-preview';
import { SortingType } from '../../const';
import { addPluralEnding } from '../../utils/common';
import { selectCity, selectSortedOffers } from '../../store/offers/selectors';

function MainPageCities() {
  const [hoveredCardId, setHoveredCardId] = useState<OfferPreview['id'] | null>(null);
  
  const [currentSortOption, setCurrentSortOption] = useState(SortingType.Popular);
  
  const [isSortingOpen, setIsSortingOpen] = useState(false);

  const city = useSelector(selectCity);
  const sortedOffers = useSelector(selectSortedOffers(currentSortOption));

  const handleCardHover = useCallback((id: OfferPreview['id'] | null) => {
    setHoveredCardId(id);
  }, []);

  function handleSortTypeClick() {
    setIsSortingOpen((prev) => !prev);
  }

  function handleSortOptionClick(option: SortingType) {
    setCurrentSortOption(option);
    setIsSortingOpen(false);
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
          {sortedOffers.length} place{addPluralEnding(sortedOffers.length)} to stay in {city}
          </b>
          
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by&nbsp;</span>
            <span 
              className="places__sorting-type" 
              tabIndex={0} 
              onClick={handleSortTypeClick} 
              style={{ userSelect: 'none' }}
            >
              {currentSortOption}
              <svg 
                className="places__sorting-arrow" 
                width="7" 
                height="4" 
                style={{ transform: `translateY(-50%) ${isSortingOpen ? 'rotate(180deg)' : ''}`}}
              >
                <use xlinkHref="#icon-arrow-select"></use>
              </svg>
            </span>

            <ul className={`places__options places__options--custom ${isSortingOpen && 'places__options--opened'}`}>
              {Object.values(SortingType).map((option) => (
                <li
                  key={option}
                  className={`places__option ${currentSortOption === option ? 'places__option--active' : ''}`}
                  tabIndex={0}
                  onClick={() => handleSortOptionClick(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </form>

          <div className="cities__places-list places__list tabs__content">
            {sortedOffers.map((offer) => (
              <Card
                key={offer.id}
                offer={offer}
                block="cities"
                onMouseHover={handleCardHover}
              />
            ))}
          </div>
        </section>
        <div className="cities__right-section">
          <Map
            offers={sortedOffers}
            block="cities__map"
            selectedOfferId={hoveredCardId}
          />
        </div>
      </div>
    </div>
  );
}

export default MainPageCities;