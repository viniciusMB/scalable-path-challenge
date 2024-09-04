const { PostgreSqlContainer } = require('@testcontainers/postgresql');
const { execSync } = require('child_process');
const path = require('path');
const { Client } = require('pg');

const backupPath = path.resolve(__dirname, 'backup.sql');

let container;
let client;

beforeAll(async () => {
  const postgreSqlContainer = new PostgreSqlContainer();
  container = await postgreSqlContainer.start();

  client = new Client({
    host: container.getHost(),
    port: container.getPort(),
    database: container.getDatabase(),
    user: container.getUsername(),
    password: container.getPassword(),
  });

  await client.connect();

  process.env.DATABASE_URL = `postgresql://${container.getUsername()}:${container.getPassword()}@${container.getHost()}:${container.getPort()}/${container.getDatabase()}?schema=public`;
}, 30000);

afterAll(async () => {
  await client.end();
  await container.stop();
});

afterEach(() => jest.clearAllMocks());

beforeEach(async () => {
  await client.query(`
    DO $$ DECLARE
    r RECORD;
    BEGIN
        FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
            EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
        END LOOP;

        FOR r IN (SELECT typname FROM pg_type WHERE typcategory = 'E' AND typname = 'PaymentStatus') LOOP
            EXECUTE 'DROP TYPE IF EXISTS ' || quote_ident(r.typname) || ' CASCADE';
        END LOOP;
    END $$;
  `);

  execSync('npx prisma migrate deploy', {
    env: {
      ...process.env,
    }
  });
}, 30000);