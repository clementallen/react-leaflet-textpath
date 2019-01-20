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
        positions,
        options,
        text,
        repeat,
        center,
        below,
        offset,
        orientation,
        attributes
    };
}

export default class TextPath extends Path {
    createLeafletElement(props) {
        const { positions, options, text, ...pathOptions } = getOptions(props);
        const line = new L.Polyline(positions, options);
        line.setText(text, pathOptions);
        return line;
    }

    updateLeafletElement(fromProps, toProps) {
        const { positions, options, text, ...pathOptions } = getOptions(
            toProps
        );
        this.leafletElement.setText(null);
        this.leafletElement.setLatLngs(positions);
        this.leafletElement.setStyle(options);
        this.leafletElement.setText(text, pathOptions);
    }
}
