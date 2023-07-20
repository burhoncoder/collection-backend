import { NextFunction, Request, Response } from "express";

export interface ICollectionController {
	create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	delete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getAll: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getSingle: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
