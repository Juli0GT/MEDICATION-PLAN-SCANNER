<template>
  <div class="results">
    <div class="results__header">
        <h1 v-text="headers.main"/>
        <div class="results__header__content" v-if="isHeaderContentDisplayed">
          <div class="results__header__content__patient">
            <h2 v-text="headers.patient" />
            <p v-text="patientName" />
            <p v-text="patientBirthDate" />
          </div>
          <div class="results__header__content__issuer">
            <h2 v-text="headers.issuer" />
            <p v-text="issuerState.name" />
            <p v-text="issuerState.email" />
            <p v-text="issuerState.street" />
            <p v-text="issuerState.zipCode" />
            <p v-text="issuerState.city" />
          </div>
        </div>
        <h2 v-else v-text="headers.noResults" />
    </div>
    <div class="results__medications" v-if="isMedicationsDisplayed">
    <h2 v-text="headers.medications" />
      <table
        class="results__medications__table"
        v-for="medicationGroup in medicationsState"
        :key="medicationGroup"
      >
        <tr>
          <th v-for="column in columnLabels" :key="column" v-text="column"/>
        </tr>
        <tr v-for="medication in medicationGroup.medications" :key="medication">
          <td v-text="renderCell(medication.pharmacyCode)" />
          <td v-text="renderCell(medication.morningDosing)" />
          <td v-text="renderCell(medication.middayDosing)" />
          <td v-text="renderCell(medication.eveningDosing)" />
          <td v-text="renderCell(medication.nightDosing)" />
          <td v-text="renderCell(medication.reason)" />
          <td v-text="renderCell(medication.notes)" />
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onUnmounted } from 'vue';
import moment from 'moment';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/action-types';
import type { StringOrUndefined } from '@/store/state-types';
import { EMPTY_CELL } from '@/constants';

export default defineComponent({
  name: 'ResultsView',
  setup() {
    const store = useStore();

    const patientState = computed(() => store.state.patient);
    const issuerState = computed(() => store.state.issuer);
    const medicationsState = computed(() => store.state.medications);
    const subString = (value: string) => value.length > 16 ? `${value.substring(0, 15)}...` : value;

    onUnmounted(() => {
      store.dispatch(ActionTypes.RESET_MEDICATION_PLAN);
    });

    return {
      columnLabels: [
        'CODE',
        'MORNING',
        'AFTERNOON',
        'EVENING',
        'NIGHT',
        'TREATMENT REASON',
        'DOCTOR NOTES',
      ],
      headers: {
        main: 'Medication Plan',
        patient: 'Patient',
        issuer: 'Issued By',
        medications: 'Medications',
        noResults: 'You have no results to display: Go back to Scan',
      },
      isHeaderContentDisplayed:
        computed(() => patientState.value !== null || issuerState.value !== null),
      isMedicationsDisplayed: computed(() => medicationsState.value.length > 0),
      patientName: computed(() => `${patientState.value?.name} ${patientState.value?.surename}`),
      patientBirthDate: computed(() => moment(patientState.value?.birthDate).format('LL')),
      patientState,
      issuerState,
      medicationsState,
      renderCell: (value: StringOrUndefined) => value === undefined ? EMPTY_CELL : subString(value),
    };
  },
});
</script>

<style lang="scss">
.results {
  padding: 1.5rem;
  &__header {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    &__content {
      display: flex;
      justify-content: space-between;
      padding-left: 1rem;
      align-items: flex-end;
      &__patient {
        bottom: 0;
        text-align: left;
      }
      &__issuer {
        text-align: right;
      }
    }
  }
  &__medications {
    border: 1px solid #000000;
    &__table {
      width: 100%;
      th, td {
        text-align: left;
        padding: 0.25em;
      }
      tr {
        border-bottom: 1px solid #DDD;
      }
    }
  }
}
</style>
