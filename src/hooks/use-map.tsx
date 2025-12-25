import { useRef, useState, useEffect, MutableRefObject } from "react";
import {Map, TileLayer } from 'leaflet'

import { Location } from "../types/location";


const TILE_LAYER = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'

export default function useMap (
    mapRef: MutableRefObject<HTMLElement | null>,
    location: Location
): Map | null {
    const [map, setMap] = useState<Map | null>(null);
    const isRenderedRef = useRef (false);

    useEffect(() => {
        if (mapRef.current !== null && !isRenderedRef.current) {
            const instance = new Map(mapRef.current, {
                center: {
                    lat: location.latitude,
                    lng: location.longitude,
                },
                zoom: location.zoom,
            });

            const layer = new TileLayer(TILE_LAYER, {
                attribution: COPYRIGHT,   
            });

            instance.addLayer(layer);

            setMap(instance);
            isRenderedRef.current = true;
        }
    }, [mapRef, location]);

    return map;
}