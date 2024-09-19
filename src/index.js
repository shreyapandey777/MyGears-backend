import express from 'express'
import cors from 'cors'
import "./model/db.js";
import assetRouter from './routes/asset.js';
import ticketRouter from './routes/ticket.js';


const app = express()
app.use(cors())
app.use(express.json())


app.use("/assets", assetRouter)
app.use("/tickets", ticketRouter)
// app.use("/ticket", ticketRouter)

const port = process.env.port || 5000

app.listen(port, () => {
    console.log(`server at http://localhost:${port}`);
})