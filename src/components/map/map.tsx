import { useEffect, useRef } from "react";
import { Icon, layerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { OfferPreview } from "../../types/offer-preview";
import { Location } from "../../types/location";

import useMap from "../../hooks/use-map";

type IconConfig = {
    url: string;
    width: number;
    height: number;
    anchorX: number;
    anchorY: number;
};

type MapProps = {
    block: string;
    location: Location;
    offers: OfferPreview[];
    specialOfferId: OfferPreview['id'] | null;
};

const defaultIconConfig: IconConfig = {
    url: '/img/pin-active.svg',
    width: 28, 
    height: 40, 
    anchorX: 14, 
    anchorY: 40,
};

const activeIconConfig: IconConfig = {
    url: '/img/pin.svg',
    width: 28, 
    height: 40, 
    anchorX: 14, 
    anchorY: 40,
};

function createIcon(config: IconConfig) {
    return new Icon ({
        iconUrl: config.url,
        iconSize: [config.width, config.height],
        iconAnchor: [config.anchorX, config.anchorY],
    });
}

function Map ({block, location, offers, specialOfferId}: MapProps) {
    const mapRef = useRef(null);
    const map = useMap(mapRef, location);

    useEffect(() => {
        if (map) {
            map.setView([location.latitude, location.longitude], location.zoom);
        }
    }, [map, location]);

    useEffect(() => {
        if (map) {
            const markerLayer = layerGroup().addTo(map);

            offers.forEach((offer) => {
                const marker = new Marker({
                    lat: offer.location.latitude,
                    lng: offer.location.longitude,
                });

                marker
                    .setIcon(
                        offer.id === specialOfferId
                            ? createIcon (activeIconConfig)
                            : createIcon (defaultIconConfig)
                    )
                    .addTo(markerLayer);       
            });

            return () => {
                map.removeLayer(markerLayer);
            };
        }
    }, [map, offers, specialOfferId]);

    return <section className={`${block}__map map`} ref={mapRef} />;
}

export default Map