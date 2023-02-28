export type StringOrUndefined = string | undefined

export type Patient = {
  name: string,
  surename: string,
  birthDate: string,
} | null

export type Issuer = {
  name: string,
  street: StringOrUndefined,
  zipCode: StringOrUndefined,
  city: StringOrUndefined,
  phone: StringOrUndefined,
  email: StringOrUndefined,
  issueDate: string,
} | null

export type Medication = {
  pharmacyCode: StringOrUndefined,
  drugName: StringOrUndefined,
  morningDosing: StringOrUndefined,
  middayDosing: StringOrUndefined,
  nightDosing: StringOrUndefined,
  dosingUnit: StringOrUndefined,
  reason: StringOrUndefined,
  eveningDosing: StringOrUndefined,
  notes: StringOrUndefined,
  dosingText: StringOrUndefined,
} | null

export type MedicationsWithHeader = {
  header: StringOrUndefined,
  code: StringOrUndefined
  medications: Medication[]
}[]

export type State = {
  patient: Patient,
  issuer: Issuer,
  medications: MedicationsWithHeader,
}
