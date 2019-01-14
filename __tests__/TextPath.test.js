import React, { cloneElement } from 'react';
import { Map, Path } from 'react-leaflet';
import L from 'leaflet';
import TextPath from '../src/index';

const setTextSpy = jest.fn();
const mockPositions = [51.505, -0.09];
const mockText = 'Mock Text';
const mockOptions = {
    attributes: undefined,
    below: undefined,
    center: undefined,
    offset: undefined,
    orientation: undefined,
    repeat: undefined
};
const mockPopulatedOptions = {
    attributes: {
        dy: '50%'
    },
    below: true,
    center: true,
    offset: 5,
    orientation: 20,
    repeat: true
};

const PolylineSpy = jest.spyOn(L, 'Polyline').mockImplementation(() => {
    return {
        _layerAdd: () => {},
        setText: setTextSpy
    };
});

function updateProps(wrapper, props) {
    wrapper.setProps({
        children: cloneElement(wrapper.props().children, props)
    });
}

describe('<TextPath />', () => {
    beforeEach(() => {
        PolylineSpy.mockClear();
        setTextSpy.mockClear();
    });
    describe('instantiation', () => {
        it('should instantiate L.Polyline with the expected arguments if only positions is provided', () => {
            mount(
                <Map>
                    <TextPath text={mockText} positions={mockPositions} />
                </Map>
            );
            expect(PolylineSpy).toBeCalledWith(mockPositions, {});
        });
        it('should instantiate L.Polyline with the expected arguments if multiple are provided', () => {
            mount(
                <Map>
                    <TextPath
                        text={mockText}
                        below
                        positions={mockPositions}
                        color="white"
                    />
                </Map>
            );
            expect(PolylineSpy).toBeCalledWith(mockPositions, {
                color: 'white'
            });
        });
        it('should extend the react-leaflet Path component', () => {
            const wrapper = mount(
                <Map>
                    <TextPath />
                </Map>
            );
            expect(
                wrapper
                    .find(TextPath)
                    .children()
                    .instance()
            ).toBeInstanceOf(Path);
        });
    });

    describe('setText()', () => {
        it('should call setText() with the expected arguments if only text is provided', () => {
            mount(
                <Map>
                    <TextPath text={mockText} />
                </Map>
            );
            expect(setTextSpy).toBeCalledWith(mockText, mockOptions);
        });
        it('should call setText() with the expected arguments if multiple are provided', () => {
            mount(
                <Map>
                    <TextPath
                        text={mockText}
                        color="white"
                        {...mockPopulatedOptions}
                    />
                </Map>
            );
            expect(setTextSpy).toBeCalledWith(mockText, mockPopulatedOptions);
        });
    });

    describe('props change', () => {
        it('should call setText() with null to clear the existing text if the props change', () => {
            const wrapper = mount(
                <Map>
                    <TextPath text={mockText} />
                </Map>
            );
            updateProps(wrapper, {
                orientation: 'flip'
            });
            expect(setTextSpy).toHaveBeenNthCalledWith(2, null);
        });
        it('should call setText() with the new props if the props change', () => {
            const wrapper = mount(
                <Map>
                    <TextPath
                        text={mockText}
                        {...mockPopulatedOptions}
                        color="white"
                    />
                </Map>
            );
            updateProps(wrapper, {
                orientation: 'flip'
            });
            expect(setTextSpy).toHaveBeenLastCalledWith(mockText, {
                ...mockPopulatedOptions,
                orientation: 'flip'
            });
        });
    });
});
