import { ComponentType } from 'react';
import { inject, observer } from 'mobx-react';

export default function injectMobxStore<
  StoreKey extends string,
  Props extends Record<StoreKey, unknown>,
>(
  storeKeys: StoreKey | readonly StoreKey[],
  component: ComponentType<Props>,
): ComponentType<Omit<Props, StoreKey>> {
  const keys = Array.isArray(storeKeys) ? storeKeys : [storeKeys];
  const injectedComponent = inject(...keys)(observer(component));
  return injectedComponent as unknown as ComponentType<Omit<Props, StoreKey>>;
}
