<template>
  <div :id="QR_SCAN_ID"/>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, onUnmounted, ref,
} from 'vue';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { QR_SCAN_ID } from '../constants';

type CodeScannerProps = {
  aspectRatio: number,
  fps: number,
  isFlipDisabled: boolean,
  isVerbose: boolean,
  qrWidth: number,
  qrHeight: number,
}

export default defineComponent({
  name: 'CodeScanner',
  props: {
    aspectRatio: { required: true, type: Number },
    fps: { required: true, type: Number },
    isFlipDisabled: { required: true, type: Boolean },
    isVerbose: { required: true, type: Boolean },
    qrWidth: { required: true, type: Number },
    qrHeight: { required: true, type: Number },
  },
  setup(props: CodeScannerProps, { emit }) {
    const html5QrcodeScanner = ref<Html5QrcodeScanner | null>(null);

    const createConfig = () => ({
      aspectRatio: props.aspectRatio,
      fps: props.fps,
      qrBox: {
        width: props.qrWidth,
        height: props.qrHeight,
      },
    });

    const onScanSuccess = (decodedText: string) => emit('onScanSuccess', decodedText);

    const onScanError = (error: string) => emit('onScanError', error);

    const startScanner = () => {
      const config = createConfig();
      const verbose = props.isVerbose === true;
      html5QrcodeScanner.value = new Html5QrcodeScanner(QR_SCAN_ID, config, verbose);
      try {
        html5QrcodeScanner.value.render(onScanSuccess, onScanError);
      } catch (error) {
        console.error(error);
      }
    };

    const clearScanner = () => {
      if (html5QrcodeScanner.value === null) return;
      html5QrcodeScanner.value.clear().catch((error) => {
        console.error('Failed to clear html5QrcodeScanner. ', error);
      });
      html5QrcodeScanner.value = null;
    };

    onMounted(() => {
      startScanner();
    });

    onUnmounted(() => {
      clearScanner();
    });

    return {
      QR_SCAN_ID,
    };
  },
});
</script>
