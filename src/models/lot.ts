import { Schema, model, Document } from 'mongoose';

import { IUser } from './user';

export interface ILot extends Document {
	address: {
		street: string;
		city: string;
		state: string;
		zip: number;
	};
	owner: IUser;
	priceConfiguration: string;
}

const lotSchema = new Schema<ILot>({
	address: {
		street: {
			type: String,
			required: true
		},
		city: {
			type: String,
			required: true
		},
		state: {
			type: String,
			required: true
		},
		zip: {
			type: Number,
			required: true
		}
	},
	owner: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	priceConfiguration: {
		type: String,
		required: true
	}
});

export const Lot = model<ILot>('Location', lotSchema);

// note to self:
// creation date can be extracted from the auto generated _id property.
// timestamp = _id.toString().substring(0,8)
// createdAt = new Date( parseInt( timestamp, 16 ) * 1000 )
