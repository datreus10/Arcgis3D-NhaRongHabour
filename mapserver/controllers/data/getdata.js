const polygon = require('../../helper/createpolygon');

// const getnen = (req, res, next) => {
//     const startPoint = [106.70675051181462, 10.768089872127144];
//     const type="nền nhà";
//     const bearing = 66;
//     const width = 33.5;
//     const length = 26.6;
//     const altitute = 5;
//     const result = createPolygon(startPoint,type, bearing, width, length,altitute);
// }

const getnen = (req, res, next) => {

    const boxA = polygon.getBox(
        [106.70675051181462, 10.768089872127144],
        66, 33.5, 26.4, [5.5, 5, 5, 5, 5.5]
    )


    const result = polygon.geoTemplate()
    result["features"].push(
        polygon.geoTemplateData("Nền A", [boxA])
    )
    res.send(result)

}

const getTrangTri = (req, res, next) => {

    const ellipse = polygon.getEllipse(
        [106.70675051181462, 10.768089872127144],
        66, 3, 1, 1.5, 100, 10
    )

    const result = polygon.geoTemplate()
    result["features"] = ellipse.map(e => polygon.geoTemplateData("trang trí", [e]))
    res.send(result)

}


module.exports = {
    getnen,
    getTrangTri
}