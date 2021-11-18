module.exports = [
	{
		"type": "postgres",
		"url": process.env.DB_DEV_ENV || process.env.DATABASE_URL,
		"ssl": {
			"rejectUnauthorized": false
		},
		"entities": [
			process.env.DATABASE_URL ?
				"./dist/modules/**/infra/typeorm/entities/*.js" : "./src/modules/**/infra/typeorm/entities/*.ts"
		],
		"migrations": [
			process.env.DATABASE_URL ?
				"./dist/modules/**/infra/typeorm/entities/*.js" : "./src/shared/infra/typeorm/migrations/*.ts"
		],
		"cli": {
			"migrationsDir": "./src/shared/infra/typeorm/migrations/"
		}
	}
]