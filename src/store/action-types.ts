export enum ActionTypes {
  INIT_SET_MEDICATION_PLAN = 'initSetMedicationPlan',
  RESET_MEDICATION_PLAN = 'resetMedicationPlan',
  SET_PATIENT = 'setPatient',
  SET_ISSUER = 'setIssuer',
  SET_MEDICATIONS = 'setMedications',
}

type Attributes = {
  v: string,
  U: string,
  a?: string,
  z?: string,
  l: string,
}

export type Patient = {
  $: {
    g: string,
    f: string,
    egk?: string,
    b: string,
    s?: string,
    t?: string,
    v?: string,
    z?: string,
  }
}

export type Issuer = {
  $: {
    lanr?: string,
    idf?: string,
    klk: string,
    n: string,
    s?: string,
    z?: string,
    c?: string,
    p?: string,
    e?: string,
    t: string,
  }
}

type Parameters = {
  ai?: string,
  p?: string,
  b?: string,
  w?: string,
  h: string,
  c: string,
  x: string,
}

type ActiveSubstance = {
  w: string,
  s?: string,
}

export type Medication = {
  $: {
    p?: string,
    a?: string,
    f?: string,
    fd?: string,
    m?: string,
    d?: string,
    v?: string,
    h?: string,
    t?: string,
    du?: string,
    dud?: string,
    i?: string,
    r?: string,
    x?: string,
  }
  W?: ActiveSubstance
}

type FreeText = {
  $: {
    t: string,
    x?: string,
  }
}

type Prescription = {
  $: {
    t: string

  }
}

export type MedicationsGroup = {
  $?: {
    t?: string,
    c?: string,
  }
  M: Medication | Medication[]
  X?: FreeText
  R?: Prescription
}

export type MedicationPlan = {
  $: Attributes,
  P: Patient,
  A: Issuer,
  O?: Parameters,
  S?: MedicationsGroup[]
}
