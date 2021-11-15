import { Schema, model, Document } from 'mongoose';

import { IUser } from './user';

export interface ITicket extends Document {
	isValidated: boolean;
	user: IUser;
}

const ticketSchema = new Schema<ITicket>(
	{
		isValidated: {
			type: Boolean,
			required: true
		},
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		}
	},
	{
		timestamps: {
			createdAt: 'createdAt'
		}
	}
);

export const Ticket = model<ITicket>('Ticket', ticketSchema);

// note to self:
// creation date can be extracted from the auto generated _id property.
// timestamp = _id.toString().substring(0,8)
// createdAt = new Date( parseInt( timestamp, 16 ) * 1000 )
