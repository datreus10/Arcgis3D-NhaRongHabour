const drawpolygon = require("../../helper/createpolygon");

const { Body } = require("../../models/Body.js");
const { Circular_Decoration } = require("../../models/Circular_Decoration.js");
const { Column_Cir_Decoration } = require("../../models/Column_Cir_Decoration.js");
const { Column_Decoration } = require("../../models/Column_Decoration.js");
const { Column_Fence } = require("../../models/Column_Fence.js");
const { Column } = require("../../models/Column.js");
const { Door } = require("../../models/Door.js");
const { Face } = require("../../models/Face.js");
const { Fence } = require("../../models/Fence.js");
const { Floor_Brick } = require("../../models/Floor_Brick.js");
const { Floor_Decoration } = require("../../models/Floor_Decoration.js");
const { Floor } = require("../../models/Floor.js");
const { Line } = require("../../models/Line.js");
const { Node_Face } = require("../../models/Node_Face.js");
const { Node } = require("../../models/Node.js");
const { Point } = require("../../models/Point.js");
const { Polygon } = require("../../models/Polygon.js");
const { Roof_Brick } = require("../../models/Roof_Brick.js");
const { Roof_Decoration } = require("../../models/Roof_Decoration.js");
const { Roof } = require("../../models/Roof.js");
const { Steps } = require("../../models/Steps.js");
const { Wall } = require("../../models/Wall.js");

const draw = async(drawitem, index, height) => {
    let listbox = [];
    let listname = [];
    for (let i = 0; i < drawitem.length; i++) {
        const polygon = await Polygon.findById(drawitem[i].IDP);
        const node = await Node.findById(polygon.IDN);
        const boxA = drawpolygon.getBox(
            [node.x, node.y],
            polygon.Direction,
            polygon.Length,
            polygon.Width, [node.z + index, node.z, node.z - index, node.z, node.z + index]
        );
        listbox.push(boxA);
        listname.push(drawitem[i].Name);
    }
    const result = drawpolygon.geoTemplate();
    listbox.forEach((box, index) => {
        result["features"].push(
            drawpolygon.geoTemplateData(
                listname[index] != null ? listname[index] : "Không tên", [box],
                height
            )
        );
    });
    return result;
};

const drawellipse = async(drawitem, index) => {
    let listbox = [];
    let listname = [];
    for (let i = 0; i < drawitem.length; i++) {
        const polygon = await Polygon.findById(drawitem[i].IDP);
        const node = await Node.findById(polygon.IDN);
        const ellipseA = drawpolygon.getEllipse(
            [node.x, node.y],
            polygon.Direction,
            polygon.Length,
            polygon.Width,
            polygon.Height,
            drawitem[i].Count,
            node.z
        );
        listbox.push(ellipseA);
        listname.push(drawitem[i].Name);
    }
    const result = drawpolygon.geoTemplate();
    listbox.forEach((ellipse, index) => {
        result["features"].push(
            ...ellipse.map((e) => drawpolygon.geoTemplateData("Trang trí", [e]))
        );
    });
    return result;
};

const getfloor = async(req, res, next) => {
    const floors = await Floor.find();
    const size = await getsize("sizefloor");
    const result = await draw(floors, 0.5, size);
    res.send({
        renderer: drawpolygon.geoRenderer(size, "#E7AD9F"),
        content: result,
    });
};

const getcolumn = async(req, res, next) => {
    const column = await Column.find();
    const size = await getsize("columnsize");
    const result = await draw(column, 0.05, size);
    res.send({
        renderer: drawpolygon.geoRenderer(size, "#E7AD9F"),
        content: result,
    });
};

const getwall = async(req, res, next) => {
    const wall = await Wall.find();
    const size = await getsize("wallsize");
    const result = await draw(wall, 0.4, size);
    res.send({
        renderer: drawpolygon.geoRenderer(size, "#E7AD9F"),
        content: result,
    });
};


const getfloordecoration = async(req, res, next) => {
    const floordecoration = await Floor_Decoration.find();
    const size = await getsize("floordecorationsize");
    const result = await draw(floordecoration, 0.5, size);
    res.send({
        renderer: drawpolygon.geoRenderer(size, "#ffffff"),
        content: result,
    });
};

const getfloorbrick = async(req, res, next) => {
    const floorbrick = await Floor_Brick.find();
    const size = await getsize("floorbricksize");
    const result = await draw(floorbrick, 0.5, size);
    res.send({
        renderer: drawpolygon.geoRenderer(size, "rgb(222, 222, 222)"),
        content: result,
    });
};

