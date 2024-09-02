CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);

INSERT INTO employees (name, email) VALUES ('John', 'john.doe@hasura.io');
INSERT INTO employees (name, email) VALUES ('Jane', 'jane.doe@hasura.io');
