import { OfferPreview } from './offer-preview';
import { User } from './user';

export type Offer = OfferPreview & {
    bedrooms: number;
    description: string;
    host: User;
    images: string[];
    maxAdults: number;
};
