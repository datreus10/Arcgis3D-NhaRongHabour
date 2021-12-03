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
// const A = {
//     longitude: '106.70675051181462',
//     latitude: '10.768089872127144'
// };

// const distance = (lat1, long1, lat2, long2) => {
//     if ((lat1 == lat2) && (long1 == long2)) {
//         return 0;
//     } else {
//         var radlat1 = Math.PI * lat1 / 180;
//         var radlat2 = Math.PI * lat2 / 180;
//         var theta = long1 - long2;
//         var radtheta = Math.PI * theta / 180;
//         var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
//         if (dist > 1) {
//             dist = 1;
//         }
//         dist = Math.acos(dist);
//         dist = dist * 180 / Math.PI;
//         dist = dist * 60 * 1.1515;
//         dist = dist * 1.609344;
//         return dist;
//     }
// }

const getRect = (startPoint, bearing, width, length) => {
    // const distancewithA = distance(A.latitude, A.longitude,startPoint.latitude,startPoint.longitude);
    // altitudeA= getAltitudewidth(distancewithA,altitute);
    // altitudeB= getAltitudewidth(distancewithA+width,altitute);
    // altitudeC= getAltitudelength(distancewithA+width,length,altitute);
    // altitudeD= getAltitudelength(distancewithA,length,altitute);
    // console.log(altitudeA +" "+ altitudeB + " "+ altitudeC+" "+ altitudeD);
    const b = geolib.computeDestinationPoint(startPoint, width, bearing);
    const c = geolib.computeDestinationPoint(b, length, bearing + 270);
    const d = geolib.computeDestinationPoint(c, width, bearing + 180);
    return [startPoint, b, c, d, startPoint].map(e => [e.longitude, e.latitude])
}

// const getAltitudewidth = (width,altitude) => {
//     h=(33.5-width)*1/67;
//     altitude +=h; 
//     return altitude;
// }
// const getAltitudelength = (width,length,altitude) => {
//     const altitude1 = getAltitudewidth(width,altitude);
//     console.log(altitude1+"\n");
//     h= (26.6-length) * altitude1/26.6;
//     altitude +=h; 
//     return altitude;
// }

// const createPolygon = (startPoint, type, bearing, width, length, altitute) => {
//     altitutes = [altitute + 0.5, altitute, altitute - 0.5, altitute, altitute + 0.5]
//     const rect = getRect(getPointFromArray(startPoint), bearing, width, length, altitute)
//     rect.forEach((rectinfo, index) => {
//         rectinfo.push(altitutes[index]);
//     })
//     const result = geoTemplate()
//     result["features"].push(geoTemplateData(type, [rect]))
//     return result;
// }

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