const getroofbrick = async(req, res, next) => {
    const roofbrick = await Roof_Brick.find();
    const size = await getsize("roofbricksize");
    const result = await draw(roofbrick, 0.5, size);
    res.send({
        renderer: drawpolygon.geoRenderer(size, "#fda265"),
        content: result,
    });
};

const getroof = async(req, res, next) => {
    // const roof = await Roof.find();
    // const size = await getsize("roofsize")
    // const result = await draw(roof, 6,size);
    // res.send({
    //     renderer: drawpolygon.geoRenderer(size, "#E7AD9F"),
    //     content: result
    // });
};

const getcolumndecoration = async(req, res, next) => {
    const columndecoration = await Column_Decoration.find();
    const size = await getsize("columndecorationsize");
    const result = await draw(columndecoration, 0.02, size);
    res.send({
        renderer: drawpolygon.geoRenderer(size, "#FFFFFF"),
        content: result,
    });
};

const getdoor = async(req, res, next) => {
    const door = await Door.find();
    const size = await getsize("doorsize");
    const result = await draw(door, 0.05, size);
    res.send({
        renderer: drawpolygon.geoRenderer(size, "#E7AD9F"),
        content: result,
    });
};

const getstep = async(req, res, next) => {
    const step = await Steps.find();
    const size = await getsize("stepsize");
    const result = await draw(step, 0.0005, size);
    res.send({
        renderer: drawpolygon.geoRenderer(size, "rgb(222, 222, 222)"),
        content: result,
    });
};

const getFence = async(req, res, next) => {
    const listData = await Fence.find().populate("IDP");

    const result = [];
    for (let i = 0; i < listData.length; i++) {
        const node = await Node.findById(listData[i].IDP.IDN);
        const startPoint = [node.x, node.y];
        const bearing = listData[i].IDP.Direction;
        const length = listData[i].IDP.Length; // chiều dài hàng rào
        const width = listData[i].IDP.Width; //chiều rộng hàng rào
        const height = listData[i].IDP.Height; // chiều cao hàng rào
        const altitude = [node.z, node.z - 0.03, node.z, node.z, node.z]; // độ cao so với mực nước biển
        const nFence = listData[i].Count_CrossBar; //số lượng các cột

        const tmp = drawpolygon.getFence(
            startPoint,
            bearing,
            length,
            width,
            height,
            altitude,
            nFence
        );

        const fenceX = drawpolygon.geoTemplate();
        tmp.fenceX.forEach((e) =>
            fenceX["features"].push(drawpolygon.geoTemplateData("Hàng rào", [e]))
        );
        const fenceY = drawpolygon.geoTemplate();
        tmp.fenceY.forEach((e) =>
            fenceY["features"].push(drawpolygon.geoTemplateData("Hàng rào", [e]))
        );

        result.push([{
                renderer: drawpolygon.geoRenderer(height, "#333"),
                content: fenceX,
            },
            {
                renderer: drawpolygon.geoRenderer(width, "#333"),
                content: fenceY,
            },
        ]);
    }

    res.send(result);
};



const getcircular_decoration = async(req, res, next) => {
    const circulardecoration = await Circular_Decoration.find();
    const result = await drawellipse(circulardecoration, 0.0005);
    const size = await getsize("circulardecorationsize");
    res.send({
        renderer: drawpolygon.geoRenderer(size, "#E7AD9F"),
        content: result,
    });
};

