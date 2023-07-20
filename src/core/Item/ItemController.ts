import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

import { AccessMiddleware, BaseController, IoCTypes, ValidateMiddleware } from "../../infrastructure";

import { ItemCreateDto } from "./dto/ItemCreateDto";
import { ItemUpdateDto } from "./dto/ItemUpdateDto";
import { IItemController } from "./interfaces/IItemController";
import { ItemService } from "./ItemService";

@injectable()
export class ItemController extends BaseController implements IItemController {
	constructor(@inject(IoCTypes.ItemService) private service: ItemService) {
		super();
		this.bindRoutes([
			{
				path: "/",
				method: "get",
				handler: this.getAll,
			},
			{
				path: "/",
				method: "post",
				handler: this.create,
				middlewares: [new AccessMiddleware(), new ValidateMiddleware(ItemCreateDto)],
			},
			{
				path: "/:id",
				method: "put",
				handler: this.update,
				middlewares: [new AccessMiddleware(), new ValidateMiddleware(ItemUpdateDto)],
			},
			{
				path: "/:id",
				method: "delete",
				handler: this.delete,
				middlewares: [new AccessMiddleware()],
			},
		]);
	}

	create(req: Request, res: Response, next: NextFunction): Promise<void> {
		return Promise.resolve(undefined);
	}

	delete(req: Request, res: Response, next: NextFunction): Promise<void> {
		return Promise.resolve(undefined);
	}

	getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		return Promise.resolve(undefined);
	}

	getSingle(req: Request, res: Response, next: NextFunction): Promise<void> {
		return Promise.resolve(undefined);
	}

	update(req: Request, res: Response, next: NextFunction): Promise<void> {
		return Promise.resolve(undefined);
	}
}
