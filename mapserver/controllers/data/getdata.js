var {
    createPolygon
} = require('../../helper/createpolygon');

const getnen = (req, res, next) => {
    const startPoint = [106.70675051181462, 10.768089872127144];
    const type="nền nhà";
    const bearing = 66;
    const width = 33.5;
    const length = 26.6;
    const altitute = 5;
    const result = createPolygon(startPoint,type, bearing, width, length,altitute);
    res.send(result)
}


module.exports = {
    getnen
}