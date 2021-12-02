var {
    geoTemplateData,
    geoTemplate,
    getPointFromArray,
    getRect
} = require('../../helper/createpolygon');

const getnen = (req, res, next) => {

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
}


module.exports = {
    getnen
}