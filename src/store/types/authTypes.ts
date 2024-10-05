export interface RegisterInputs {
  email: string;
  name: string;
  number: string;
  password: string;
  confirmPassword: string;
}

export interface LoginInputs {
  email: string;
  password: string;
}

export interface Response {
  token: string;
}

export interface Usern {
  id: string;
  email: string;
  name: string;
  number: string;
  password: string;
  confirmPassword: string;
}