const createpolygon = async(req, res, next) => {
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
        Altitude,
    } = req.body;
    console.log(req.body);
    startPoint = lnglat.split(",");
    let node = new Node({
        x: startPoint[0],
        y: startPoint[1],
        z: Altitude,
    });
    let bodyinfo = await Body.findById(body);
    const nodeinfo = await node.save();
    let polygon = new Polygon({
        IDB: bodyinfo,
        IDN: nodeinfo,
        Width,
        Length,
        Height,
        Direction,
    });
    const polygoninfo = await polygon.save();
    switch (type) {
        case "Floor":
            {
                let floor = new Floor({
                    Name,
                    IDP: polygoninfo._id,
                });
                await floor.save();
                break;
            }
        case "Column":
            {
                let column = new Column({
                    Name,
                    IDP: polygoninfo._id,
                    IDFL: floor,
                });
                await column.save();
                break;
            }
        case "Wall":
            {
                let wall = new Wall({
                    Name,
                    IDP: polygoninfo._id,
                    IDFL: floor,
                });
                await wall.save();
                break;
            }
        case "Column_Decoration":
            {
                let columndecoration = new Column_Decoration({
                    Name,
                    IDC: column,
                    IDP: polygoninfo._id,
                });
                await columndecoration.save();
                break;
            }
        case "Door":
            {
                let door = new Door({
                    Name,
                    IDW: wall,
                    IDP: polygoninfo._id,
                });
                await door.save();
                break;
            }
        case "Roof_Brick":
            {
                let roofbrick = new Roof_Brick({
                    Name,
                    IDP: polygoninfo._id,
                    IDFL: floor,
                });
                await roofbrick.save();
                break;
            }
        case "Roof":
            {
                let roof = new Roof({
                    Name,
                    IDW: wall,
                    IDFL: floor,
                    IDP: polygoninfo._id,
                });
                await roof.save();
                break;
            }
        case "Floor_Brick":
            {
                let floorbrick = new Floor_Brick({
                    Name,
                    IDP: polygoninfo._id,
                    IDFL: floor,
                });
                await floorbrick.save();
                break;
            }
        case "Floor_Decoration":
            {
                let floordecoration = new Floor_Decoration({
                    Name,
                    IDP: polygoninfo._id,
                    IDFL: floor,
                });
                await floordecoration.save();
                break;
            }
        case "Steps":
            {
                let step = new Steps({
                    Name,
                    IDP: polygoninfo._id,
                    IDFL: floor,
                });
                await step.save();
                break;
            }
    }
    res.redirect("/admin");
};
const createcirculation = async(req, res, next) => {
    const { body, column, Length, Width, Height, lnglat, Direction, Altitude, Count } = req.body;
    console.log(req.body);
    startPoint = lnglat.split(",");
    let node = new Node({
        x: startPoint[0],
        y: startPoint[1],
        z: Altitude,
    });
    let bodyinfo = await Body.findById(body);
    const nodeinfo = await node.save();
    let polygon = new Polygon({
        IDB: bodyinfo,
        IDN: nodeinfo,
        Width,
        Length,
        Height,
        Direction,
    });
    const polygoninfo = await polygon.save();
    let circulardecoration = new Circular_Decoration({
        Name: "Circular Decoration",
        IDC: column,
        IDP: polygoninfo._id,
        Count,
    });
    await circulardecoration.save();
    res.redirect("/admin/admin_circulation");
};

const createfence = async(req, res, next) => {
    const { body, column, Length, Width, Height, lnglat, Direction, Altitude, Count } = req.body;
    console.log(req.body);
    startPoint = lnglat.split(",");
    let node = new Node({
        x: startPoint[0],
        y: startPoint[1],
        z: Altitude,
    });
    let bodyinfo = await Body.findById(body);
    const nodeinfo = await node.save();
    let polygon = new Polygon({
        IDB: bodyinfo,
        IDN: nodeinfo,
        Width,
        Length,
        Height,
        Direction,
    });
    const polygoninfo = await polygon.save();
    let fence = new Fence({
        Name: "Fence",
        IDC: column,
        IDP: polygoninfo._id,
        Count_CrossBar: Count,
        Count_Jamb: Count,
    });
    await fence.save();
    res.redirect("/admin/Admin_fence");
};

