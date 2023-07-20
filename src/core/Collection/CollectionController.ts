import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

import { httpCodes } from "../../common";
import { AccessMiddleware, BaseController, IoCTypes, ValidateMiddleware } from "../../infrastructure";
import { HttpError } from "../../infrastructure/errors/http-error";

import { CollectionCreateDto } from "./dto/CollectionCreateDto";
import { CollectionUpdateDto } from "./dto/CollectionUpdateDto";
import { ICollectionController } from "./interfaces/ICollectionController";
import { ICollectionService } from "./interfaces/ICollectionService";

@injectable()
export class CollectionController extends BaseController implements ICollectionController {
	constructor(@inject(IoCTypes.CollectionService) private service: ICollectionService) {
		super();

		this.bindRoutes([
			{
				path: "/",
				method: "get",
				handler: this.getSingle,
			},
			{
				path: "/:id",
				method: "get",
				handler: this.getAll,
			},
			{
				path: "/",
				method: "post",
				handler: this.create,
				middlewares: [new ValidateMiddleware(CollectionCreateDto), new AccessMiddleware()],
			},
			{
				path: "/:id",
				method: "put",
				handler: this.update,
				middlewares: [new ValidateMiddleware(CollectionUpdateDto), new AccessMiddleware()],
			},
			{
				path: "/:id",
				method: "delete",
				handler: this.delete,
				middlewares: [new AccessMiddleware()],
			},
		]);
	}

	async create(req: Request<{}, {}, CollectionCreateDto>, res: Response, next: NextFunction): Promise<void> {
		await this.service.createCollection(req.body);
		this.ok(res, "create");
	}

	async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
		const deletedCollection = await this.service.deleteCollection(Number(req.params.id));

		if (!deletedCollection) throw new HttpError("Collection not found", httpCodes.NOT_FOUND);

		this.ok(res, "delete");
	}

	async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		const collections = await this.service.getCollections();

		this.ok(res, "get", collections);
	}

	async getSingle(req: Request, res: Response, next: NextFunction): Promise<void> {
		const collection = this.service.getCollection(Number(req.params.id));
		if (!collection) throw new HttpError("Not found", httpCodes.NOT_FOUND);
		this.ok(res, "get", collection);
	}

	async update(req: Request, res: Response, next: NextFunction): Promise<void> {
		const collection = await this.service.updateCollection(Number(req.params.id), req.body);

		if (!collection) throw new HttpError("Collection not found", httpCodes.NOT_FOUND);

		this.ok(res, "update");
	}
}
