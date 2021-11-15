import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Redis from 'ioredis';
import { join } from 'path';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { GraphQLError } from 'graphql';
import { loadSchema } from '@graphql-tools/load';
import { BaseRedisCache } from 'apollo-server-cache-redis';

import { resolvers } from './resolvers/resolvers';
import dispenserRoutes from './routes/dispenser';
import errorMiddleware from './middleware/error';
import Tickets from './data/Tickets';
import { Ticket } from './models/ticket';

const main = async () => {
	const app = express();

	app.use(cors());

	app.use(
		express.urlencoded({
			extended: false
		})
	);
	app.use(express.json());

	app.use(dispenserRoutes);

	app.use(errorMiddleware);

	try {
		await mongoose.connect(
			'mongodb://' +
				process.env.MONGODB_USERNAME +
				':' +
				process.env.MONGODB_PASSWORD +
				'@mongodb:27017/database?authSource=admin'
		);
		console.log('MongoDB connected...');
		const schema = await loadSchema(
			join(__dirname, './schemas/schema.graphql'),
			{
				loaders: [new GraphQLFileLoader()]
			}
		);
		const graphqlServer = new ApolloServer({
			schema,
			resolvers,
			// can add auth status with context.
			// context: ,
			dataSources: () => ({
				ticket: new Tickets(Ticket)
			}),
			cache: new BaseRedisCache({
				client: new Redis({
					port: 6379,
					host: 'redis',
					password: process.env.REDIS_PASSWORD
				})
			}),
			formatError: (err: GraphQLError) => {
				if (!err.originalError) {
					return err;
				}

				const error = err.originalError;
				return error;
			}
		});
		await graphqlServer.start();
		graphqlServer.applyMiddleware({
			app,
			path: '/graphql'
		});
		console.log('GraphQL running...');
		// app.listen(process.env.PORT, () =>
		app.listen(process.env.PORT, () =>
			console.log('Server listening on port ' + process.env.PORT + '...')
		);
	} catch (error) {
		console.log(error);
	}
};

main();