const getsize = async(typesize) => {
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
                if ((await Floor.count()) != 0) {
                    const floorsinfo = await Floor.find();
                    const floorinfo = await Polygon.findById(floorsinfo[0].IDP);
                    floorsize = floorinfo.Height;
                    return floorsize;
                }
            }
        case "columnsize":
            {
                if ((await Column.count()) != 0) {
                    const columnsinfo = await Column.find();
                    const columninfo = await Polygon.findById(columnsinfo[0].IDP);
                    columnsize = columninfo.Height;
                    return columnsize;
                }
            }
        case "wallsize":
            {
                if ((await Wall.count()) != 0) {
                    const wallsinfo = await Wall.find();
                    const wallinfo = await Polygon.findById(wallsinfo[0].IDP);
                    wallsize = wallinfo.Height;
                    return wallsize;
                }
            }
        case "columndecorationsize":
            {
                if ((await Column_Decoration.count()) != 0) {
                    const listcolumndecorationinfo = await Column_Decoration.find();
                    const columndecorationinfo = await Polygon.findById(
                        listcolumndecorationinfo[0].IDP
                    );
                    columndecorationsize = columndecorationinfo.Height;
                    return columndecorationsize;
                }
            }
        case "circulardecorationsize":
            {
                if ((await Circular_Decoration.count()) != 0) {
                    const listcirculardecorationinfo = await Circular_Decoration.find();
                    const circulardecorationinfo = await Polygon.findById(
                        listcirculardecorationinfo[0].IDP
                    );
                    circulardecorationsize = circulardecorationinfo.Height;
                    return circulardecorationsize;
                }
            }
        case "doorsize":
            {
                if ((await Door.count()) != 0) {
                    const doorsinfo = await Door.find();
                    const doorinfo = await Polygon.findById(doorsinfo[0].IDP);
                    doorsize = doorinfo.Height;
                    return doorsize;
                }
            }
        case "floorbricksize":
            {
                if ((await Floor_Brick.count()) != 0) {
                    const floorbricksinfo = await Floor_Brick.find();
                    const floorbrickinfo = await Polygon.findById(floorbricksinfo[0].IDP);
                    floorbricksize = floorbrickinfo.Height;
                    return floorbricksize;
                }
            }
        case "floordecorationsize":
                {
                    if ((await Floor_Decoration.count()) != 0) {
                        const floordecorationsinfo = await Floor_Decoration.find();
                        const floordecorationinfo = await Polygon.findById(floordecorationsinfo[0].IDP);
                        floordecorationsize = floordecorationinfo.Height;
                        return floordecorationsize;
                    }
                }
        case "roofbricksize":
            {
                if ((await Roof_Brick.count()) != 0) {
                    const roofbricksinfo = await Roof_Brick.find();
                    const roofbrickinfo = await Polygon.findById(roofbricksinfo[0].IDP);
                    roofbricksize = roofbrickinfo.Height;
                    return roofbricksize;
                }
            }
        case "stepsize":
            {
                if ((await Steps.count()) != 0) {
                    const stepsinfo = await Steps.find();
                    const stepinfo = await Polygon.findById(stepsinfo[0].IDP);
                    stepsize = stepinfo.Height;
                    return stepsize;
                }
            }
        case "roofsize":
            {
                if ((await Roof.count()) != 0) {
                    const roofsinfo = await Roof.find();
                    const roofinfo = await Polygon.findById(roofsinfo[0].IDP);
                    roofsize = roofinfo.Height;
                    return roofsize;
                }
            }
    }
};

const searchitemupdate = async(req, res, next) => {
    const { body, type } = req.body;
    let listitem = [];
    let polygons = await Polygon.find({ IDB: body });
    if (type == "Floor") {
        for (let i = 0; i < polygons.length; i++) {
            let itemselected = await Floor.find({ IDP: polygons[i].id });
            if (itemselected.length != 0) {
                listitem.push(...itemselected);
            }
        }
    } else if (type == "Steps") {
        for (let i = 0; i < polygons.length; i++) {
            let itemselected = await Steps.find({ IDP: polygons[i].id });
            if (itemselected.length != 0) {
                listitem.push(...itemselected);
            }
        }
    } else if (type == "Column") {
        for (let i = 0; i < polygons.length; i++) {
            let itemselected = await Column.find({ IDP: polygons[i].id });
            if (itemselected.length != 0) {
                listitem.push(...itemselected);
            }
        }
    } else if (type == "Door") {
        for (let i = 0; i < polygons.length; i++) {
            let itemselected = await Door.find({ IDP: polygons[i].id });
            if (itemselected.length != 0) {
                listitem.push(...itemselected);
            }
        }
    } else if (type == "Roof_Brick") {
        for (let i = 0; i < polygons.length; i++) {
            let itemselected = await Roof_Brick.find({ IDP: polygons[i].id });
            if (itemselected.length != 0) {
                listitem.push(...itemselected);
            }
        }
    } else if (type == "Floor_Brick") {
        for (let i = 0; i < polygons.length; i++) {
            let itemselected = await Floor_Brick.find({ IDP: polygons[i].id });
            if (itemselected.length != 0) {
                listitem.push(...itemselected);
            }
        }
    } else if (type == "Roof") {
        for (let i = 0; i < polygons.length; i++) {
            let itemselected = await Roof.find({ IDP: polygons[i].id });
            if (itemselected.length != 0) {
                listitem.push(...itemselected);
            }
        }
    } else if (type == "Wall") {
        for (let i = 0; i < polygons.length; i++) {
            let itemselected = await Wall.find({ IDP: polygons[i].id });
            if (itemselected.length != 0) {
                listitem.push(...itemselected);
            }
        }
    } else if (type == "Floor_Decoration") {
        for (let i = 0; i < polygons.length; i++) {
            let itemselected = await Floor_Decoration.find({ IDP: polygons[i].id });
            if (itemselected.length != 0) {
                listitem.push(...itemselected);
            }
        }
    } else if (type == "Column_Decoration") {
        for (let i = 0; i < polygons.length; i++) {
            let itemselected = await Column_Decoration.find({ IDP: polygons[i].id });
            if (itemselected.length != 0) {
                listitem.push(...itemselected);
            }
        }
    } else if (type == "Roof_Decoration") {
        for (let i = 0; i < polygons.length; i++) {
            let itemselected = await Roof_Decoration.find({ IDP: polygons[i].id });
            if (itemselected.length != 0) {
                listitem.push(...itemselected);
            }
        }
    } else if (type == "Circular_Decoration") {
        for (let i = 0; i < polygons.length; i++) {
            let itemselected = await Circular_Decoration.find({ IDP: polygons[i].id });
            if (itemselected.length != 0) {
                listitem.push(...itemselected);
            }
        }
    } else if (type == "Fence") {
        for (let i = 0; i < polygons.length; i++) {
            let itemselected = await Fence.find({ IDP: polygons[i].id });
            if (itemselected.length != 0) {
                listitem.push(...itemselected);
            }
        }
    }
    res.render("SearchItemPage", { listitem: listitem, type: type });
};

