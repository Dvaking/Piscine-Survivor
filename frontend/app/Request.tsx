"use client";
import React, { useEffect, useState } from 'react';
import { GetEmployeesInformationProps } from '@backend';
import { getEmployeesInformation } from '@components';

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<GetEmployeesInformationProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployeesInformation();
        setEmployees(data);
      } catch (err) {
        setError('Erreur lors de la récupération des employés.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  console.log(employees);

  if (loading) return <p>Chargement des employés...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Liste des Employés</h1>
      <ul>
        {employees ? employees.map((employee) => (
          <li key={employee.id.toString()}>
            {employee.name} - {employee.surname}
          </li>
        )): "Aucun employé trouvé."}
      </ul>
    </div>
  );
};

export default EmployeeList;
