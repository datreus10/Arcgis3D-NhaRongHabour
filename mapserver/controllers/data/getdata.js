const drawpolygon = require('../../helper/createpolygon');

const {
    Body
} = require('../../models/Body.js');
const {
    Circular_Decoration
} = require('../../models/Circular_Decoration.js');
const {
    Column_Cir_Decoration
} = require('../../models/Column_Cir_Decoration.js');
const {
    Column_Decoration
} = require('../../models/Column_Decoration.js');
const {
    Column_Fence
} = require('../../models/Column_Fence.js');
const {
    Column
} = require('../../models/Column.js');
const {
    Door
} = require('../../models/Door.js');
const {
    Face
} = require('../../models/Face.js');
const {
    Fence
} = require('../../models/Fence.js');
const {
    Floor_Brick
} = require('../../models/Floor_Brick.js');
const {
    Floor_Decoration
} = require('../../models/Floor_Decoration.js');
const {
    Floor
} = require('../../models/Floor.js');
const {
    Line
} = require('../../models/Line.js');
const {
    Node_Face
} = require('../../models/Node_Face.js');
const {
    Node
} = require('../../models/Node.js');
const {
    Point
} = require('../../models/Point.js');
const {
    Polygon
} = require('../../models/Polygon.js');
const {
    Roof_Brick
} = require('../../models/Roof_Brick.js');
const {
    Roof_Decoration
} = require('../../models/Roof_Decoration.js');
const {
    Roof
} = require('../../models/Roof.js');
const {
    Steps
} = require('../../models/Steps.js');
const {
    Wall
} = require('../../models/Wall.js');


const draw = async (drawitem, index) => {
    let listbox = [];
    let listname = [];
    for (let i = 0; i < drawitem.length; i++) {
        const polygon = await Polygon.findById(drawitem[i].IDP);
        const node = await Node.findById(polygon.IDN);
        const boxA = drawpolygon.getBox(
            [node.x, node.y],
            polygon.Direction, polygon.Length, polygon.Width, [node.z + index, node.z, node.z - index, node.z, node.z + index]
        )
        listbox.push(boxA);
        listname.push(drawitem[i].Name);
    }
    const result = drawpolygon.geoTemplate()
    listbox.forEach((box, index) => {
        result["features"].push(
            drawpolygon.geoTemplateData(listname[index] != null ? listname[index] : "Không tên", [box])
        )
    })
    return result;
}

const getfloor = async (req, res, next) => {
    const floors = await Floor.find();
    const result = await draw(floors, 0.5);

    res.send({
        renderer: drawpolygon.geoRenderer(1, "#E7AD9F"),
        content: result
    });
}

const getcolumn = async (req, res, next) => {
    const column = await Column.find();
    const result = await draw(column, 0.05);
    res.send({
        renderer: drawpolygon.geoRenderer(5, "#E7AD9F"),
        content: result
    });
}


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
        case "Floor": {
            let floor = new Floor({
                Name,
                IDP: polygoninfo._id
            });
            await floor.save();
            break;
        }
        case "Column": {
            let column = new Column({
                Name,
                IDP: polygoninfo._id,
                IDFL: floor
            });
            await column.save();
            break;
        }
        case "Wall": {
            let wall = new Wall({
                Name,
                IDP: polygoninfo._id,
                IDFL: floor
            });
            await wall.save();
            break;
        }
        case "Column_Decoration": {
            let columndecoration = new Column_Decoration({
                Name,
                IDC: column._id,
                IDP: polygoninfo._id,
            });
            await columndecoration.save();
            break;
        }
        case "Door": {
            let door = new Door({
                Name,
                IDW: wall._id,
                IDP: polygoninfo._id,
            });
            await door.save();
            break;
        }
        case "Roof_Brick": {
            let roofbrick = new Roof_Brick({
                Name,
                IDP: polygoninfo._id,
                IDFL: floor
            });
            await roofbrick.save();
            break;
        }
        case "Roof": {
            let roof = new Roof({
                Name,
                IDW: wall._id,
                IDFL: floor
            });
            await roof.save();
            break;
        }
        case "Floor_Brick": {
            let floorbrick = new Floor_Brick({
                Name,
                IDP: polygoninfo._id,
                IDFL: floor
            });
            await floorbrick.save();
            break;
        }
        case "Floor_Decoration": {
            let floordecoration = new Floor_Decoration({
                Name,
                IDP: polygoninfo._id,
                IDFL: floor
            });
            await floordecoration.save();
            break;
        }
        case "Steps": {
            let step = new Steps({
                Name,
                IDP: polygoninfo._id,
                IDFL: floor
            });
            await step.save();
            break;
        }
    }
    res.redirect('/');
}
const createcirculation = (req, res, next) => {
    res.send(req.body);
}

const getsize = async (req, res, next) => {

    let floorsize = 1;
    if (await Floor.count() != 0) {
        const floorsinfo = await Floor.find();
        const floorinfo = await Polygon.findById(floorsinfo[0].IDP);
        floorsize = floorinfo.Height;
    }


    let columnsize = 1;
    if (await Column.count() != 0) {
        const columnsinfo = await Column.find();
        const columninfo = await Polygon.findById(columnsinfo[0].IDP);
        columnsize = columninfo.Height;
    }

    let wallsize = 1;
    if (await Wall.count() != 0) {
        const wallsinfo = await Wall.find();
        const wallinfo = await Wall.findById(wallsinfo[0].IDP);
        wallsize = wallinfo.Height;
    }


    let result = {
        floorsize,
        columnsize,
        wallsize
    };
    res.send(result)
}

const getJson = async (req, res, next) => {

    const floors = await Floor.find();
    const result = await draw(floors, 0.5);

    res.send({
        renderer: {
            type: "simple",
            symbol: {
                type: "polygon-3d",
                symbolLayers: [{
                    type: "extrude",
                    size: 1,
                    material: {
                        color: "#E7AD9F",
                    },
                }],
            },
        },
        content: result
    })
}

module.exports = {
    getsize,
    getfloor,
    getcolumn,
    getTrangTri,
    createpolygon,
    createcirculation,
    getJson
}