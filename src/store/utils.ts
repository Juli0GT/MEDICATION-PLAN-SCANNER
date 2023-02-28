import { Medication, Issuer, Patient } from './action-types';
import type {
  Issuer as IssuerState,
  Medication as MedicationState,
  Patient as PatientState,
} from './state-types';

export const translateMedicationKeys = (payload: Medication): NonNullable<MedicationState> => {
  const {
    p: pharmacyCode,
    a: drugName,
    m: morningDosing,
    d: middayDosing,
    v: eveningDosing,
    h: nightDosing,
    t: dosingText,
    du: dosingUnit,
    i: notes,
    r: reason,
  } = payload.$;

  return {
    pharmacyCode,
    drugName,
    morningDosing,
    middayDosing,
    eveningDosing,
    nightDosing,
    dosingText,
    dosingUnit,
    notes,
    reason,
  };
};

export const translateIssuerKeys = (payload: Issuer): NonNullable<IssuerState> => {
  const {
    n: name,
    z: zipCode,
    s: street,
    c: city,
    p: phone,
    e: email,
    t: issueDate,
  } = payload.$;

  return {
    name,
    zipCode,
    street,
    city,
    phone,
    email,
    issueDate,
  };
};

export const translatePatientKeys = (payload: Patient): NonNullable<PatientState> => {
  const { g: name, f: surename, b: birthDate } = payload.$;

  return {
    name,
    surename,
    birthDate,
  };
};
