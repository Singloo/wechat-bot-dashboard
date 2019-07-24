import { action, configure, observable } from 'mobx';
import { IStrategy } from '../../models';
import { HomeService } from '../../services';
import {} from '../../utils';
import { timer, of } from 'rxjs';
import { catchError, filter, tap, concatMap } from 'rxjs/operators';
import { message } from 'antd';
configure({
  enforceActions: 'always',
});
interface IState {
  isActive?: boolean;
  isWaiting?: boolean;
  strategies?: IStrategy[];
}
const STRATEGY_TEMPLATE: IStrategy = {
  from: 'friend',
  condition: '',
  reply: '',
  type: 'keyword',
  state: 'editing',
};
class HomeStore {
  service: HomeService;
  @observable isActive: boolean = false;
  @observable isWaiting: boolean = false;
  @observable strategies: IStrategy[] = [];
  constructor({ service }: { service: HomeService }) {
    this.service = service;
  }
  @action setState = (nextState: IState) => {
    Object.assign(this, nextState);
  };
  queryAllStrategies = async () => {
    try {
      const strategies = await this.service.queryStrategies();
      console.warn(strategies.length);
      this.setState({
        strategies,
      });
    } catch (error) {
      console.warn(error.message);
    }
  };

  initialCheck = () => {
    this.service
      .checkIsActive()
      .then(code => {
        // const isActive = code === 200;
        this.setState({ isActive: true });
        // if (isActive) {
        this.queryAllStrategies();
        // }
      })
      .catch(err => console.warn(err.message));
  };
  save = async (item: IStrategy) => {
    const _item = { ...item };
    delete _item.uniqId;
    if (!item._id) {
      const _id = await this.service.insertOne(_item);
      _item._id = _id;
      this.modifySingleRecord(item, _item);
    } else {
      await this.service.update({ ..._item, state: 'done' });
    }
    message.success('保存成功');
  };
  $checkIsActive = (hide: () => void) => {
    this.setState({
      isWaiting: true,
    });
    timer(1000)
      .pipe(
        tap(x => console.log(x)),
        concatMap(_ => this.service.checkIsActive()),
        tap(x => console.log(x)),
        catchError(err => {
          console.warn(err.message);
          return of(null);
        }),
        filter(x => x === 200),
      )
      .subscribe(x => {
        console.warn(x);
        this.setState({ isActive: true, isWaiting: false });
        hide();
        this.queryAllStrategies();
      });
  };

  modifySingleRecord = (item: IStrategy, nextState: IStrategy) => {
    const key = item._id ? '_id' : 'uniqId';
    this.setState({
      strategies: this.strategies.map(it => {
        if (it[key] === item[key])
          return {
            ...it,
            ...nextState,
          };
        return it;
      }),
    });
  };
  addNewRecord = () => {
    this.setState({
      strategies: this.strategies.concat({
        ...STRATEGY_TEMPLATE,
        uniqId: Date.now(),
      }),
    });
  };
  deleteStrategy = async (item: IStrategy) => {
    const key = item._id ? '_id' : 'uniqId';
    this.setState({
      strategies: this.strategies.filter(o => o[key] !== item[key]),
    });
    if (item._id) {
      // delete from database
      try {
        await this.service.delete(item._id);
        message.success('删除成功~');
      } catch (err) {
        console.error(err);
      }
    }
  };
}
export { HomeStore };
