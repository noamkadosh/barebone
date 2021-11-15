export class AppError extends Error {
	constructor(
		public status: number,
		public message: string,
		public data?: Object
	) {
		super(message);
		this.status = status;
		this.message = message;
	}
}
