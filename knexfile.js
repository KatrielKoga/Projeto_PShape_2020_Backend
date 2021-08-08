module.exports = {
	client: 'mysql',
	connection: {
		database: process.env.DATABASE,
		user: process.env.USER,
		password: process.env.PASSWORD,
		timezone: 'UTC',
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
