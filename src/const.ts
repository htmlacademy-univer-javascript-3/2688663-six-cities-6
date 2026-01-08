import leaflet from 'leaflet';

import pin from '/img/pin.svg';
import pinActive from '/img/pin-active.svg';

export enum AppRoute {
    Root = '/',
    Login = '/login',
    Favorites = '/favorites',
    Offer = '/offer',
    NotFound = '/404'
}

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
}

export enum CityName {
    Paris = 'Paris',
    Cologne = 'Cologne',
    Brussels = 'Brussels',
    Amsterdam = 'Amsterdam',
    Hamburg = 'Hamburg',
    Dusseldorf = 'Dusseldorf',
}

export enum SortingType {
    Popular = 'Popular',
    PriceLowToHigh = 'Price: low to high',
    PriceHighToLow = 'Price: high to low',
    TopRated = 'Top rated first',
}

export const enum RatingValue {
    Perfect = 5,
    Good = 4,
    NotBad = 3,
    Badly = 2,
    Terribly = 1,
  }

export const RATINGS = [
  { value: RatingValue.Perfect, title: 'perfect' },
  { value: RatingValue.Good, title: 'good' },
  { value: RatingValue.NotBad, title: 'not bad' },
  { value: RatingValue.Badly, title: 'badly' },
  { value: RatingValue.Terribly, title: 'terribly' },
] as const;


export const DEFAULT_CUSTOM_ICON = leaflet.icon({
  iconUrl: pin,
  iconSize: [30, 40],
  iconAnchor: [20, 40],
});

export const CURRENT_CUSTOM_ICON = leaflet.icon({
  iconUrl: pinActive,
  iconSize: [30, 40],
  iconAnchor: [20, 40],
});

export const TILE_LAYER = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

export const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
