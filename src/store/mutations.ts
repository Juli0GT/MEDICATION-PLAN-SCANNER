import { MutationTree } from 'vuex';
import type {
  State, Patient, Issuer, MedicationsWithHeader,
} from './state-types';
import { MutationTypes } from './mutation-types';

export type Mutations<S = State> = {
  [MutationTypes.SET_PATIENT](state: S, payload: Patient): void
  [MutationTypes.SET_ISSUER](state: S, payload: Issuer): void
  [MutationTypes.SET_MEDICATIONS](state: S, payload: MedicationsWithHeader): void
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_PATIENT](state, payload: Patient) {
    state.patient = payload;
  },
  [MutationTypes.SET_ISSUER](state, payload: Issuer) {
    state.issuer = payload;
  },
  [MutationTypes.SET_MEDICATIONS](state, payload: MedicationsWithHeader) {
    state.medications = payload;
  },
};
