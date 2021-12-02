const express = require('express');
const geolib = require('geolib')
const router = express.Router();


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

// width: cd, length: cr
const getRect = (startPoint, bearing, width, length) => {
    const b = geolib.computeDestinationPoint(startPoint, width, bearing);
    const c = geolib.computeDestinationPoint(b, length, bearing + 270);
    const d = geolib.computeDestinationPoint(c, width, bearing + 180);
    return [startPoint, b, c, d, startPoint].map(e => [e.longitude, e.latitude])
}




/* GET home page. */
router.get('/', (req, res, next) => {
    res.render("map")
});

router.get('/nen', (req, res, next) => {

    const startPoint = [106.70675051181462, 10.768089872127144];
    const rect = getRect(getPointFromArray(startPoint), 66, 33.5, 26.6)
    
    rect[0].push(5.5)
    rect[1].push(5)
    rect[2].push(5)
    rect[3].push(5)
    rect[4].push(5.5)

    const result = geoTemplate()
    result["features"].push(geoTemplateData("Nền nhà", [rect]))
    res.send(result)
});



module.exports = router;