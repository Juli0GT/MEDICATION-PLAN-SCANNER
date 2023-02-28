<template>
  <div class="home">
    <img alt="matrix logo" class="home__image" src="../assets/matrix2.png">
    <h1 v-text="header"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  setup() {
    return {
      header: 'Welcome to MedScanner',
    };
  },
});
</script>

<style lang="scss">
.home {
  &__image {
    width: 50vw;
  }
}
</style>
