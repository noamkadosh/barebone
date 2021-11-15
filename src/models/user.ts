import { Schema, model, Document } from 'mongoose';

import { ITicket } from './ticket';
import { ILot } from './lot';

export interface IUser extends Document {
	email: string;
	password: string;
	tickets: ITicket[];
	hasLocations: boolean;
	locations: ILot[];
}

const userSchema = new Schema<IUser>({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	tickets: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Ticket'
		}
	],
	hasLocations: {
		type: Boolean,
		required: true
	},
	locations: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Location'
		}
	]
});

export const User = model<IUser>('User', userSchema);
