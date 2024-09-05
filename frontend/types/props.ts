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
  birth_date: string;
  gender: string;
  id: number;
  name: string;
  surname: string;
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
