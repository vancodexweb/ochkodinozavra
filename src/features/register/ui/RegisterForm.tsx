'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Alert, Button, FormField, Input } from '../../../shared/ui';
import { ApiError } from '../../../shared/api';
import { ROUTES } from '../../../shared/config';
import { Gender } from '../../../entities/person';
import { useRegister, type RegisterFiles, type RegisterInput } from '../model/use-register';
import styles from './RegisterForm.module.css';

const INITIAL_INPUT: RegisterInput = {
  email: '',
  password: '',
  passwordConfirmation: '',
  lastName: '',
  firstName: '',
  middleName: '',
  birthDate: '',
  gender: Gender.MALE,
  birthPlace: '',
  passportIssuedBy: '',
  passportIssueDate: '',
  passportSubdivisionCode: '',
  countryOfResidence: '',
  countryOfRegistration: '',
  cityOfRegistration: '',
  street: '',
  registrationDate: '',
};

export function RegisterForm() {
  const [input, setInput] = useState<RegisterInput>(INITIAL_INPUT);
  const [files, setFiles] = useState<Partial<RegisterFiles>>({});
  const router = useRouter();
  const register = useRegister();

  function setField<K extends keyof RegisterInput>(key: K) {
    return (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setInput((current) => ({ ...current, [key]: event.target.value }));
    };
  }

  function setFile(key: keyof RegisterFiles) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      setFiles((current) => ({ ...current, [key]: file }));
    };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!files.passportMainPhoto || !files.passportRegistrationPhoto || !files.facePhoto) {
      return;
    }

    register.mutate(
      { input, files: files as RegisterFiles },
      {
        onSuccess: () => {
          router.push(`${ROUTES.verifyEmail}?email=${encodeURIComponent(input.email)}`);
        },
      },
    );
  }

  const errorMessage =
    register.error instanceof ApiError
      ? register.error.message
      : register.error
        ? 'Something went wrong'
        : null;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {errorMessage ? <Alert tone="error">{errorMessage}</Alert> : null}

      <div className={styles.sectionTitle}>Account</div>
      <div className={styles.grid}>
        <FormField label="Email" htmlFor="reg-email">
          <Input id="reg-email" type="email" required value={input.email} onChange={setField('email')} />
        </FormField>
        <div />
        <FormField label="Password" htmlFor="reg-password" hint="At least 10 characters, mixed case + digit">
          <Input
            id="reg-password"
            type="password"
            required
            value={input.password}
            onChange={setField('password')}
          />
        </FormField>
        <FormField label="Confirm password" htmlFor="reg-password-confirm">
          <Input
            id="reg-password-confirm"
            type="password"
            required
            value={input.passwordConfirmation}
            onChange={setField('passwordConfirmation')}
          />
        </FormField>
      </div>

      <div className={styles.sectionTitle}>Personal data</div>
      <div className={styles.grid}>
        <FormField label="Last name" htmlFor="reg-last-name">
          <Input id="reg-last-name" required value={input.lastName} onChange={setField('lastName')} />
        </FormField>
        <FormField label="First name" htmlFor="reg-first-name">
          <Input id="reg-first-name" required value={input.firstName} onChange={setField('firstName')} />
        </FormField>
        <FormField label="Middle name" htmlFor="reg-middle-name" hint="Optional">
          <Input id="reg-middle-name" value={input.middleName} onChange={setField('middleName')} />
        </FormField>
        <FormField label="Gender" htmlFor="reg-gender">
          <select id="reg-gender" className={styles.select} value={input.gender} onChange={setField('gender')}>
            <option value={Gender.MALE}>Male</option>
            <option value={Gender.FEMALE}>Female</option>
          </select>
        </FormField>
        <FormField label="Birth date" htmlFor="reg-birth-date">
          <Input
            id="reg-birth-date"
            type="date"
            required
            value={input.birthDate}
            onChange={setField('birthDate')}
          />
        </FormField>
        <FormField label="Birth place" htmlFor="reg-birth-place">
          <Input id="reg-birth-place" required value={input.birthPlace} onChange={setField('birthPlace')} />
        </FormField>
      </div>

      <div className={styles.sectionTitle}>Passport</div>
      <div className={styles.grid}>
        <FormField label="Issued by" htmlFor="reg-passport-issued-by">
          <Input
            id="reg-passport-issued-by"
            required
            value={input.passportIssuedBy}
            onChange={setField('passportIssuedBy')}
          />
        </FormField>
        <FormField label="Issue date" htmlFor="reg-passport-issue-date">
          <Input
            id="reg-passport-issue-date"
            type="date"
            required
            value={input.passportIssueDate}
            onChange={setField('passportIssueDate')}
          />
        </FormField>
        <FormField label="Subdivision code" htmlFor="reg-passport-subdivision-code">
          <Input
            id="reg-passport-subdivision-code"
            required
            placeholder="770-001"
            value={input.passportSubdivisionCode}
            onChange={setField('passportSubdivisionCode')}
          />
        </FormField>
      </div>

      <div className={styles.sectionTitle}>Address</div>
      <div className={styles.grid}>
        <FormField label="Country of residence" htmlFor="reg-country-residence">
          <Input
            id="reg-country-residence"
            required
            value={input.countryOfResidence}
            onChange={setField('countryOfResidence')}
          />
        </FormField>
        <FormField label="Country of registration" htmlFor="reg-country-registration">
          <Input
            id="reg-country-registration"
            required
            value={input.countryOfRegistration}
            onChange={setField('countryOfRegistration')}
          />
        </FormField>
        <FormField label="City of registration" htmlFor="reg-city-registration">
          <Input
            id="reg-city-registration"
            required
            value={input.cityOfRegistration}
            onChange={setField('cityOfRegistration')}
          />
        </FormField>
        <FormField label="Street" htmlFor="reg-street">
          <Input id="reg-street" required value={input.street} onChange={setField('street')} />
        </FormField>
        <FormField label="Registration date" htmlFor="reg-registration-date">
          <Input
            id="reg-registration-date"
            type="date"
            required
            value={input.registrationDate}
            onChange={setField('registrationDate')}
          />
        </FormField>
      </div>

      <div className={styles.sectionTitle}>Documents</div>
      <div className={styles.grid}>
        <FormField label="Passport main page photo" htmlFor="reg-passport-main-photo">
          <input
            id="reg-passport-main-photo"
            className={styles.fileInput}
            type="file"
            accept="image/*,application/pdf"
            required
            onChange={setFile('passportMainPhoto')}
          />
        </FormField>
        <FormField label="Passport registration page photo" htmlFor="reg-passport-registration-photo">
          <input
            id="reg-passport-registration-photo"
            className={styles.fileInput}
            type="file"
            accept="image/*,application/pdf"
            required
            onChange={setFile('passportRegistrationPhoto')}
          />
        </FormField>
        <FormField label="Face photo" htmlFor="reg-face-photo">
          <input
            id="reg-face-photo"
            className={styles.fileInput}
            type="file"
            accept="image/*"
            required
            onChange={setFile('facePhoto')}
          />
        </FormField>
      </div>

      <Button type="submit" fullWidth loading={register.isPending}>
        Create account
      </Button>

      <div className={styles.footer}>
        <span>Already registered?</span>
        <Link href={ROUTES.login}>Sign in</Link>
      </div>
    </form>
  );
}
