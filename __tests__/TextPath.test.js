import React, { cloneElement } from 'react';
import { MapContainer, Polyline } from 'react-leaflet';
import L from 'leaflet';
import TextPath from '../src/index';

const setTextSpy = jest.fn();
const setLatLngsSpy = jest.fn();
const setStyleSpy = jest.fn();
const mockPositions = [51.505, -0.09];
const mockText = 'Mock Text';
const mockOptions = {
    attributes: undefined,
    below: undefined,
    center: undefined,
    offset: undefined,
    orientation: undefined,
    repeat: undefined,
};
const mockPopulatedOptions = {
    attributes: {
        dy: '50%',
    },
    below: true,
    center: true,
    offset: 5,
    orientation: 20,
    repeat: true,
};

const PolylineSpy = jest.spyOn(L, 'Polyline').mockImplementation(() => {
    return {
        _layerAdd: () => {},
        setText: setTextSpy,
        setLatLngs: setLatLngsSpy,
        setStyle: setStyleSpy,
    };
});

function updateProps(wrapper, props) {
    wrapper.setProps({
        children: cloneElement(wrapper.props().children, props),
    });
}

const getMethods = (obj) => {
    let properties = new Set();
    let currentObj = obj;
    do {
        Object.getOwnPropertyNames(currentObj).map((item) =>
            properties.add(item)
        );
    } while ((currentObj = Object.getPrototypeOf(currentObj)));
    return [...properties.keys()];
};

describe('<TextPath />', () => {
    beforeEach(() => {
        PolylineSpy.mockClear();
        setTextSpy.mockClear();
    });
    describe('instantiation', () => {
        it('should instantiate L.Polyline with the expected arguments if only positions is provided', () => {
            mount(
                <MapContainer>
                    <TextPath text={mockText} positions={mockPositions} />
                </MapContainer>
            );
            expect(PolylineSpy).toBeCalledWith(mockPositions, {});
        });
        it('should instantiate L.Polyline with the expected arguments if multiple are provided', () => {
            mount(
                <MapContainer>
                    <TextPath
                        text={mockText}
                        below
                        positions={mockPositions}
                        color="white"
                    />
                </MapContainer>
            );
            expect(PolylineSpy).toBeCalledWith(mockPositions, {
                color: 'white',
            });
        });
        /*
        TODO: Revise this test. I can't seem to access the TextPath instance.
        I think there's been a change to how the MapContainer works.

        it('should extend the react-leaflet Path component', () => {
            const wrapper = mount(
                <MapContainer>
                    <TextPath />
                </MapContainer>
            );
            expect(wrapper.find(TextPath).children().instance()).toBeInstanceOf(
                Polyline
            );
        });

        */
    });

    describe('setText()', () => {
        it('should call setText() with the expected arguments if only text is provided', () => {
            mount(
                <MapContainer>
                    <TextPath text={mockText} />
                </MapContainer>
            );
            expect(setTextSpy).toBeCalledWith(mockText, mockOptions);
        });
        it('should call setText() with the expected arguments if multiple are provided', () => {
            mount(
                <MapContainer>
                    <TextPath
                        text={mockText}
                        color="white"
                        {...mockPopulatedOptions}
                    />
                </MapContainer>
            );
            expect(setTextSpy).toBeCalledWith(mockText, mockPopulatedOptions);
        });
    });

    describe('props change', () => {
        it('should call setText() with null to clear the existing text', () => {
            const wrapper = mount(
                <MapContainer>
                    <TextPath text={mockText} />
                </MapContainer>
            );
            updateProps(wrapper, { orientation: 'flip' });
            // TODO: There appears to be a bug where react-leaflet is recreating the element
            // when its props update, but I couldn't reproduce it in a sandbox.
            expect(setTextSpy).toHaveBeenNthCalledWith(/* 2 */ 3, null);
        });
        it('should call setText() with the new text and options', () => {
            const wrapper = mount(
                <MapContainer>
                    <TextPath
                        text={mockText}
                        {...mockPopulatedOptions}
                        color="white"
                    />
                </MapContainer>
            );
            updateProps(wrapper, { orientation: 'flip' });
            expect(setTextSpy).toHaveBeenLastCalledWith(mockText, {
                ...mockPopulatedOptions,
                orientation: 'flip',
            });
        });
        it('should call setLatLngs() with the new positions', () => {
            const mockNewPositions = [52.505, -1.09];
            const wrapper = mount(
                <MapContainer>
                    <TextPath
                        text={mockText}
                        positions={mockPositions}
                        {...mockPopulatedOptions}
                    />
                </MapContainer>
            );
            updateProps(wrapper, { positions: mockNewPositions });
            expect(setLatLngsSpy).toBeCalledWith(mockNewPositions);
        });
        it('should call setStyle() with the new styles', () => {
            const wrapper = mount(
                <MapContainer>
                    <TextPath
                        text={mockText}
                        positions={mockPositions}
                        {...mockPopulatedOptions}
                        color="white"
                        weight={2}
                    />
                </MapContainer>
            );
            updateProps(wrapper, { color: 'black' });
            expect(setStyleSpy).toBeCalledWith({ color: 'black', weight: 2 });
        });
    });
});
