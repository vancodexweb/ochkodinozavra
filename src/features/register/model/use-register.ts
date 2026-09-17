'use client';

import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../../shared/api';
import { Gender } from '../../../entities/person';

export interface RegisterInput {
  email: string;
  password: string;
  passwordConfirmation: string;
  lastName: string;
  firstName: string;
  middleName?: string;
  birthDate: string;
  gender: Gender;
  birthPlace: string;
  passportIssuedBy: string;
  passportIssueDate: string;
  passportSubdivisionCode: string;
  countryOfResidence: string;
  countryOfRegistration: string;
  cityOfRegistration: string;
  street: string;
  registrationDate: string;
}

export interface RegisterFiles {
  passportMainPhoto: File;
  passportRegistrationPhoto: File;
  facePhoto: File;
}

function toFormData(input: RegisterInput, files: RegisterFiles): FormData {
  const formData = new FormData();
  for (const [key, value] of Object.entries(input)) {
    if (value !== undefined && value !== '') {
      formData.set(key, value);
    }
  }
  formData.set('passportMainPhoto', files.passportMainPhoto);
  formData.set('passportRegistrationPhoto', files.passportRegistrationPhoto);
  formData.set('facePhoto', files.facePhoto);
  return formData;
}

export function useRegister() {
  return useMutation({
    mutationFn: ({ input, files }: { input: RegisterInput; files: RegisterFiles }) =>
      apiClient.post<{ message: string }>('/api/auth/register', toFormData(input, files)),
  });
}
