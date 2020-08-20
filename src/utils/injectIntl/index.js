import { injectIntl as baseInjectIntl } from 'react-intl';
import hoistNonReactStatic from 'hoist-non-react-statics';

export default function injectIntl(WrappedComponent: Function): Function {
  const WrapperComponent = baseInjectIntl(WrappedComponent);

  hoistNonReactStatic(WrapperComponent, WrappedComponent);

  return WrapperComponent;
}
