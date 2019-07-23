import { action, configure } from 'mobx';
import {} from '../../models';
import {} from '../../services';
import {} from '../../utils';
configure({
  enforceActions: 'always',
});
interface IState {}
class Template {
  @action setState = (nextState: IState) => {
    Object.assign(this, nextState);
  };
}
export { Template };
