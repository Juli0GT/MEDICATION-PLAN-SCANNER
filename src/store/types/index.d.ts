import { Store } from '..';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store
  }
}
