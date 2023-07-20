import { ContainerModule, interfaces } from "inversify";

import { IoCTypes } from "../../infrastructure";

import { ITagController } from "./interfaces/ITagController";
import { ITagRepository } from "./interfaces/ITagRepository";
import { ITagService } from "./interfaces/ITagService";
import { TagController } from "./TagController";
import { TagRepository } from "./TagRepository";
import { TagService } from "./TagService";

export const tagContainer = new ContainerModule((bind: interfaces.Bind) => {
	bind<ITagController>(IoCTypes.TagController).to(TagController);
	bind<ITagService>(IoCTypes.TagService).to(TagService);
	bind<ITagRepository>(IoCTypes.TagRepository).to(TagRepository);
});
