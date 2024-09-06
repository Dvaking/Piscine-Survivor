export type InsertEmployeeProps = {
  gender: string;
  name: string;
  surname: string;
  id: number;
  birth_date: string;
};

export type GetEmployeesInformationProps = {
  birth_date: string;
  gender: string;
  id: number;
  name: string;
  surname: string;
};

export type GetEmployeesInformationByUuidProps = {
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

export type GetCustomersInformationProps = {
  id: number;
  name: string;
  surname: string;
  astrological_sign: string;
};

export type GetCustomersInformationByUuidProps = {
  id: number;
  name: string;
  surname: string;
  astrological_sign: string;
  uuid: string;
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
  clothes: [{
    clothe_id: number;
    image: string;
    type: string;
  }]
}

export type GetEmployeesInformationByWorkProps = {
  name: string;
  image: string;
  email: string;
}