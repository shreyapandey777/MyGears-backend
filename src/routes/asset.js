import express from 'express'
import { createNewAsset, deleteAssetById, fetchAsset, getAssetById, updateAssetById } from '../controller/asset.js';

const assetRouter = express.Router();

assetRouter.get("/", fetchAsset);
assetRouter.get("/:id",getAssetById)
assetRouter.delete("/:id",deleteAssetById)
assetRouter.post("/",createNewAsset)
assetRouter.patch("/:id",updateAssetById)

export default assetRouter
