const express = require('express');
const {
    altitudeKeys
} = require('geolib');
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

const getBox = (startPoint, bearing, width, length, heights) => {
    const rect = getRect(getPointFromArray(startPoint), bearing, width, length);
    return rect.map((e, i) => [e[0], e[1], i < heights.length ? heights[i] : heights[heights.length - 1]])
}


const getEllipse = (startPoint, bearing, width, length, height, nPoint, offset) => {
    startPoint = getPointFromArray(startPoint)
    const a = width / 2;
    const b = height / 2;

    const small = width / nPoint;
    const listX = [startPoint]
    const listY = [0]
    const result = []

    for (let i = 1, x = -a + small; i <= nPoint; i++, x += small) {

        const rect = getRect(listX[i - 1], bearing, small, length)

        listX.push(getPointFromArray(rect[1]))
        const tmp = Math.sqrt((1 - ((x * x) / (a * a))) * b * b)
        listY.push(tmp > 0 ? tmp : 0)

        result.push(rect.map((e, j) => {
            if (j > 0 && j < 3)
                return [...e, offset + listY[i]]
            return [...e, offset + listY[i - 1]]
        }))
    }

    return result;
}



module.exports = {
    geoTemplateData,
    geoTemplate,
    getPointFromArray,
    getRect,
    getBox,
    //createPolygon,
    getEllipse
}