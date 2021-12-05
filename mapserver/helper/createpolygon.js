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

const geoRenderer = (size, color) => {
    return {
        type: "simple",
        symbol: {
            type: "polygon-3d",
            symbolLayers: [{
                type: "extrude",
                size: size,
                material: {
                    color: color,
                },
            }],
        }
    }
}

const getPointFromArray = (arr) => {
    return {
        longitude: arr[0],
        latitude: arr[1]
    }
}
const getArrayFromPoint = (point) => {
    return [point.longitude, point.latitude];
    s
}

const getRect = (startPoint, bearing, length, width) => {
    const b = geolib.computeDestinationPoint(startPoint, length, bearing);
    const c = geolib.computeDestinationPoint(b, width, bearing + 270);
    const d = geolib.computeDestinationPoint(c, length, bearing + 180);
    return [startPoint, b, c, d, startPoint].map(e => [e.longitude, e.latitude])
}

const getBox = (startPoint, bearing, length, width, heights) => {
    const rect = getRect(getPointFromArray(startPoint), bearing, length, width);
    return rect.map((e, i) => [e[0], e[1], i < heights.length ? heights[i] : heights[heights.length - 1]])
}


const getEllipse = (startPoint, bearing, length, width, height, nPoint, offset) => {
    startPoint = getPointFromArray(startPoint)
    const a = length / 2;
    const b = height / 2;

    const small = length / nPoint;
    const listX = [startPoint]
    const listY = [0]
    const result = []

    for (let i = 1, x = -a + small; i <= nPoint; i++, x += small) {

        const rect = getRect(listX[i - 1], bearing, small, width)

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

const getFence = (startPoint, bearing, length, width, height, altitude, nFenc = 3) => {
    const x = (length - nFenc * width) / (nFenc - 1);
    const y = (height - nFenc * width) / (nFenc - 1);
    const result = {
        fenceX: [getBox(startPoint, bearing, width, width, altitude)],
        fenceY: [getBox(startPoint, bearing, length, width, altitude)]
    }

    for (let i = 1; i < nFenc; i++) {
        const temp = geolib.computeDestinationPoint({
            longitude: result.fenceX[i - 1][1][0],
            latitude: result.fenceX[i - 1][1][1]
        }, x, bearing);
        result.fenceX.push(getBox(getArrayFromPoint(temp), bearing, width, width, altitude))
    }
    let tmp = altitude[0]
    for (let i = 1; i < nFenc; i++) {
        tmp +=   y + width
        result.fenceY.push(getBox([result.fenceY[i - 1][0][0], result.fenceY[i - 1][0][1]], bearing, length, width, [tmp]))
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
    getEllipse,
    geoRenderer,
    getFence
}