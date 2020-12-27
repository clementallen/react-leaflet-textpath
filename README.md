# react-leaflet-textpath

[![](https://img.shields.io/npm/v/react-leaflet-textpath.svg?style=flat-square)](http://npmjs.com/package/react-leaflet-textpath)
[![](https://img.shields.io/npm/dt/react-leaflet-textpath.svg?style=flat-square)](http://npmjs.com/package/react-leaflet-textpath)
[![](https://img.shields.io/github/license/clementallen/react-leaflet-textpath.svg?style=flat-square)](https://github.com/clementallen/react-leaflet-textpath)
[![](https://img.shields.io/david/clementallen/react-leaflet-textpath.svg?style=flat-square)](https://david-dm.org/clementallen/react-leaflet-textpath)
[![](https://img.shields.io/david/dev/clementallen/react-leaflet-textpath.svg?style=flat-square)](https://david-dm.org/clementallen/react-leaflet-textpath?type=dev)
[![](https://img.shields.io/codeclimate/coverage/clementallen/react-leaflet-textpath.svg?style=flat-square)](https://codeclimate.com/github/clementallen/react-leaflet-textpath)
[![](https://img.shields.io/codeclimate/maintainability/clementallen/react-leaflet-textpath.svg?style=flat-square)](https://codeclimate.com/github/clementallen/react-leaflet-textpath)

React wrapper of [leaflet-textpath](https://github.com/makinacorpus/Leaflet.TextPath)
for [react-leaflet](https://github.com/PaulLeCam/react-leaflet).

Polyline with text for [Leaflet](https://leafletjs.com) maps. Extends [L.Polyline](http://leafletjs.com/reference.html#polyline).

_Most recently tested with Leaflet 1.7.1 and React-Leaflet 2.8.0_

## Installation

```bash
npm install react-leaflet-textpath --save
```

## Usage

### Complete example with react-leaflet

```jsx
import { Map, TileLayer } from 'react-leaflet';
import TextPath from 'react-leaflet-textpath';

<Map center={[51.505, -0.09]} zoom={13}>
    <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <TextPath
        positions={[[51.505, -0.09], [51.505, -0.02]]}
        text="Polyline text"
        center
        offset={10}
    />
</Map>;
```

### \<TextPath />

```jsx
<TextPath
    positions={[51.505, -0.09], [51.505, -0.02]}
    text="Polyline text"
    repeat
    center
    below
    offset={10}
    orientation={20}
    attributes={{
        'font-size': 20
    }}
/>
```

#### Props

| Name        | Type                                               | Default      | Description                                                                                                                                   |
| ----------- | -------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| positions   | Array of L.LatLng[] **or** Array\[number, number\] | **required** | Array of Latitude and Longitude points                                                                                                        |
| text        | string                                             | **required** | Text to display along the polyline                                                                                                            |
| repeat      | boolean                                            | false        | Repeat text along the polyline                                                                                                                |
| center      | boolean                                            | false        | Center text according to the polyline bounding box                                                                                            |
| below       | boolean                                            | false        | Show text underneath the polyline                                                                                                             |
| offset      | number                                             | 0            | Offset the text relative to the polyline                                                                                                      |
| orientation | number **or** string                               | 0            | Rotate text in degrees relative to the polyline                                                                                               |
| attributes  | object                                             | {}           | Attributes applied to the `text` tag. Check valid attributes [here](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text#Attributes) |

**All other options from L.Polyline are also supported. [View them here](https://leafletjs.com/reference#polyline)**
