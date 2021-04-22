import {
    createPathComponent,
    LeafletContextInterface,
    PathProps,
} from '@react-leaflet/core';
import {
    LatLngExpression,
    Polyline as LeafletPolyline,
    TextPathOptions,
} from 'leaflet';
import 'leaflet-textpath';
import { PropsWithChildren } from 'react';

interface ReactLeafletTextPathBaseProps {
    /**
     * The text to display over the polyline.
     */
    text: string;
    /**
     * The positions to use for the polyline.
     */
    positions: LatLngExpression[];
}
export type ReactLeafletTextPathProps = TextPathOptions &
    PathProps &
    PropsWithChildren<ReactLeafletTextPathBaseProps>;

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
    }: ReactLeafletTextPathProps,
    ctx: LeafletContextInterface,
) => {
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

const updateLeafletElement = (
    layer: LeafletPolyline,
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
    }: ReactLeafletTextPathProps,
    prevProps: ReactLeafletTextPathProps,
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

const ReactLeafletTextPath = createPathComponent<
    LeafletPolyline,
    ReactLeafletTextPathProps
>(createLeafletElement, updateLeafletElement);

export default ReactLeafletTextPath;
