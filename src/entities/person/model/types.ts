export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

/** Mirrors PersonProfile from the pro-auth backend (people module). */
export interface PersonProfile {
  id: string;
  userId: string;
  lastName: string;
  firstName: string;
  middleName: string | null;
  birthDate: string;
  gender: Gender;
  birthPlace: string;
  countryOfResidence: string;
  countryOfRegistration: string;
  cityOfRegistration: string;
  street: string;
  registrationDate: string;
}

/**
 * The backend also returns `passport`, which the MVP profile view has no
 * need to render - kept untyped here rather than modeled in detail.
 */
export interface PersonProfileResponse {
  profile: PersonProfile;
  passport: unknown;
}

export function fullName(profile: PersonProfile): string {
  return [profile.lastName, profile.firstName, profile.middleName].filter(Boolean).join(' ');
}
