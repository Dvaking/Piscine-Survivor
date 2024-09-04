export type InsertEmployeeProps = {
  gender: string
  name: string
  surname: string
  id: number
  birth_date: string
};

export type GetEmployeesInformationProps = {
  birth_date: string
  gender: string
  id: number
  name: string
  surname: string
};