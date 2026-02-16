/********************************************************
 * Leaflet fullscreen plugin
 * 
 * Modified to use a button rather than a link
 * 
 * @see https://github.com/Leaflet/Leaflet.fullscreen
 * 
 ********************************************************/
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['leaflet'], factory);
    } else if (typeof module !== 'undefined') {
        // Node/CommonJS
        module.exports = factory(require('leaflet'));
    } else {
        // Browser globals
        if (typeof window.L === 'undefined') {
            throw new Error('Leaflet must be loaded first');
        }
        factory(window.L);
    }
}(function (L) {
    L.Control.Fullscreen = L.Control.extend({
        options: {
            position: 'topleft',
            title: {
                'false': 'View Fullscreen',
                'true': 'Exit Fullscreen'
            }
        },

        onAdd: function (map) {
            var container = L.DomUtil.create('div', 'leaflet-control-fullscreen');
            this.fsbutton = document.createElement( 'button' );
            this.fsbutton.innerHTML = '<span class="visuallyhidden"></span>';
            this.fsbutton.classList.add( 'mapfullscreen-button' );
            this.fsbutton.classList.add( 'icon-resize-full' );
            container.appendChild( this.fsbutton );
        
            this._map = map;
            this._map.on('fullscreenchange', this._toggleTitle, this);
            this._toggleTitle();

            L.DomEvent.on(this.fsbutton, 'click', this._click, this);

            return container;
        },

        _click: function (e) {
            L.DomEvent.stopPropagation(e);
            L.DomEvent.preventDefault(e);
            this._map.toggleFullscreen(this.options);
        },

        _toggleTitle: function() {
            if ( this._map.isFullscreen() ) {
                this.fsbutton.classList.remove( 'icon-resize-full' );
                this.fsbutton.classList.add( 'icon-resize-small' );
            } else {
                this.fsbutton.classList.remove( 'icon-resize-small' );
                this.fsbutton.classList.add( 'icon-resize-full' );
            }
            this.fsbutton.setAttribute( 'aria-label', this.options.title[this._map.isFullscreen()] );
            this.fsbutton.setAttribute( 'title', this.options.title[this._map.isFullscreen()] );
            this.fsbutton.querySelector( 'span' ).innerText = this.options.title[this._map.isFullscreen()];
        }
    });

    L.Map.include({
        isFullscreen: function () {
            return this._isFullscreen || false;
        },

        toggleFullscreen: function (options) {
            var container = this.getContainer();
            if (this.isFullscreen()) {
                if (options && options.pseudoFullscreen) {
                    this._disablePseudoFullscreen(container);
                } else if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                } else {
                    this._disablePseudoFullscreen(container);
                }
            } else {
                if (options && options.pseudoFullscreen) {
                    this._enablePseudoFullscreen(container);
                } else if (container.requestFullscreen) {
                    container.requestFullscreen();
                } else if (container.mozRequestFullScreen) {
                    container.mozRequestFullScreen();
                } else if (container.webkitRequestFullscreen) {
                    container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                } else if (container.msRequestFullscreen) {
                    container.msRequestFullscreen();
                } else {
                    this._enablePseudoFullscreen(container);
                }
            }

        },

        _enablePseudoFullscreen: function (container) {
            L.DomUtil.addClass(container, 'leaflet-pseudo-fullscreen');
            this._setFullscreen(true);
            this.fire('fullscreenchange');
        },

        _disablePseudoFullscreen: function (container) {
            L.DomUtil.removeClass(container, 'leaflet-pseudo-fullscreen');
            this._setFullscreen(false);
            this.fire('fullscreenchange');
        },

        _setFullscreen: function(fullscreen) {
            this._isFullscreen = fullscreen;
            var container = this.getContainer();
            if (fullscreen) {
                L.DomUtil.addClass(container, 'leaflet-fullscreen-on');
            } else {
                L.DomUtil.removeClass(container, 'leaflet-fullscreen-on');
            }
            this.invalidateSize();
        },

        _onFullscreenChange: function (e) {
            var fullscreenElement =
                document.fullscreenElement ||
                document.mozFullScreenElement ||
                document.webkitFullscreenElement ||
                document.msFullscreenElement;

            if (fullscreenElement === this.getContainer() && !this._isFullscreen) {
                this._setFullscreen(true);
                this.fire('fullscreenchange');
            } else if (fullscreenElement !== this.getContainer() && this._isFullscreen) {
                this._setFullscreen(false);
                this.fire('fullscreenchange');
            }
        }
    });

    L.Map.mergeOptions({
        fullscreenControl: false
    });

    L.Map.addInitHook(function () {
        if (this.options.fullscreenControl) {
            this.fullscreenControl = new L.Control.Fullscreen(this.options.fullscreenControl);
            this.addControl(this.fullscreenControl);
        }

        var fullscreenchange;

        if ('onfullscreenchange' in document) {
            fullscreenchange = 'fullscreenchange';
        } else if ('onmozfullscreenchange' in document) {
            fullscreenchange = 'mozfullscreenchange';
        } else if ('onwebkitfullscreenchange' in document) {
            fullscreenchange = 'webkitfullscreenchange';
        } else if ('onmsfullscreenchange' in document) {
            fullscreenchange = 'MSFullscreenChange';
        }

        if (fullscreenchange) {
            var onFullscreenChange = L.bind(this._onFullscreenChange, this);

            this.whenReady(function () {
                L.DomEvent.on(document, fullscreenchange, onFullscreenChange);
            });

            this.on('unload', function () {
                L.DomEvent.off(document, fullscreenchange, onFullscreenChange);
            });
        }
    });

    L.control.fullscreen = function (options) {
        return new L.Control.Fullscreen(options);
    };
}));/**
 * Gets a JSON data file from a remote URL. Utilises localstorage
 * to cache the results.
 * @param {Object} options Information about the JSON file
 * @param {String} options.key Unique key used to store the data in localstorage (required)
 * @param {String} options.url URL of the JSON file (required)
 * @param {Integer} options.expiry How long to cache the results (in hours) default: 24
 * @param {Function} options.callback callback function with one parameter (JSON parsed response)
 */
