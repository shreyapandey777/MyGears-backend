import mongoose from "mongoose";

const assetSchema = new mongoose.Schema({
    assetId: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    manufacturer: {
        type: String,
    },
    modelNo: {
        type: String,
    },
    serialNo: {
        type: String,
        unique: true,
    },
    insDate: {
        type: String,
    },
    mnsDate: {
        type: String,
    },
    status: {
        type: String,
    },
    power: {
        type: String,
    },
    voltage: {
        type: String,
    },
    current: {
        type: String,
    },
    speed: {
        type: String,
    }
})

const Asset = mongoose.model('asset', assetSchema);

export default Asset;