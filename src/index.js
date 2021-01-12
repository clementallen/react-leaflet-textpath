import { createPathComponent } from '@react-leaflet/core';
import { Polyline as LeafletPolyline } from 'leaflet';
import 'leaflet-textpath';

// props.leaflet is not used but destructured out so it's not passed to L.Polyline
const getOptions = ({
    // Options for the specific TextPath...
    positions,
    text,
    repeat,
    center,
    below,
    offset,
    orientation,
    attributes,
    leaflet, // eslint-disable-line no-unused-vars
    // Options for the base Polyline...
    ...options
}) => {
    return {
        positions,
        options,
        text,
        repeat,
        center,
        below,
        offset,
        orientation,
        attributes,
    };
};

// eslint-disable-next-line no-unused-vars
const createLeafletElement = (props, ctx) => {
    const { positions, options, text, ...pathOptions } = getOptions(props);
    const instance = new LeafletPolyline(positions, options);
    instance.setText(text, pathOptions);
    return { instance, context: { ...ctx, overlayContainer: instance } };
};

// eslint-disable-next-line no-unused-vars
const updateLeafletElement = (layer, props, prevProps) => {
    const { positions, options, text, ...pathOptions } = getOptions(props);

    // Set null first, to reset the text displayed.
    layer.setText(null);
    if (props.positions !== prevProps.positions) layer.setLatLngs(positions);
    layer.setStyle(options);
    layer.setText(text, pathOptions);
};

const TextPath = createPathComponent(
    createLeafletElement,
    updateLeafletElement
);

export default TextPath;
