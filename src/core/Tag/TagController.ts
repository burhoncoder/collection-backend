import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

import { httpCodes } from "../../common";
import { AccessMiddleware, BaseController, IoCTypes, ValidateMiddleware } from "../../infrastructure";
import { HttpError } from "../../infrastructure/errors/http-error";

import { TagCreateDto } from "./dto/TagCreateDto";
import { TagUpdateDto } from "./dto/TagUpdateDto";
import { ITagController } from "./interfaces/ITagController";
import { ITagService } from "./interfaces/ITagService";

@injectable()
export class TagController extends BaseController implements ITagController {
	constructor(@inject(IoCTypes.TagService) private service: ITagService) {
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
				middlewares: [new AccessMiddleware(), new ValidateMiddleware(TagCreateDto)],
			},
			{
				path: "/:id",
				method: "put",
				handler: this.update,
				middlewares: [new AccessMiddleware(), new ValidateMiddleware(TagUpdateDto)],
			},
			{
				path: "/:id",
				method: "delete",
				handler: this.delete,
				middlewares: [new AccessMiddleware()],
			},
		]);
	}

	async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		const tags = await this.service.getTags();
		this.ok(res, "get", tags);
	}

	async create(req: Request<{}, {}, TagCreateDto>, res: Response, next: NextFunction): Promise<void> {
		await this.service.createTag(req.body);
		this.ok(res);
	}

	async update(req: Request, res: Response, next: NextFunction): Promise<void> {
		const updateDto: TagUpdateDto = { id: Number(req.params.id), name: req.body.name };
		const tag = await this.service.updateTag(updateDto);
		if (!tag) throw new HttpError("Tag not found", httpCodes.NOT_FOUND);

		this.ok(res, "update");
	}

	async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
		const tag = await this.service.deleteTag(Number(req.params.id));
		if (!tag) throw new HttpError("Tag not found", httpCodes.NOT_FOUND);

		return this.ok(res, "delete");
	}
}
