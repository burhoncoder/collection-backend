export const IoCTypes = {
	Application: Symbol.for("Application"),
	DbService: Symbol.for("DbService"),
	ExceptionFilter: Symbol.for("ExceptionFilter"),

	UserController: Symbol.for("UserController"),
	UserService: Symbol.for("UserService"),
	UserRepository: Symbol.for("UserRepository"),

	TagController: Symbol.for("TagController"),
	TagService: Symbol.for("TagService"),
	TagRepository: Symbol.for("TagRepository"),

	CollectionController: Symbol.for("CollectionController"),
	CollectionService: Symbol.for("CollectionService"),
	CollectionRepository: Symbol.for("CollectionRepository"),

	ItemController: Symbol.for("ItemController"),
	ItemService: Symbol.for("ItemService"),
	ItemRepository: Symbol.for("ItemRepository"),

	IsBlockedMiddleware: Symbol.for("IsBlockedMiddleware"),
};
