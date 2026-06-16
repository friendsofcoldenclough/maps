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
/**
 * Heritage Detectives map module
 */

/**
 * Initialise the Heritage Detectives map
 */
export function initHD() {
    mapObj.millIcon = new DivIcon({
        className: 'millicon',
        iconAnchor: [0,32],
        html: '<svg width="20" height="32" version="1.1" viewBox="0 0 50.179 81.142" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-49.402 -47.91)"><g stroke="#000"><path d="m54.903 85.033 8.2773-9.2959 21.918 6.6982 0.74214-32.65c3.7275-2.5362 5.8726-0.03215 5.8726-0.03215l0.63106 40.092 6.3389 5.77 0.14786 21.118-4.6886 2.882 0.17136 3.4116s-0.20651 3.7776-2.929 4.8256c-2.7224 1.048-5.9359 0.1-7.3496-1.0508l-1.8879 1.2381-25.176-15.038s2.3763-5.8726 1.1897-11.404c-1.1866-5.5316-3.2849-6.2294-3.2849-6.2294z" fill="#4f3318" stop-color="#000000" stroke-width="1.494"/><g fill="#fff"><path d="m58.636 90.338 2.0294 0.81119-0.0028 4.2931-2.0187-0.91688z" stop-color="#000000"/><path d="m64.16 92.561 2.0786 0.82679-0.0045 4.5338-2.0929-0.94832z" stop-color="#000000"/><path d="m70.132 95.055 2.3217 0.94942-0.01026 4.8156-2.2944-1.0421z" stop-color="#000000"/><path d="m76.494 97.566 2.48 1.0309-0.0043 5.0489-2.4919-1.1083z" stop-color="#000000"/><path d="m64.16 100.12 2.0786 0.97194-0.0045 4.5335-2.0929-1.0945z" stop-color="#000000"/><path d="m70.195 102.96 2.3217 1.1116-0.01026 4.8149-2.2944-1.2023z" stop-color="#000000"/><path d="m76.58 106.06 2.48 1.2041-0.0043 5.0486-2.4919-1.2823z" stop-color="#000000"/><path d="m64.159 107.98 2.0786 1.1145-0.0045 4.5332-2.0929-1.238z" stop-color="#000000"/><path d="m70.135 111.07 2.3217 1.2708-0.01026 4.8142-2.2944-1.3597z" stop-color="#000000"/><path d="m76.657 114.43 2.48 1.3742-0.0043 5.0483-2.4919-1.4532z" stop-color="#000000"/></g><g transform="matrix(.73936 -.030069 .012097 .9511 13.667 6.0465)" fill="#4f3318" stroke-width="1.1922"><ellipse cx="51.635" cy="106.23" rx="4.4426" ry="9.0199" stop-color="#000000"/><ellipse cx="50.904" cy="105.83" rx=".47826" ry="1.3218" stop-color="#000000"/></g><g fill="#fff"><path d="m52.41 97.014 2.9866-1.2013c0.0734-0.06454 0.13861-0.08763 0.21993-0.11886" stop-color="#000000"/><path d="m54.55 98.653 2.6171-1.1979c0.06162-0.0689 0.119-0.09153 0.19037-0.12248" stop-color="#000000"/><path d="m56.191 101.03 2.0137-0.95204c0.04919-0.0716 0.0932-0.08819 0.14803-0.1121" stop-color="#000000"/><path d="m56.384 104.73 2.4394-1.1296c0.05517-0.0812 0.10885-0.10108 0.17546-0.12967" stop-color="#000000"/><path d="m56.46 108.03 2.1063-0.8276c0.05455-0.0689 0.10029-0.0826 0.15752-0.10306" stop-color="#000000"/><path d="m55.482 111.24 2.6108-0.93703c0.06701-0.0699 0.12375-0.0863 0.19472-0.10985" stop-color="#000000"/><path d="m53.345 114.19 4.2483-1.5018c0.11036-0.0656 0.20257-0.0959 0.318-0.1355" stop-color="#000000"/></g></g></g></svg>'
    });
    mapObj.map.on( 'click', e => { 
        console.log( e.latlng );
    });
    mapObj.featureGroup = new FeatureGroup().addTo(mapObj.map);
    mapObj.markers = [
        {
            title: "Eaves Playground",
            location: {lat: 53.74569875199361, lng: -2.0278036594390874},
            content: "<p>Eaves Playground is a welcoming public outdoor space situated on Eaves Avenue in the charming town of Hebden Bridge, West Yorkshire. It provides a dedicated area where children can engage in active play, explore, and enjoy the fresh air. This local amenity serves as a wonderful spot for families visiting or residing in the area, offering a safe and stimulating environment for youngsters to have fun. Its convenient location within the scenic Calder Valley makes it an easily accessible stop for families.</p><p>Designed for children of various ages, Eaves Playground typically features a range of play equipment such as swings, slides, and climbing frames, encouraging physical activity and imaginative play. It's an ideal spot for kids to make new friends, develop motor skills, and embark on unstructured outdoor adventures. As a valued community asset, it is maintained for public enjoyment, providing free access to its facilities for all.</p>"
        },
        {
            title: "Milking Bridge",
            location: {lat: 53.746979, lng: -2.028925},
            content: "<p>Milking Bridge is a historic stone bridge located in the picturesque town of Hebden Bridge, West Yorkshire. This charming bridge spans the River Calder and is a notable landmark in the area, known for its architectural beauty and historical significance. The bridge has been an integral part of the local community for many years, serving as a vital crossing point for pedestrians and vehicles alike.</p><p>Milking Bridge is often admired for its traditional stone construction, which reflects the craftsmanship of the era in which it was built. It offers scenic views of the surrounding landscape, making it a popular spot for photography and leisurely walks. The bridge's name is believed to be derived from its historical use by local farmers who would cross it while transporting milk from their farms to market.</p>"
        },
        {
            title: "Cottages on Eaves Avenue",
            location: {lat: 53.748103, lng: -2.028793},
            content: "<p>The Cottages on Eaves Avenue are a collection of charming residential properties located in the heart of Hebden Bridge, West Yorkshire. These delightful homes offer a perfect blend of traditional architecture and modern comfort, making them an attractive option for those seeking a peaceful retreat in a vibrant community.</p><p>Each cottage is uniquely designed, featuring period details and contemporary amenities that ensure a comfortable living experience. The location provides easy access to local amenities, parks, and the beautiful Calder Valley, making it an ideal place to call home.</p>"
        },
        {
            title: "Lumb Bank",
            location: {lat: 53.751272, lng: -2.033141},
            content: "<p>Lumb Bank is a historic building located in the scenic town of Hebden Bridge, West Yorkshire. This iconic structure has a rich history and is known for its architectural significance and cultural heritage. Lumb Bank has served various purposes over the years, including as a residence and a place of work, contributing to the local community's development.</p><p>Today, Lumb Bank is recognized for its unique character and charm, attracting visitors who appreciate its historical value and picturesque surroundings. The building's architecture reflects the traditional style of the region, with features that highlight its historical importance. Lumb Bank continues to be a point of interest for those exploring Hebden Bridge and the surrounding areas.</p>"
        },
        {
            title: "Lower Lumb Mill",
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
    ], {color: 'blue'}).addTo( mapObj.featureGroup );
    mapObj._dialog = new A11yDialog( document.getElementById('hd-dialog'));
    for ( let cm = 0; cm < mapObj.markers.length; cm++ ) {
        let cmopts = {
            radius: 10,
            color: 'green'
        }
        if ( mapObj.markers[cm].type === 'mill' ) {
            //mapObj.markers[cm].hdmarker = new SVGOverlay( mapObj.millIcon.html, [mapObj.markers[cm].location.lat, mapObj.markers[cm].location.lng] ).addTo(mapObj.featureGroup);
            mapObj.markers[cm].hdmarker = new Marker( [mapObj.markers[cm].location.lat, mapObj.markers[cm].location.lng], {icon: mapObj.millIcon}).addTo(mapObj.featureGroup);
        } else {
            mapObj.markers[cm].hdmarker = new CircleMarker( [mapObj.markers[cm].location.lat, mapObj.markers[cm].location.lng], cmopts ).addTo(mapObj.featureGroup);
        }
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

