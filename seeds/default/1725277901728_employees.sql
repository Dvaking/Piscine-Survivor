SET check_function_bodies = false;
INSERT INTO public.employees (id, name, email) VALUES (1, 'John', 'john.doe@hasura.io');
INSERT INTO public.employees (id, name, email) VALUES (2, 'Jane', 'jane.doe@hasura.io');
SELECT pg_catalog.setval('public.employees_id_seq', 2, true);
