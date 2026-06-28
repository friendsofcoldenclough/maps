import { initMap } from './modules/utilities.mjs';
import { initSpecies } from './modules/species.mjs';
/**
 * Initialise the map
 */
document.addEventListener( 'DOMContentLoaded', () => {
    document.addEventListener( 'maploaded', () => {
        initSpecies();
    });
    initMap();
});