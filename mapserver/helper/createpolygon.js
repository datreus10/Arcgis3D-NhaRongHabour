const express = require('express');
const geolib = require('geolib')


const geoTemplateData = (name, data, idb = 0) => {
    return {
        "type": "Feature",
        "properties": {
            "Building name": name,
            "height": 0,
            "idb": `${idb}`
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": data
        },
        "id": `pp${idb}`
    }
}

const geoTemplate = () => {
    return {
        "type": "FeatureCollection",
        "generator": "smartcity",
        "copyright": "Smartcity",
        "timestamp": Date.now(),
        "features": []
    }
}


const getPointFromArray = (arr) => {
    return {
        longitude: arr[0],
        latitude: arr[1]
    }
}

const getRect = (startPoint, bearing, width, length) => {
    const b = geolib.computeDestinationPoint(startPoint, width, bearing);
    const c = geolib.computeDestinationPoint(b, length, bearing + 270);
    const d = geolib.computeDestinationPoint(c, width, bearing + 180);
    return [startPoint, b, c, d, startPoint].map(e => [e.longitude, e.latitude])
}



const getBox = (data) => {
    const {
        startPoint,
        bearing,
        width,
        length,
        heights
    } = data;
    const rect = getRect(getPointFromArray(startPoint), bearing, width, length);
    return rect.map((e, i) => [e[0], e[1], i < heights.length ? heights[i] : heights[heights.length - 1]])
}


module.exports = {
    geoTemplateData,
    geoTemplate,
    getPointFromArray,
    getRect,
    getBox,
}
