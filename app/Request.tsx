"use client";
import { useEffect, useState } from 'react';
import { client } from '../backend/graphql-request';
import { getUsersGlobalInfomation } from '../backend/request/users/Get';


interface Employee {
  name: string;
  email: string;
}

export default function Employee() {
  const [users, setUsers] = useState<Employee[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await client.request(getUsersGlobalInfomation);
        console.log(data);
        setUsers(data.users);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Employees List</h1>
      <ul>
        {users ? users.map(employee => (
          <li key={employee.email}>
            {employee.name} - {employee.email}
          </li>
        )) : "Il n'y a rien" }
      </ul>
    </div>
  );
};

