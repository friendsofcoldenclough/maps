import { 
    Control,
    Map,
    TileLayer,
    CircleMarker,
    Polyline,
    DivIcon,
    FeatureGroup,
    LayerGroup,
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
        url: mapObj.featuresDir + 'protected-species-survey-edit.json',
        expires: 0,
        callback: function(data) {
            mapObj.pssgroup = new GeoJSON( data, {
                pointToLayer: function (feature, latlng) {
                    return getMarker(feature, latlng);
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
            mapObj.layerControl.setPosition('topright').expand();
            mapObj.types = {};
            mapObj.pssgroup.eachLayer( layer => {
                if ( ! mapObj.types[layer.feature.properties.type] ) {
                    mapObj.types[layer.feature.properties.type] = {
                        label: layer.feature.properties.name,
                        group: new FeatureGroup([layer]).addTo(mapObj.map)
                    };
                } else {
                    mapObj.types[layer.feature.properties.type].group.addLayer(layer);
                }
            });
            for ( let type in mapObj.types ) {
                mapObj.layerControl.addOverlay(mapObj.types[type].group, mapObj.types[type].label);
            }
            
        }
    });
}

function getMarker(feature, latlng){
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
        if ( ['invasiveplant'].indexOf(feature.properties.type) !== -1 ) {
            let outer = createElement('div');
            return new Marker( latlng, { icon: new DivIcon( { html: createElement('div', outer), iconSize: [8,8], iconAnchor: [4,4], className: 'marker-' + feature.properties.type } ) } );
        } else {
            return new CircleMarker(latlng, styles);
        }
    }
}

