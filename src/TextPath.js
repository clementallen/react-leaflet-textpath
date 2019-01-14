import { Path } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-textpath';

// props.leaflet is not used but destructured out so it's not passed to L.Polyline
function getOptions({
    positions,
    text,
    repeat,
    center,
    below,
    offset,
    orientation,
    attributes,
    leaflet, // eslint-disable-line no-unused-vars
    ...options
}) {
    return {
        polyline: { positions, options },
        textpath: {
            text,
            repeat,
            center,
            below,
            offset,
            orientation,
            attributes
        }
    };
}

export default class TextPath extends Path {
    createLeafletElement(props) {
        const {
            polyline: { positions, options },
            textpath: { text, ...pathOptions }
        } = getOptions(props);
        const line = new L.Polyline(positions, options);
        line.setText(text, pathOptions);
        return line;
    }

    updateLeafletElement(fromProps, toProps) {
        const { text, ...options } = getOptions(toProps).textpath;
        this.leafletElement.setText(null);
        this.leafletElement.setText(text, options);
    }
}
