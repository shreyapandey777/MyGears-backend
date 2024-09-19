import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    ticketId:{
        type:String,
        unique:true
    },
    assetId:{
        type:String,
        unique:true
    },
    issueDescription:{
        type:String,
    },
    status:{
        type:String
    },
    date:{
        type:String
    }
})

const Ticket = mongoose.model('ticket',ticketSchema)

export default Ticket