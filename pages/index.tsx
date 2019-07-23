import React from 'react';
import { HomeStore } from '../stores';
import { observer, inject } from 'mobx-react';
import { httpClient } from '../utils';
import {
  Button,
  message,
  Skeleton,
  Table,
  Input,
  Tag,
  Select,
  Icon,
  Modal,
} from 'antd';
import '../styles/app.scss';
import { IStrategy } from '../models';
import {} from 'mobx';
@inject('home')
@observer
class Home extends React.Component<IProps> {
  componentDidMount() {
    this.props.home.initialCheck();
  }
  _onPressLogin = () => {
    httpClient.get('/login').catch(err => {
      console.warn(err.message);
    });
    message.info('请打开终端扫描二维码, 或者在手机上确认');
    const hide = message.loading('等待登录....');
    this.props.home.$checkIsActive(hide);
  };

  _onChangeState = (item: IStrategy, isEditing: boolean) => {
    if (isEditing) {
      //save
    }
    this.props.home.modifySingleRecord(item, {
      state: isEditing ? 'done' : 'editing',
    } as IStrategy);
  };
  render() {
    const { isActive, isWaiting } = this.props.home;
    return (
      <div className={'container'}>
        {!isActive && !isWaiting && this._renderLogin()}
        {isWaiting && this._renderSkeletons()}
        {isActive && !isWaiting && this._renderStrategies()}
      </div>
    );
  }
  _renderLogin = () => {
    return (
      <div style={{ margin: 'auto' }}>
        <h4>
          如果是第一次登录,请打开terminal扫描二维码登录
          <br />
          或者在手机上确认
        </h4>
        <Button
          onClick={this._onPressLogin}
          type={'primary'}
          style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 10 }}
        >
          {'点此登录'}
        </Button>
      </div>
    );
  };
  _renderSkeletons = () => {
    return (
      <>
        <br />
        <h4>请稍等....</h4>
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </>
    );
  };

  _insertNewRecord = () => {
    this.props.home.addNewRecord();
  };
  _renderStrategies = () => {
    const { strategies, modifySingleRecord, deleteStrategy } = this.props.home;
    const columns = [
      {
        title: 'from',
        dataIndex: 'from',
        key: 'from',
        render: (text: string, item: IStrategy) => {
          const isEditing = item.state === 'editing';
          return (
            <Select
              defaultValue={text}
              disabled={!isEditing}
              onChange={(from: string) =>
                modifySingleRecord(item, {
                  from,
                } as IStrategy)
              }
            >
              <Select.Option value={'group'}>Group</Select.Option>
              <Select.Option value={'at'}>at@</Select.Option>
              <Select.Option value={'friend'}>Group</Select.Option>
            </Select>
          );
        },
      },
      {
        title: 'condition',
        dataIndex: 'condition',
        key: 'condition',
        render: (text: string, item: IStrategy, idx: number) => {
          const isEditing = item.state === 'editing';
          return (
            <Input
              value={text}
              contentEditable={isEditing}
              disabled={!isEditing}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                modifySingleRecord(item, {
                  condition: e.target.value,
                } as IStrategy)
              }
            />
          );
        },
      },
      {
        title: 'reply',
        dataIndex: 'reply',
        key: 'reply',
        render: (text: string, item: IStrategy) => {
          const isEditing = item.state === 'editing';
          return (
            <Input
              value={text}
              contentEditable={isEditing}
              disabled={!isEditing}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                modifySingleRecord(item, {
                  reply: e.target.value,
                } as IStrategy)
              }
            />
          );
        },
      },
      {
        title: 'type',
        dataIndex: 'type',
        key: 'type',
        render: (text: string, item: IStrategy) => {
          const isEditing = item.state === 'editing';
          const onPress = (nextType: 'reg' | 'keyword') => {
            modifySingleRecord(item, {
              type: nextType,
            } as IStrategy);
          };
          return (
            <div className={'rowCenter'}>
              <Tag.CheckableTag
                checked={item.type === 'keyword'}
                onChange={
                  isEditing
                    ? (bool: boolean) => onPress(bool ? 'keyword' : 'reg')
                    : undefined
                }
              >
                {'Keyword'}
              </Tag.CheckableTag>
              <Tag.CheckableTag
                checked={item.type === 'reg'}
                onChange={
                  isEditing
                    ? (bool: boolean) => onPress(!bool ? 'keyword' : 'reg')
                    : undefined
                }
              >
                {'Reg'}
              </Tag.CheckableTag>
            </div>
          );
        },
      },
      {
        title: 'actions',
        dataIndex: 'state',
        key: 'state',
        render: (text: string, item: IStrategy) => {
          const isEditing = item.state === 'editing';
          return (
            <div className={'rowCenter'}>
              <Button
                onClick={() => this._onChangeState(item, isEditing)}
                type={'primary'}
                ghost={!isEditing}
                style={{ width: 70 }}
              >
                {isEditing ? 'Save' : 'Edit'}
              </Button>
              <Icon
                style={{ marginLeft: 10, color: '#ed5350', fontSize: 25 }}
                type={'delete'}
                onClick={() => {
                  if (item._id) {
                    Modal.confirm({
                      title: 'Delete this row?',
                      onOk: () => deleteStrategy(item),
                    });
                  } else {
                    deleteStrategy(item);
                  }
                }}
              />
            </div>
          );
        },
      },
    ];
    return (
      <>
        <Table dataSource={strategies} columns={columns} />
        <Button onClick={this._insertNewRecord} icon={'plus'} type={'primary'}>
          {'Add a new strategy'}
        </Button>
      </>
    );
  };

  // _renderCard = (item: IStrategy, index: number) => {
  //   console.log(item);
  //   return <Table
  //   dataSource={}
  //   />
  // };
}
interface IProps {
  home: HomeStore;
}
export default Home;
