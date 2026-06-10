import { 
    Control,
    Map,
    TileLayer,
    CircleMarker,
    Polyline
} from 'leaflet';
import A11yDialog from 'a11y-dialog';
import { mapObj } from './config.mjs';
import { createElement } from './utilities.mjs';
/**
 * Heritage Detectives map module
 */

/**
 * Initialise the Heritage Detectives map
 */
export function initHD() {
    mapObj.map.on( 'click', e => { 
        console.log( e.latlng ); });
    mapObj.markers = [
        {
            title: "Eaves Playground",
            location: {lat: 53.74569875199361, lng: -2.0278036594390874},
            content: "<p>Eaves Playground is a welcoming public outdoor space situated on Eaves Avenue in the charming town of Hebden Bridge, West Yorkshire. It provides a dedicated area where children can engage in active play, explore, and enjoy the fresh air. This local amenity serves as a wonderful spot for families visiting or residing in the area, offering a safe and stimulating environment for youngsters to have fun. Its convenient location within the scenic Calder Valley makes it an easily accessible stop for families.</p><p>Designed for children of various ages, Eaves Playground typically features a range of play equipment such as swings, slides, and climbing frames, encouraging physical activity and imaginative play. It's an ideal spot for kids to make new friends, develop motor skills, and embark on unstructured outdoor adventures. As a valued community asset, it is maintained for public enjoyment, providing free access to its facilities for all.</p>"
        }
    ];
    mapObj.route = new Polyline([
        [53.74569875199361,-2.0278036594390874],
        [53.745938264256495,-2.027685642242432],
        [53.74630625394718,-2.0281684398651127],
        [53.74656638264622,-2.02823281288147],
        [53.74693436683577,-2.0281255245208745],
        [53.74783528004039,-2.028683423995972],
        [53.74793679017644,-2.0284903049469],
        [53.74790506828526,-2.028136253356934],
        [53.7488059606756,-2.029187679290772],
        [53.749649736732515,-2.0310652256011967],
        [53.74987178024669,-2.031655311584473],
        [53.750150918999495,-2.0313763618469243],
        [53.7503031757193,-2.030882835388184],
        [53.75080435019094,-2.031430006027222],
        [53.75110251444502,-2.03197717666626],
        [53.75150852194136,-2.0324492454528813],
        [53.75160367938069,-2.0325887203216557],
        [53.75151486577736,-2.0338654518127446],
        [53.751407020435146,-2.033833265304566],
        [53.7512928309475,-2.0333719253540044],
        [53.75128648707799,-2.0330929756164555]
    ], {color: 'blue'}
    ).addTo(mapObj.map );
    mapObj._dialog = new A11yDialog( document.getElementById('hd-dialog'));
    for ( let cm = 0; cm < mapObj.markers.length; cm++ ) {
        let cmopts = {
            radius: 5,
            color: 'red'
        }
        mapObj.markers[cm].hdmarker = new CircleMarker( [mapObj.markers[cm].location.lat, mapObj.markers[cm].location.lng], cmopts ).addTo(mapObj.map);
        mapObj.markers[cm].hdmarker.bindTooltip(mapObj.markers[cm].title);
        mapObj.markers[cm].hdmarker.on('click', (e) => {
            let title = document.getElementById('hd-dialog-title');
            title.textContent = mapObj.markers[cm].title;
            let content = document.getElementById('hd-dialog-content');
            content.innerHTML = mapObj.markers[cm].content;
            mapObj._dialog.show();
        });
    }
    console.log(mapObj.markers);
    console.log( 'Initialising Heritage Detectives map' );
}

