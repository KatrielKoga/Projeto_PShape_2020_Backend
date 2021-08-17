require('dotenv').config();

module.exports = {
	client: 'mysql2',
	connection: {
		host: process.env.HOST,
		database: process.env.DATABASE,
		user: process.env.USER,
		password: process.env.PASSWORD,
		timezone: 'local',
		dateStrings: true,
	},
	pool: {
		min: 2,
		max: 10,
	},
	migrations: {
		directory: './src/database/migrations',
	},
	useNullAsDefault: true,
};