const updateitem = async(req, res, next) => {
    const { item, method, type } = req.body;
    let iteminfo;
    let itemselected = {
        Id: item,
        Name: "",
        Length: "",
        Width: "",
        Height: "",
        lnglat: "",
        Direction: "",
        Altitude: "",
        type: type,
    };
    if (method == "remove") {
        if (type == "Floor") {
            iteminfo =await Floor.findById(item);
            await Floor.findByIdAndRemove(item);
        } else if (type == "Steps") {
            iteminfo =await Steps.findById(item);
            await Steps.findByIdAndRemove(item);
        } else if (type == "Column") {
            iteminfo =await Column.findById(item);
            await Column.findByIdAndRemove(item);
        } else if (type == "Door") {
            iteminfo =await Door.findById(item);
            await Door.findByIdAndRemove(item);
        } else if (type == "Roof_Brick") {
            iteminfo =await Roof_Brick.findById(item);
            await Roof_Brick.findByIdAndRemove(item);
        } else if (type == "Floor_Brick") {
            iteminfo =await Floor_Brick.findById(item);
            await Floor_Brick.findByIdAndRemove(item);
        } else if (type == "Roof") {
            iteminfo =await Roof.findById(item);
            await Roof.findByIdAndRemove(item);
        } else if (type == "Wall") {
            iteminfo =await Wall.findById(item);
            await Wall.findByIdAndRemove(item);
        } else if (type == "Floor_Decoration") {
            iteminfo =await Floor_Decoration.findById(item);
            await Floor_Decoration.findByIdAndRemove(item);
        } else if (type == "Column_Decoration") {
            iteminfo =await Column_Decoration.findById(item);
            await Column_Decoration.findByIdAndRemove(item);
        } else if (type == "Roof_Decoration") {
            iteminfo =await Roof_Decoration.findById(item);
            await Roof_Decoration.findByIdAndRemove(item);
        } else if (type == "Circular_Decoration") {
            iteminfo =await Circular_Decoration.findById(item);
            await Circular_Decoration.findByIdAndRemove(item);
        } else if (type == "Fence") {
            iteminfo =await Fence.findById(item);
            await Fence.findByIdAndRemove(item);
        }
        polygoninfo = await Polygon.findById(iteminfo.IDP);
        await Polygon.findByIdAndRemove(iteminfo.IDP);
        await Node.findByIdAndRemove(polygoninfo.IDN);
        res.redirect("/admin");
    } else {
        if (type == "Floor") {
            iteminfo = await Floor.findById(item);
        } else if (type == "Steps") {
            iteminfo = await Steps.findById(item);
        } else if (type == "Column") {
            iteminfo = await Column.findById(item);
        } else if (type == "Door") {
            iteminfo = await Door.findById(item);
        } else if (type == "Roof_Brick") {
            iteminfo = await Roof_Brick.findById(item);
        } else if (type == "Floor_Brick") {
            iteminfo = await Floor_Brick.findById(item);
        } else if (type == "Roof") {
            iteminfo = await Roof.findById(item);
        } else if (type == "Wall") {
            iteminfo = await Wall.findById(item);
        } else if (type == "Floor_Decoration") {
            iteminfo = await Floor_Decoration.findById(item);
        } else if (type == "Column_Decoration") {
            iteminfo = await Column_Decoration.findById(item);
        } else if (type == "Roof_Decoration") {
            iteminfo = await Roof_Decoration.findById(item);
        } else if (type == "Circular_Decoration") {
            iteminfo = await Circular_Decoration.findById(item);
        } else if (type == "Fence") {
            iteminfo = await Fence.findById(item);
        }
        polygoninfo = await Polygon.findById(iteminfo.IDP);
        itemselected.Id = iteminfo._id;
        itemselected.Name = iteminfo.Name;
        itemselected.Length = polygoninfo.Length;
        itemselected.Width = polygoninfo.Width;
        itemselected.Height = polygoninfo.Height;
        itemselected.Direction = polygoninfo.Direction;
        nodeinfo = await Node.findById(polygoninfo.IDN);
        itemselected.lnglat = nodeinfo.x + "," + nodeinfo.y;
        itemselected.Altitude = nodeinfo.z;
        res.render("Updateitem", { item: itemselected });
    }
};

