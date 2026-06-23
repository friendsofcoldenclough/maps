import { TileLayer } from 'leaflet';
import { mapObj } from './config.mjs';
/**
 * Tilesets map module
 */

export function initTS(){
    mapObj.OpenTopoMap = new TileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
    mapObj.MtbMap = new TileLayer('http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp; USGS'
    });
    mapObj.Esri_WorldTopoMap = new TileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    });
    mapObj.nls1 = new TileLayer( 'https://mapseries-tilesets.s3.amazonaws.com/25_inch/yorkshire/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Reproduced with the permission of the <a href="https://maps.nls.uk/" target="nls">National Library of Scotland</a>'
    });
    mapObj.nls2 = new TileLayer( 'https://mapseries-tilesets.s3.amazonaws.com/os/six-inch-yorkshireV/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Reproduced with the permission of the <a href="https://maps.nls.uk/" target="nls">National Library of Scotland</a>'
    });
    mapObj.nls3 = new TileLayer( 'https://mapseries-tilesets.s3.amazonaws.com/os/six-inch-yorkshire/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Reproduced with the permission of the <a href="https://maps.nls.uk/" target="nls">National Library of Scotland</a>'
    });
    mapObj.survey = new TileLayer( 'https://allmaps.xyz/images/a51b7d4cdaadee59/{z}/{x}/{y}@2x.png', {
        maxZoom: 19,
	    attribution: 'Tiles served by <a target="external" href="https://allmaps.org">Allmaps</a>'
    });
    mapObj.jefferys = new TileLayer( 'https://allmaps.xyz/images/e33822707c1a53da/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Tiles served by <a target="external" href="https://allmaps.org">Allmaps</a>. Plate XII (<a href="https://www.davidrumsey.com/luna/servlet/s/r06az2">Thomas Jefferys, 1772</a>).'
    });
    mapObj.layerControl.addBaseLayer(mapObj.OpenTopoMap, "OpenTopoMap");
    mapObj.layerControl.addBaseLayer(mapObj.MtbMap, "MtbMap");
    mapObj.layerControl.addBaseLayer(mapObj.Esri_WorldTopoMap, "Esri WorldTopoMap");
    mapObj.layerControl.addBaseLayer(mapObj.Stadia_AlidadeSatellite, "Stadia Alidade Satellite");
    mapObj.layerControl.addOverlay(mapObj.nls1, "OS 25 inch 1841-1952");
    mapObj.layerControl.addOverlay(mapObj.nls2, "OS 6 inch 1888-1915 (earlier)");
    mapObj.layerControl.addOverlay(mapObj.nls3, "OS 6 inch 1888-1915 (later)");
    mapObj.layerControl.addOverlay(mapObj.survey, "Protected Species Map (2024)");
    mapObj.layerControl.addOverlay(mapObj.jefferys, "Thomas Jefferys (1772)");
    mapObj.layerControl.setPosition('topright');
    mapObj.layerControl.expand();
}