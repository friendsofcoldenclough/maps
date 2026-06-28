import { 
    Control,
    Map,
    TileLayer,
    CircleMarker,
    Polyline,
    DivIcon,
    FeatureGroup,
    GeoJSON,
    Marker,
    SVGOverlay
} from 'leaflet';
import A11yDialog from 'a11y-dialog';
import { mapObj } from './config.mjs';
import { createElement, getJSON } from './utilities.mjs';
import { Icon, PinCirclePanel } from "leaflet-extra-markers";
/**
 * Protected / Invasive species map module
 */

/**
 * Initialise the Protected / Invasive species map
 */
export function initSpecies() {
    mapObj.featureProps = [];
    getJSON({
        key: 'protected-species-survey',
        url: mapObj.featuresDir + 'protected-species-survey.json',
        expires: 0,
        callback: function(data) {
            mapObj.pssgroup = new GeoJSON( data, {
                pointToLayer: function (feature, latlng) {
                    return new CircleMarker(latlng, getMarkerOptions(feature));
                },
                onEachFeature: function( feature, layer ) {
                    layer.bindPopup(feature.properties.name);
                    mapObj.featureProps.push(feature.properties);
                },
                style: function( feature ) {
                    if ( feature.properties.type && feature.properties.type !== '' ) {
                        switch ( feature.properties.type ) {
                            case 'wildlife': return { color: '#1429eb', fillColor: '#1429eb', fillOpacity: 0.1 };
                            case 'reserve': return { color: '#1ebb33', fillColor: 'url(#reservepattern)' }
                            case 'ancient': return { color:'#222222', fillColor: 'url(#ancientpattern)'};
                            case 'replanted': return { color: '#999999', fillColor: 'url(#replantedpattern)'};
                        }
                    }
                }
            }).addTo(mapObj.map);
            
        }
    });
}

function getMarkerOptions(feature){
    let typefills = {
        'plant': '#22ff22',
        'invasiveplant': '#229922',
        'bird': '#ff2222',
        'amphibian': '#2222ff',
        'invertebrate': '#ffff00',
        'mammal': '#6622ff'
    };
    let styles = {
        radius: 5,
        fillOpacity: 1,
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    if ( feature.properties.type && feature.properties.type !== '' && typefills[feature.properties.type] ) {
        styles.fillColor = typefills[feature.properties.type];
    } else {
        styles.fillColor = "#ff7800";
    }
    return styles;
}

