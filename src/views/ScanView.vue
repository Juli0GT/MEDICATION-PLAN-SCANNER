<template>
  <div class="scan">
    <CodeScanner
      v-bind="{ aspectRatio, fps, qrWidth, qrHeight, isFlipDisabled, isVerbose }"
      @onScanSuccess="onScanSuccess"
      @onScanError="onScanError"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import xml2js from 'xml2js';

import CodeScanner from '@/components/CodeScanner.vue';
import { ActionTypes, MedicationPlan } from '@/store/action-types';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import {
  ASPECT_RATIO,
  FPS,
  QR_WIDTH,
  QR_HEIGHT,
} from '@/constants';

export default defineComponent({
  name: 'ScanView',
  components: {
    CodeScanner,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const dispatchAndPush = async (medicationPlan: MedicationPlan) => {
      try {
        await store.dispatch(ActionTypes.INIT_SET_MEDICATION_PLAN, medicationPlan);
        router.push('results');
      } catch (error) {
        console.error(error);
      }
    };

    const parseXML = (xml: string): void => {
      const parser = new xml2js.Parser({
        trim: true,
        explicitArray: false,
      });
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      parser.parseString(xml, (err: unknown, result: any) => {
        if (err === null && typeof result.MP !== 'undefined') {
          dispatchAndPush(result.MP);
        }
      });
    };

    const onScanSuccess = (decodedText: string) => {
      parseXML(decodedText);
    };

    const onScanError = (() => null);

    return {
      aspectRatio: ASPECT_RATIO,
      header: 'Welcome to MedScanner',
      fps: FPS,
      qrWidth: QR_WIDTH,
      qrHeight: QR_HEIGHT,
      isVerbose: false,
      isFlipDisabled: false,
      onScanError,
      onScanSuccess,
    };
  },
});
</script>
