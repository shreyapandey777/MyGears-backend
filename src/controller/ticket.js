import Ticket from "../model/ticket.js";

const fetchTicket = async (req, res) => {
    try {
        const ticketData = await Ticket.find({})
        res.status(200).send(ticketData)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const fetchTicketById = async (req, res) => {
    try {
        const ticketData = await Ticket.findById(req.params.id)
        res.status(200).json(ticketData)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const fetchTicketStatus = async (req, res) => {
    try {
        const ticketStatus = await Ticket.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    status: "$_id",
                    count: 1
                }
            },
            {
                $sort: { status: 1 }
            }
        ])
        let ticketStatusList={
            inprogress:0,
            resolved:0,
            open:0
        }
        for(const ticket of ticketStatus){
            console.log(ticket.count);
            if(ticket.status==='Open') ticketStatusList.open=ticket.count;
            if(ticket.status==='Resolved') ticketStatusList.resolved=ticket.count;
            if(ticket.status==='In-Progress')ticketStatusList.inprogress=ticket.count;
        }
        res.status(200).json(ticketStatusList)
    }
    catch (error) {
        console.error(error);
    }
}

const raiseTicket = async (req, res) => {
    try {
        const newTicketData = req.body.values
        console.log(newTicketData);
        const newTicketObject = new Ticket({ ...newTicketData })
        const saveTicket = await newTicketObject.save()
        res.status(201).json({ message: "Success", saveTicket })
    } catch (error) {
        console.error('Error raising ticket:', error);
        if (error.code === 11000) {
            return res.status(409).json({ error: 'Duplicate key error', details: 'AssetID or TicketID already exists' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateTicket = async (req, res) => {
    try {
        const data = req.body.values
        const id = req.params.id
        console.log(data);
        const updateTicketData = await Ticket.findByIdAndUpdate({ _id: id }, data, { new: true, upsert: true })
        res.status(204).json({ message: 'Ticket Updated Successfully', updateTicketData })
    } catch (error) {
        console.log('Error in Updating Ticket0:', error);
    }
}

const updateTicketStatusById = async (req, res) => {
    try {
        const data = req.body.values
        console.log(data);
        const updateTicketStatus = await Ticket.findByIdAndUpdate({ _id: req.params.id }, data, { new: true, upsert: true })
        res.status(204).json({ message: "Status Updated Succesfully", updateTicketStatus })

    } catch (error) {
        console.error('Error updating ticket:', error);
    }
}

const deleteTicketById = async (req, res) => {
    try {
        const deleteTicket = await Ticket.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Successfully Deleted", deleteTicket })
    } catch (error) {
        console.error('Error creating ticket:', error);
        // if (error.code === 11000) {
        //     return res.status(409).json({ error: 'Duplicate key error', details: 'AssetId or SerialNo already exists' });
        // }
        res.status(500).json({ error: 'Internal server error' });
    }
}

export {
    fetchTicket, raiseTicket, deleteTicketById, updateTicketStatusById, fetchTicketById, updateTicket, fetchTicketStatus
}