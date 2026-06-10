import { initMap } from './modules/utilities.mjs';
import { initTS } from './modules/tilesets.mjs';
/**
 * Initialise the map
 */
document.addEventListener( 'DOMContentLoaded', () => {
    document.addEventListener( 'maploaded', () => {
        initTS();
    });
    initMap();
});