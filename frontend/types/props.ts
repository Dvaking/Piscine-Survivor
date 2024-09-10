export type InsertEmployeeProps = {
  gender: string;
  name: string;
  surname: string;
  id: number;
  birth_date: string;
};

export type GetEmployeesProps = {
  uuid: string;
  id: number;
  name: string;
  surname: string;
  email: string;
  gender: string;
  birth_date: string;
  image: string;
  work: string;
};

export type GetEmployeesByUuidProps = {
  id: number;
  name: string;
  surname: string;
  astrological_sign: string;
  uuid: string;
};

export type InsertCustomerProps = {
  id: number;
  name: string;
  surname: string;
  astrological_sign: string;
};

export type GetCustomersProps = {
  uuid: string;
  id: number;
  name: string;
  surname: string;
  astrological_sign: string;
  birth_date: string;
  description: string;
  email: string;
  employee_uuid: string;
  gender: string;
  image: string;
  phone_number: string;
  address: string;
};

export type GetCustomersByUuidProps = {
  id: number;
  name: string;
  surname: string;
  email: string;
  employee_uuid: string;
  image: string;
  phone_number: string;
};

export type GetCustomersProfileByUuidProps = {
  uuid: string;
  name: string;
  surname: string;
  astrological_sign: string;
  birth_date: string;
  description: string;
  email: string;
  employee_uuid?: string;
  gender: string;
  image?: string;
  phone_number: string;
  address: string;
  encounters: [
    {
      id: number;
      source: string;
      rating: number;
      date: string;
      comment: string;
    }
  ];
};

export type UpdateEmployeeProps = {
  uuid: string;
  birth_date: string;
  email: string;
  gender: string;
  image: string;
  name: string;
  surname: string;
  work: string;
};

export type GetClothesProps = {
  clothes: [
    {
      id: number;
      image: string;
      type: string;
    }
  ];
};

export type GetEmployeesByWorkProps = {
  name: string;
  image?: string;
  email?: string;
  events?: { name?: string }[];
  birth_date?: string;
  gender?: string;
  surname?: string;
  work?: string;
  uuid?: string;
};

export type GetCoachNameByUuidProps = {
  name: string;
  surname: string;
};