const update = async(req, res, next) => {
    const { type, itemid, Name, Length, Width, Height, lnglat, Direction, Altitude } = req.body;
    let iteminfo;
    let xy = lnglat.split(",");
    if (type == "Floor") {
        await Floor.findByIdAndUpdate(itemid, { Name: Name });
        iteminfo =await Floor.findById(itemid);
    } else if (type == "Steps") {
        await Steps.findByIdAndUpdate(itemid, { Name: Name });
        iteminfo =await Steps.findById(itemid);
    } else if (type == "Column") {
        await Column.findByIdAndUpdate(itemid, { Name: Name });
        iteminfo =await Column.findById(itemid);
    } else if (type == "Door") {
        await Door.findByIdAndUpdate(itemid, { Name: Name });
        iteminfo =await Door.findById(itemid);
    } else if (type == "Roof_Brick") {
        await Roof_Brick.findByIdAndUpdate(itemid, { Name: Name });
        iteminfo =await Roof_Brick.findById(itemid);
    } else if (type == "Floor_Brick") {
        await Floor_Brick.findByIdAndUpdate(itemid, { Name: Name });
        iteminfo =await Floor_Brick.findById(itemid);
    } else if (type == "Roof") {
        await Roof.findByIdAndUpdate(itemid, { Name: Name });
        iteminfo =await Roof.findById(itemid);
    } else if (type == "Wall") {
        await Wall.findByIdAndUpdate(itemid, { Name: Name });
        iteminfo =await Wall.findById(itemid);
    } else if (type == "Floor_Decoration") {
        await Floor_Decoration.findByIdAndUpdate(itemid, { Name: Name });
        iteminfo =await Floor_Decoration.findById(itemid);
    } else if (type == "Column_Decoration") {
        await Column_Decoration.findByIdAndUpdate(itemid, { Name: Name });
        iteminfo =await Column_Decoration.findById(itemid);
    } else if (type == "Roof_Decoration") {
        await Roof_Decoration.findByIdAndUpdate(itemid, { Name: Name });
        iteminfo =await Roof_Decoration.findById(itemid);
    } else if (type == "Circular_Decoration") {
        await Circular_Decoration.findByIdAndUpdate(itemid, { Name: Name });
        iteminfo =await Circular_Decoration.findById(itemid);
    } else if (type == "Fence") {
        await Fence.findByIdAndUpdate(itemid, { Name: Name });
        iteminfo =await Fence.findById(itemid);
    }
    polygoninfo = await Polygon.findById(iteminfo.IDP);
    await Polygon.findByIdAndUpdate(iteminfo.IDP, {
        Length: Length,
        Width: Width,
        Height: Height,
        Direction: Direction,
    });
    await Node.findByIdAndUpdate(polygoninfo.IDN, { x: xy[0], y: xy[1], z: Altitude });
    res.redirect("/admin");
};

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
    getstep,
    getroof,
    getfloordecoration,
    getfloorbrick,
    getroofbrick,
    createfence,
    searchitemupdate,
    updateitem,
    update,
};