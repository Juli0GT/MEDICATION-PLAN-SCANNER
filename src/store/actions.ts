import { ActionTree, ActionContext } from 'vuex';
import { State } from './state-types';
import { ActionTypes } from './action-types';
import { MutationTypes } from './mutation-types';
import { Mutations } from './mutations';
import type {
  MedicationPlan, Patient, Issuer, MedicationsGroup, Medication,
} from './action-types';
import { translateMedicationKeys, translateIssuerKeys, translatePatientKeys } from './utils';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
  [ActionTypes.INIT_SET_MEDICATION_PLAN](
    { dispatch }: AugmentedActionContext,
    payload: MedicationPlan
  ): void
  [ActionTypes.RESET_MEDICATION_PLAN](
    { dispatch }: AugmentedActionContext,
  ): void
  [ActionTypes.SET_PATIENT](
    { commit }: AugmentedActionContext,
    payload: Patient
  ): void
  [ActionTypes.SET_ISSUER](
    { commit }: AugmentedActionContext,
    payload: Issuer
  ): void
  [ActionTypes.SET_MEDICATIONS](
    { commit }: AugmentedActionContext,
    payload: MedicationsGroup[]
  ): void
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.INIT_SET_MEDICATION_PLAN]({ dispatch }, payload: MedicationPlan) {
    const {
      S, P, A,
    } = payload;
    dispatch(ActionTypes.SET_PATIENT, P);
    dispatch(ActionTypes.SET_ISSUER, A);
    dispatch(ActionTypes.SET_MEDICATIONS, S);
  },
  [ActionTypes.RESET_MEDICATION_PLAN]({ commit }) {
    commit(MutationTypes.SET_PATIENT, null);
    commit(MutationTypes.SET_ISSUER, null);
    commit(MutationTypes.SET_MEDICATIONS, []);
  },
  [ActionTypes.SET_PATIENT]({ commit }, payload: Patient) {
    const patient = translatePatientKeys(payload);

    commit(MutationTypes.SET_PATIENT, patient);
  },
  [ActionTypes.SET_ISSUER]({ commit }, payload: Issuer) {
    const issuer = translateIssuerKeys(payload);

    commit(MutationTypes.SET_ISSUER, issuer);
  },
  [ActionTypes.SET_MEDICATIONS]({ commit }, payload: MedicationsGroup[]) {
    const medicationsWithHeader = payload.map((medicationGroup: MedicationsGroup) => {
      const { $, M } = medicationGroup;

      const medications = Array.isArray(M)
        ? M.map((medication: Medication) => translateMedicationKeys(medication))
        : Array(translateMedicationKeys(M));

      return {
        header: $?.t,
        code: $?.c,
        medications,
      };
    });

    commit(MutationTypes.SET_MEDICATIONS, medicationsWithHeader);
  },
};
