import { 
    Control,
    Map,
    TileLayer,
    CircleMarker,
    Polyline,
    DivIcon,
    FeatureGroup,
    Marker,
    SVGOverlay
} from 'leaflet';
import A11yDialog from 'a11y-dialog';
import { mapObj } from './config.mjs';
import { createElement } from './utilities.mjs';
import { Icon, PinCirclePanel } from "leaflet-extra-markers";
/**
 * Heritage Detectives map module
 */

/**
 * Initialise the Heritage Detectives map
 */
export function initHD() {
    mapObj.map.on( 'click', e => { 
        console.log( e.latlng );
    });
    mapObj.featureGroup = new FeatureGroup().addTo(mapObj.map);
    mapObj.markers = [
        {
            title: "Eaves Playground",
            type: 'park',
            location: {lat: 53.74569875199361, lng: -2.0278036594390874},
            content: "<p>Eaves Playground is a welcoming public outdoor space situated on Eaves Avenue in the charming town of Hebden Bridge, West Yorkshire. It provides a dedicated area where children can engage in active play, explore, and enjoy the fresh air. This local amenity serves as a wonderful spot for families visiting or residing in the area, offering a safe and stimulating environment for youngsters to have fun. Its convenient location within the scenic Calder Valley makes it an easily accessible stop for families.</p><p>Designed for children of various ages, Eaves Playground typically features a range of play equipment such as swings, slides, and climbing frames, encouraging physical activity and imaginative play. It's an ideal spot for kids to make new friends, develop motor skills, and embark on unstructured outdoor adventures. As a valued community asset, it is maintained for public enjoyment, providing free access to its facilities for all.</p>"
        },
        {
            title: "Milking Bridge",
            type: 'bridge',
            location: {lat: 53.746979, lng: -2.028925},
            content: "<p>Milking Bridge is a historic stone bridge located in the picturesque town of Hebden Bridge, West Yorkshire. This charming bridge spans the River Calder and is a notable landmark in the area, known for its architectural beauty and historical significance. The bridge has been an integral part of the local community for many years, serving as a vital crossing point for pedestrians and vehicles alike.</p><p>Milking Bridge is often admired for its traditional stone construction, which reflects the craftsmanship of the era in which it was built. It offers scenic views of the surrounding landscape, making it a popular spot for photography and leisurely walks. The bridge's name is believed to be derived from its historical use by local farmers who would cross it while transporting milk from their farms to market.</p>"
        },
        {
            title: "Cottages on Eaves Avenue",
            type: 'house',
            location: {lat: 53.748103, lng: -2.028793},
            content: "<p>The Cottages on Eaves Avenue are a collection of charming residential properties located in the heart of Hebden Bridge, West Yorkshire. These delightful homes offer a perfect blend of traditional architecture and modern comfort, making them an attractive option for those seeking a peaceful retreat in a vibrant community.</p><p>Each cottage is uniquely designed, featuring period details and contemporary amenities that ensure a comfortable living experience. The location provides easy access to local amenities, parks, and the beautiful Calder Valley, making it an ideal place to call home.</p>"
        },
        {
            title: "Lumb Bank",
            type: 'museum',
            location: {lat: 53.751272, lng: -2.033141},
            content: "<p>Lumb Bank is a historic building located in the scenic town of Hebden Bridge, West Yorkshire. This iconic structure has a rich history and is known for its architectural significance and cultural heritage. Lumb Bank has served various purposes over the years, including as a residence and a place of work, contributing to the local community's development.</p><p>Today, Lumb Bank is recognized for its unique character and charm, attracting visitors who appreciate its historical value and picturesque surroundings. The building's architecture reflects the traditional style of the region, with features that highlight its historical importance. Lumb Bank continues to be a point of interest for those exploring Hebden Bridge and the surrounding areas.</p>"
        },
        {
            title: "Lower Lumb Mill",
            type: 'mill',
            location: {lat: 53.750539, lng: -2.03581},
            content: "<p>Lower Lumb Mill is a historic textile mill located in the town of Hebden Bridge, West Yorkshire. This mill played a significant role in the industrial heritage of the area, contributing to the local economy and community during its operational years. The mill's architecture reflects the industrial design of the period, showcasing the craftsmanship and engineering of the time.</p><p>Lower Lumb Mill is an important landmark in Hebden Bridge, representing the town's rich history in textile manufacturing. It serves as a reminder of the area's industrial past and continues to be a point of interest for visitors and historians alike. The mill's preservation and recognition highlight its cultural significance within the community.</p>"
        },
        {
            title: "Upper Lumb Mill",
            type: "mill",
            location: {lat: 53.750275, lng: -2.038176},
            content: "<p>Upper Lumb Mill is a historic textile mill located in the town of Hebden Bridge, West Yorkshire. This mill played a significant role in the industrial heritage of the area, contributing to the local economy and community during its operational years. The mill's architecture reflects the industrial design of the period, showcasing the craftsmanship and engineering of the time.</p><p>Upper Lumb Mill is an important landmark in Hebden Bridge, representing the town's rich history in textile manufacturing. It serves as a reminder of the area's industrial past and continues to be a point of interest for visitors and historians alike. The mill's preservation and recognition highlight its cultural significance within the community.</p>"
        }
    ];
    mapObj.route = new Polyline([
        [53.745792,-2.027788],
        [53.745938,-2.027739],
        [53.746129,-2.028013],
        [53.746259,-2.028136],
        [53.746503,-2.028265],
        [53.746827,-2.028185],
        [53.74702,-2.028217],
        [53.747505,-2.028485],
        [53.74735,-2.028828],
        [53.747042,-2.028893],
        [53.746915,-2.028941],
        [53.746769,-2.029166],
        [53.745951,-2.029139],
        [53.74636,-2.029461],
        [53.747474,-2.030185],
        [53.748324,-2.031081],
        [53.748685,-2.031709],
        [53.749126,-2.032707],
        [53.749574,-2.033367],
        [53.749735,-2.033742],
        [53.749904,-2.034075],
        [53.75017,-2.034949],
        [53.750287,-2.035545],
        [53.750389,-2.036515],
        [53.750252,-2.038028],
        [53.750268,-2.038457],
        [53.750306,-2.038978],
        [53.750141,-2.039316],
        [53.749929,-2.039793],
        [53.749846,-2.040206],
        [53.749812,-2.040485],
        [53.749773,-2.040989],
        [53.749767,-2.041376],
        [53.749923,-2.041633],
        [53.750164,-2.039761],
        [53.750443,-2.038903],
        [53.750516,-2.038495],
        [53.750566,-2.037899],
        [53.750852,-2.037261],
        [53.751299,-2.036408],
        [53.751429,-2.035909],
        [53.751477,-2.033812],
        [53.751375,-2.033345],
        [53.751407,-2.033318],
        [53.751486,-2.033742],
        [53.751569,-2.032599],
        [53.750938,-2.031848],
        [53.750541,-2.031178],
        [53.750233,-2.030894],
        [53.750198,-2.031178],
        [53.749821,-2.031628],
        [53.748774,-2.029209],
        [53.747838,-2.02819],
        [53.747493,-2.027793],
        [53.746132,-2.026168],
        [53.745757,-2.02583],
        [53.745171,-2.025486],
        [53.744682,-2.025261],
        [53.744666,-2.025341],
        [53.744764,-2.025658],
        [53.744872,-2.025754],
        [53.745082,-2.026334],
        [53.745469,-2.026961],
        [53.745783,-2.027482],
        [53.745745,-2.027686]
    ], {color: 'blue', dashArray: '4 10', weight: 5}).addTo( mapObj.featureGroup );
    mapObj._dialog = new A11yDialog( document.getElementById('hd-dialog'));
    for ( let cm = 0; cm < mapObj.markers.length; cm++ ) {
        mapObj.markers[cm].hdmarker = new Marker(
            [mapObj.markers[cm].location.lat, mapObj.markers[cm].location.lng],
            {
                icon: new Icon({
                    accentColor: mapObj.icons[mapObj.markers[cm].type].accent,
                    color: mapObj.icons[mapObj.markers[cm].type].color,
                    contentHtml:  mapObj.icons[mapObj.markers[cm].type].iconSVG,
                    contentColor: "white",
                    scale: 1,
                    svg: PinCirclePanel,
                })
            }
        ).addTo(mapObj.map);
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
    mapObj.map.fitBounds(mapObj.featureGroup.getBounds());
    console.log( 'Initialising Heritage Detectives map' );
}

