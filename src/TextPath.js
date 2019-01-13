import { Path } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-textpath';

export default class TextPath extends Path {
    createLeafletElement(props) {
        // props.leaflet is not used but destructured out so it's not passed to this.leafletComponent
        const { positions, leaflet, ...options } = props; // eslint-disable-line no-unused-vars
        return new L.Polyline(positions, options);
    }

    updateLeafletElement(fromProps, toProps) {
        this.leafletElement.setText(toProps.text);
    }
}
