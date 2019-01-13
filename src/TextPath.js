import { Path } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-textpath';

export default class TextPath extends Path {
    createLeafletElement(props) {
        // props.leaflet is not used but destructured out so it's not passed to L.Polyline
        const {
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
        } = props;
        const line = new L.Polyline(positions, options);
        line.setText(text, {
            repeat,
            center,
            below,
            offset,
            orientation,
            attributes
        });
        return line;
    }

    updateLeafletElement(
        fromProps,
        { text, repeat, center, below, offset, orientation, attributes }
    ) {
        this.leafletElement.setText(null);
        this.leafletElement.setText(text, {
            repeat,
            center,
            below,
            offset,
            orientation,
            attributes
        });
    }
}
