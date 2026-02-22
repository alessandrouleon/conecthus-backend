export class InputUpdateUserUseCaseDto {
  id: string;
  name: string;
  registration: string;
  email: string;
  password: string;
  isActive: boolean;
  createdAt?: Date;
  updatredAt?: Date;
}

export class OutputUpdateUserUseCaseDto {
  id: string;
  name: string;
  registration: string;
  email: string;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}
