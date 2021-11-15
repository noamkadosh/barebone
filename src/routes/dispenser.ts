import express from 'express';

import * as dispenserController from '../controllers/dispenser';

const router = express.Router();

router.post('/create-ticket', dispenserController.createTicket);

router.post('/validate-ticket', dispenserController.validateTicket);

export default router;
