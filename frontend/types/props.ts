export type InsertEmployeeProps = {
  name: string;
  surname: string;
  gender: string;
  birth_date: string;
  email: string;
  work: string;
  id: number;
};

export type ResponseInsertEmployeeProps = {
  uuid: string;
  email: string;
  work: string;
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
  payments_history: [
    {
      id: number;
      amount: number;
      comment: string;
      date: string;
      payment_method: string;
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

export type GetEmployeesAssignedCustomersProps = {
  name: string;
  customers_assign: [
    {
      name: string;
    }
  ];
};

export type GetCustomersNameProps = {
  name: String
};

export type GetEmployeesNameByWorkProps = {
  name: string;
}

export type GetEventsProps = {
  name: string;
  type: string;
  date: string;
  duration: string;
  location_x: string;
  location_y: string;
}

export type GetTipsProps = {
  tip: string;
  title: string;
  id: number;
};

export interface GetEmployeeTableInformationProps {
  id: number;
  email: string;
  name: string;
  surname: string;
  uuid: string;
  work: string;
  image: string;
  customer_assign_aggregate: {
    aggregate: {
      count: number;
    };
  };
}

export interface HowManyEmployeesProps {
  aggregate: {
    count: 48
  }
}

export interface GetCustomersUnassignedProps {
  uuid: string;
  name: string;
  surname: string;
}

export type GetEncountersProps = {
  source: string;
};
