import { ComponentType } from 'react';
import { inject, observer } from 'mobx-react';

export default function injectMobxStore<
  Props extends object,
  StoreKey extends keyof Props & string,
>(storeKey: StoreKey, component: ComponentType<Props>): ComponentType<Omit<Props, StoreKey>> {
  const injectedComponent = inject(storeKey)(observer(component));
  return injectedComponent as unknown as ComponentType<Omit<Props, StoreKey>>;
}
