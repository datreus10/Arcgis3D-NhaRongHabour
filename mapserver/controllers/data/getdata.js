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
    const size = await getsize("sizefloor")
    res.send({
        renderer: drawpolygon.geoRenderer(size, "#E7AD9F"),
        content: result
    });
}

const getcolumn = async (req, res, next) => {
    const column = await Column.find();
    const result = await draw(column, 0.05);
    const size = await getsize("columnsize")
    res.send({
        renderer: drawpolygon.geoRenderer(size, "#E7AD9F"),
        content: result
    });
}

const getwall = async (req, res, next) => {
    const wall = await Wall.find();
    const result = await draw(wall, 0.5);
    const size = await getsize("wallsize")
    res.send({
        renderer: drawpolygon.geoRenderer(size, "#E7AD9F"),
        content: result
    });
}

const getcolumndecoration = async (req, res, next) => {
    const columndecoration = await Column_Decoration.find();
    const result = await draw(columndecoration, 0.05);
    const size = await getsize("columndecorationsize")
    res.send({
        renderer: drawpolygon.geoRenderer(size, "#E7AD9F"),
        content: result
    });
}

const getdoor = async (req, res, next) => {
    const door = await Door.find();
    const result = await draw(door, 0.05);
    const size = await getsize("doorsize")
    res.send({
        renderer: drawpolygon.geoRenderer(size, "#E7AD9F"),
        content: result
    });
}

const getstep = async (req, res, next) => {
    const step = await Steps.find();
    const result = await draw(step, 0.0005);
    const size = await getsize("stepsize")
    res.send({
        renderer: drawpolygon.geoRenderer(size, "#E7AD9F"),
        content: result
    });
}

const getFence = (req, res, next) => {
    const startPoint = [106.70675889416727, 10.76809348693023];
    const bearing = 66;
    const length = 3; // chiều dài hàng rào
    const width = 0.1; //chiều rộng hàng rào
    const height = 1.5; // chiều cao hàng rào
    const altitude = [6.4] // độ cao so với mực nước biển
    const nFence = 4; //số lượng các cột

    const result = drawpolygon.getFence(startPoint, bearing, length, width, height, altitude, nFence);

    const fenceX = drawpolygon.geoTemplate();
    result.fenceX.forEach(e => fenceX["features"].push(
        drawpolygon.geoTemplateData("Không tên", [e])
    ))
    const fenceY = drawpolygon.geoTemplate();
    result.fenceY.forEach(e => fenceY["features"].push(
        drawpolygon.geoTemplateData("Không tên", [e])
    ))


    res.send([{
        renderer: drawpolygon.geoRenderer(height, "#E7AD9F"),
        content: fenceX
    }, {
        renderer: drawpolygon.geoRenderer(width, "#E7AD9F"),
        content: fenceY
    }]);
}


const getcircular_decoration = (req, res, next) => {

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
    //chổ này cần tối ưu cái node trùng
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

const getsize = async (typesize) => {

    let floorsize = 1;
    let columnsize = 1;
    let wallsize = 1;
    let circulardecorationsize = 1;
    let columndecorationsize = 1;
    let doorsize = 1;
    floorbricksize = 1;
    roofbricksize = 1;
    switch (typesize) {
        case "floorsize":
            {
                if (await Floor.count() != 0) {
                    const floorsinfo = await Floor.find();
                    const floorinfo = await Polygon.findById(floorsinfo[0].IDP);
                    floorsize = floorinfo.Height;
                    return floorsize;
                }
            }
        case "columnsize":
            {
                if (await Column.count() != 0) {
                    const columnsinfo = await Column.find();
                    const columninfo = await Polygon.findById(columnsinfo[0].IDP);
                    columnsize = columninfo.Height;
                    return columnsize;
                }
            }
        case "wallsize":
            {
                if (await Wall.count() != 0) {
                    const wallsinfo = await Wall.find();
                    const wallinfo = await Polygon.findById(wallsinfo[0].IDP);
                    wallsize = wallinfo.Height;
                    return wallsize;
                }
            }
        case "columndecorationsize":
            {
                if (await Column_Decoration.count() != 0) {
                    const listcolumndecorationinfo = await Column_Decoration.find();
                    const columndecorationinfo = await Polygon.findById(listcolumndecorationinfo[0].IDP);
                    columndecorationsize = columndecorationinfo.Height;
                    return columndecorationsize;
                }
            }
        case "circulardecorationsize":
            {
                if (await Circular_Decoration.count() != 0) {
                    const listcirculardecorationinfo = await Circular_Decoration.find();
                    const circulardecorationinfo = await Polygon.findById(listcirculardecorationinfo[0].IDP);
                    circulardecorationsize = circulardecorationinfo.Height;
                    return circulardecorationsize;
                }
            }
        case "doorsize":
            {
                if (await Door.count() != 0) {
                    const doorsinfo = await Door.find();
                    const doorinfo = await Polygon.findById(doorsinfo[0].IDP);
                    doorsize = doorinfo.Height;
                    return doorsize;
                }
            }
        case "floorbricksize":
            {
                if (await Floor_Brick.count() != 0) {
                    const floorbricksinfo = await Floor_Brick.find();
                    const floorbrickinfo = await Polygon.findById(floorbricksinfo[0].IDP);
                    floorbricksize = floorbrickinfo.Height;
                    return floorbricksize;
                }
            }
        case "roofbricksize":
            {
                if (await Roof_Brick.count() != 0) {
                    const roofbricksinfo = await Roof_Brick.find();
                    const roofbrickinfo = await Polygon.findById(roofbricksinfo[0].IDP);
                    roofbricksize = roofbrickinfo.Height;
                    return roofbricksize;
                }
            }
        case "stepsize":
            {
                if (await Steps.count() != 0) {
                    const stepsinfo = await Steps.find();
                    const stepinfo = await Polygon.findById(stepsinfo[0].IDP);
                    stepsize = stepinfo.Height;
                    return stepsize;
                }
            }
    }
}



module.exports = {
    getsize,
    getfloor,
    getcolumn,
    getcircular_decoration,
    createpolygon,
    createcirculation,
    getFence,
    getwall,
    getcolumndecoration,
    getdoor,
    getstep
}