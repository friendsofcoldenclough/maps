import { initMap } from './modules/utilities.mjs';
import { initHD } from './modules/heritage-detectives.mjs';
/**
 * Initialise the map
 */
document.addEventListener( 'DOMContentLoaded', () => {
    document.addEventListener( 'maploaded', () => {
        initHD();
    });
    initMap();
});