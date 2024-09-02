"use client";
import { useEffect, useState } from 'react';
import { client } from './graphql-request';
import { gql } from 'graphql-request';

const GET_EMPLOYEES = gql`
  query {
    employees {
      id
      name
    }
  }
`;

interface Employee {
  id: number;
  name: string;
}

export default function Employee() {
  const [employees, setEmployees] = useState<Employee[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await client.request(GET_EMPLOYEES);
        setEmployees(data.employees);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Employees List</h1>
      <ul>
        {employees ? employees.map(employee => (
          <li key={employee.id}>
            {employee.name} - {employee.id}
          </li>
        )) : "Il n'y a rien" }
      </ul>
    </div>
  );
};