function getJSON( options ) {
    if ( ! options.hasOwnProperty( 'key' ) || ! options.hasOwnProperty( 'url' ) ) {
        return;
    }
    if ( ! options.hasOwnProperty( 'expires' ) ) {
        options.expires = 24;
    }
    if ( storageAvailable( 'localStorage' ) && getWithExpiry( options.key ) ) {
        splog( "getting data '"+options.key+"' from local storage", "utilities.js" );
        if ( options.hasOwnProperty( 'callback' ) && typeof options.callback == 'function' ) {
            options.callback( JSON.parse( getWithExpiry( options.key ) ) );
        }
    } else {
        splog( "getting data '"+options.key+"' from "+options.url, "utilities.js" );
        var oReq = new XMLHttpRequest();
        oReq.addEventListener( 'load', function(){
            if ( storageAvailable( 'localStorage' ) ) {
                var expires = new Date().getTime() + ( options.expires * 60 * 60 * 1000 );
                splog( "storing data '" + options.key + "' in localstorage - expires " + expires, "utilities.js" );
                setWithExpiry( options.key, this.responseText, options.expires );
            }
            if ( options.hasOwnProperty( 'callback' ) && typeof options.callback == 'function' ) {
                options.callback( JSON.parse( this.responseText ) );
            }
        });
        oReq.open("GET", options.url);
        oReq.send();
    }
}
/**
 * Leafletjs functions for FoCC Maps
 */
document.addEventListener( 'DOMContentLoaded', () => {
    initMap();
});
var focc = {
    currentLoc: {
        lat: 53.74691335748559,
        lng: -2.0338482556515936
    },
    startZoom: 15
};
/**
 * Initialise map and set listeners to set up markers when loaded
 */
function initMap() {
    if ( document.getElementById( 'map' ) === null ) {
        return;
    }
    focc.map = L.map( 'map' ).setView([focc.currentLoc.lat, focc.currentLoc.lng], focc.startZoom );
    /* change leaflet attribution */
    focc.map.attributionControl.setPrefix( '<a href="https://leafletjs.com" target="external" title="A JavaScript library for interactive maps" aria-label="Leaflet - a JavaScript library for interactive maps"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8"><path fill="#4C7BE1" d="M0 0h12v4H0z"></path><path fill="#FFD500" d="M0 4h12v3H0z"></path><path fill="#E0BC00" d="M0 7h12v1H0z"></path></svg> Leaflet</a>' );
    focc.osm = L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© <a target="external" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo( focc.map );
    focc.OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
    focc.MtbMap = L.tileLayer('http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp; USGS'
    });
    focc.Esri_WorldImagery = L.tileLayer( 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
	    attribution: 'Tiles © Esri - Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
    focc.Esri_WorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    });
    focc.Stadia_AlidadeSatellite = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 0,
        maxZoom: 20,
        attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'jpg'
    });
    focc.survey = L.tileLayer( 'https://allmaps.xyz/images/a51b7d4cdaadee59/{z}/{x}/{y}@2x.png', {
        maxZoom: 19,
	    attribution: 'Tiles served by <a target="external" href="https://allmaps.org">Allmaps</a>'
    });
    focc.jefferys = L.tileLayer( 'https://allmaps.xyz/images/e33822707c1a53da/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Plate XII. The Environs of Bradford, Halifax, Harewood, (North of) Huddersfield Leeds, Otley, Skipton & (West of) Wakefield (<a href="https://www.davidrumsey.com/luna/servlet/s/r06az2">Thomas Jefferys, 1772</a>).'
    });
    focc.map.addControl( new L.Control.Fullscreen( { position: 'topright' } ) );
    focc.mapLoaded = true;
    focc.viewdata = {
        'street': {
            btnText: 'Street',
            btnLabel: 'Switch to Street View',
            btnClass: 'maptype-street',
            tileLayer: focc.osm
        },
        'satellite': {
            btnText: 'Satellite',
            btnLabel: 'Switch to Satellite View',
            btnClass: 'maptype-satellite',
            tileLayer: focc.esri_sat
        }
    };
    baseMaps = {
        "OpenStreetMap": focc.osm,
        "OpenTopoMap": focc.OpenTopoMap,
        "MtbMap": focc.MtbMap,
        "Esri WorldImagery": focc.Esri_WorldImagery,
        "Esri WorldTopoMap": focc.Esri_WorldTopoMap,
        "Stadia Alidade Satellite": focc.Stadia_AlidadeSatellite
    };
    overlayMaps = {
        "Survey": focc.survey,
        "Thomas Jefferys (1772)": focc.jefferys
    };
    var layerControl = L.control.layers(baseMaps, overlayMaps, {collapsed:false}).addTo(focc.map);

    document.dispatchEvent( new Event( 'maploaded' ) );
}