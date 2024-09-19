import express from "express";
import { deleteTicketById, fetchTicket, fetchTicketById, fetchTicketStatus, raiseTicket, updateTicket, updateTicketStatusById } from "../controller/ticket.js";

const ticketRouter = express.Router();

ticketRouter.get('/',fetchTicket)
ticketRouter.get('/status/',fetchTicketStatus)
ticketRouter.get('/:id',fetchTicketById)
ticketRouter.post('/',raiseTicket)
ticketRouter.delete('/:id',deleteTicketById)
ticketRouter.patch('/:id',updateTicketStatusById)
ticketRouter.patch('/:id',updateTicket)


export default ticketRouter