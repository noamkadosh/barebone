import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ObjectId } from 'mongodb';
import { ITicket } from '../models/ticket';

// interface Context {
//   loggedInUser: TicketDocument
// }

// export default class Tickets extends MongoDataSource<ITicket, Context> {
export default class Tickets extends MongoDataSource<ITicket> {
	getTicket(ticketId: ObjectId) {
		// this.context has type `Context` as defined above
		// this.findOneById has type `(id: ObjectId) => Promise<UserDocument | null | undefined>`
		return this.findOneById(ticketId);
	}
}
