const entities = require('../../entities/entities');
const utils = require('../../utils');
const roomUseCases = require('../../use-cases/roomUseCases');

const handleSaveError = (err) => {
    console.log(`Room Controller`);
    console.log(`An error has occured while tryng to performe a Room model operation`);
    console.log(`Error: ${err}`);
};

module.exports = {
    // Method = POST
    // Action = newRoom/
    // Req.body = {roomNumber: 5, capacity: 2}
    newRoom : async (req, res, next) => {
        const roomDocument = new entities.Room(req.body);
        try {
            await roomUseCases.newRoom(roomDocument);   
            res.status(201).json({roomDocument});
        } catch (error) {
            console.log(`An error has occured while saving a Room`);
            console.log(`Error: ${err}`);
            res.status(400).json({error : 'Room not created'});
        }
    },
    // Method = GET
    // Action = room/
    // Req.body = {}
    getRooms : async (req, res, next) => {
        try {
            const docs = await roomUseCases.getRooms();
            if(docs.length == 0) res.status(204).json({error : 'Resources not found'});
            else res.status(200).json(docs);
        } catch (error) {
            handleSaveError(error);
        }
    },
    // Method = GET
    // Action = /rooms/room_number/:roomNumber/
    // Req.body =  {roomNumber : 4}
    getRoomByNumber : async (req, res, next) => {
        try {
            const roomNumber = req.params.roomNumber;
            const doc = await roomUseCases.getRoomByNumber({roomNumber});
            if(utils.isEmpty(doc)) {
                res.status(204).json({error : "Resources not found by room number", roomNumber});
                //res.json(204, {error : "Resources not found by room number", roomNumber});
            }
            else res.status(200).json(doc);
        } catch (error) {
            handleSaveError(error);
        }
    },
    // Method = GET
    // Action = rooms/capacity/:capacity/
    // Req.body =  {capacity : 3}
    getRoomsByCapacity : async (req, res, next) => {
        try {
            const capacity = req.params.capacity;
            const docs = await roomUseCases.getRoomsByCapacity({capacity});
            if(docs.length == 0) 
                res.status(204).json({error : 'Resources not found by capacity', capacity});
            else res.status(200).json(docs);
        } catch (error) {
            handleSaveError(error);
        }
    },
    // Method = GET
    // Action = rooms/occupancy/:occupancyState/
    // Req.body =  {occupancyState : true}
    getRoomsByOccupancyState : async (req, res, next) => {
        try {
            const occupancyState = req.params.occupancyState;
            const docs = await roomUseCases.getRoomsByOccupancyState({occupancyState});
            if(docs.length == 0) 
                res.status(204).json({error : 'Resources not found by occupancy state', occupancyState});
            else res.status(200).json(docs);
        } catch (error) {
            handleSaveError(error);
        }
    }
}