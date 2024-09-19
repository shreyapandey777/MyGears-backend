import Asset from "../model/asset.js";

const fetchAsset = async (req, res) => {
    const assetData = await Asset.find({})
    res.send(assetData)
}


const getAssetById = async (req, res) => {
    const assetData = await Asset.findById(req.params.id)
    res.send(assetData)
}


const createNewAsset = async (req, res) => {
    try {
        const newAssetData = req.body.values
        const newAssetobject = new Asset({ ...newAssetData });
        const savedAsset = await newAssetobject.save()
        res.status(201).json({
            message: "success",
            savedAsset
        })
    } catch (error) {
        console.error('Error creating asset:', error);
        if (error.code === 11000) {
            return res.status(409).json({ error: 'Duplicate key error', details: 'AssetId or SerialNo already exists' });
        }a
    }
}


const updateAssetById = async (req, res) => {
    try {
        const id = req.params.id
        console.log(req.body);
        const assetUpdate = await Asset.findByIdAndUpdate({ _id: id }, req.body.values, { new: true, upsert: true });
        res.status(201).json({ assetUpdate })
    }
    catch (err) {
        console.error(err)
    }
}


const deleteAssetById = async (req, res) => {

    const deleteData = await Asset.findByIdAndDelete(req.params.id)
        .then(response => console.log(response))
        .catch(err => console.log(err))
    res.send({ status: "ok", message: "deleted", })
}


export {
    fetchAsset, getAssetById, deleteAssetById, createNewAsset, updateAssetById
}