var {
    geoTemplateData,
    geoTemplate,
    getBox
} = require('../../helper/createpolygon');

const getnen = (req, res, next) => {

    const box = getBox({
        startPoint: [106.70675051181462, 10.768089872127144],
        bearing: 66,
        width: 33,
        length: 26,
        heights: [5.5, 5, 5, 5, 5.5]
    })

    const result = geoTemplate()
    result["features"].push(geoTemplateData("Nền nhà", [box]))
    res.send(result)

}


module.exports = {
    getnen
}