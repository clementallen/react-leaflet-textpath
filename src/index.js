import { createPathComponent } from '@react-leaflet/core';
import { Polyline as LeafletPolyline } from 'leaflet';
import 'leaflet-textpath';

// eslint-disable-next-line no-unused-vars
const createLeafletElement = (
    {
        // Required TextPath attributes.
        text,
        positions,
        // TextPath options.
        repeat,
        center,
        below,
        offset,
        orientation,
        attributes,
        // PolyLine options.
        ...options
    },
    ctx
) => {
    // const { positions, options, text, ...pathOptions } = getOptions(props);
    const instance = new LeafletPolyline(positions, options);
    instance.setText(text, {
        repeat,
        center,
        below,
        offset,
        orientation,
        attributes,
    });
    return { instance, context: { ...ctx, overlayContainer: instance } };
};

// eslint-disable-next-line no-unused-vars
const updateLeafletElement = (
    layer,
    {
        // Required TextPath attributes.
        text,
        positions,
        // TextPath options.
        repeat,
        center,
        below,
        offset,
        orientation,
        attributes,
        // PolyLine options.
        ...options
    },
    prevProps
) => {
    // Set null first, to reset the text displayed.
    layer.setText(null);
    if (positions !== prevProps.positions) layer.setLatLngs(positions);
    layer.setStyle(options);
    layer.setText(text, {
        repeat,
        center,
        below,
        offset,
        orientation,
        attributes,
    });
};

const TextPath = createPathComponent(
    createLeafletElement,
    updateLeafletElement
);

export default TextPath;
