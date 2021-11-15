import { Request, Response, NextFunction } from 'express';

import { AppError } from '../models/error';

export = (error: AppError, req: Request, res: Response, next: NextFunction) => {
	console.log(error);
	res.status(error.status).json(error);
};
