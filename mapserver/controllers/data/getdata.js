const drawpolygon = require('../../helper/createpolygon');

const { Body } = require('../../models/Body.js');
const { Node } = require('../../models/Node.js');
const { Door } = require('../../models/Door.js');
const { Polygon } = require('../../models/Polygon.js');
const { Floor } = require('../../models/Floor.js');
const { Column } = require('../../models/Column.js');
// const getnen = (req, res, next) => {
//     const startPoint = [106.70675051181462, 10.768089872127144];
//     const type="nền nhà";
//     const bearing = 66;
//     const width = 33.5;
//     const length = 26.6;
//     const altitute = 5;
//     const result = createPolygon(startPoint,type, bearing, width, length,altitute);
// }

const getnen = async (req, res, next) => {
    let listbox = [];
    const floors = await Floor.find();
    for (let i = 0; i < floors.length; i++) {
        const polygon = await Polygon.findById(floors[i].IDP);
        const node = await Node.findById(polygon.IDN);
        const boxA = drawpolygon.getBox(
            [node.x, node.y],
            polygon.Direction, polygon.Length, polygon.Width, [node.z + 0.5, node.z, node.z - 0.5, node.z, node.z + 0.5]
        )
        listbox.push(boxA);
    }
    const result = drawpolygon.geoTemplate()
    listbox.forEach(box => {
        result["features"].push(
            drawpolygon.geoTemplateData("Nền A", [box])
        )
    })
    console.log(result);

    res.send(result);
}


// const boxA = polygon.getBox(
//     [106.70675051181462, 10.768089872127144],
//     66, 33.5, 26.4, [5.5, 5, 5, 5, 5.5]
// )


// const result = polygon.geoTemplate()
// result["features"].push(
//     polygon.geoTemplateData("Nền A", [boxA])
// )
// res.send(result)

const getTrangTri = (req, res, next) => {

    const ellipse = drawpolygon.getEllipse(
        [106.70675051181462, 10.768089872127144],
        66, 3, 1, 1.5, 100, 10
    )

    const result = drawpolygon.geoTemplate()
    result["features"] = ellipse.map(e => drawpolygon.geoTemplateData("trang trí", [e]))
    res.send(result)

}


const createpolygon = async (req, res, next) => {
    const {
        body,
        wall,
        floor,
        column,
        type,
        Name,
        Length,
        Width,
        Height,
        lnglat,
        Direction,
        Altitude
    } = req.body;
    console.log(req.body);
    startPoint = lnglat.split(",");
    let node = new Node({
        x: startPoint[0],
        y: startPoint[1],
        z: Altitude
    });
    let bodyinfo = await Body.findById(body);
    const nodeinfo = await node.save();
    let polygon = new Polygon({
        IDB: bodyinfo,
        IDN: nodeinfo,
        Width,
        Length,
        Height,
        Direction
    })
    const polygoninfo = await polygon.save();
    switch (type) {
        case "Floor":
            {
                let floor = new Floor({
                    Name,
                    IDP: polygoninfo._id
                });
                await floor.save();
                break;
            }
        case "Column":
            {
                let column = new Column({
                    Name,
                    IDP: polygoninfo._id,
                    IDFL: floor
                });
                await column.save();
                break;
            }
    }
    res.redirect('/');
}
const createcirculation = (req, res, next) => {
    res.send(req.body);
}

module.exports = {
    getnen,
    getTrangTri,
    createpolygon,
    createcirculation
}