import { httpClient } from '../../utils';
import { IStrategy } from '../../models';

class HomeService {
  checkIsActive = async (): Promise<200 | 201 | 408 | 0> => {
    const { data } = await httpClient.get('/is_active');
    return data.isActive;
  };
  queryStrategies = async (): Promise<IStrategy[]> => {
    const { data } = await httpClient.get('/strategy');
    return data;
  };

  insertOne = async (doc: IStrategy): Promise<string> => {
    const { data } = await httpClient.post('/strategy', {
      doc,
    });
    return data._id;
  };

  update = (doc: IStrategy) => {
    return httpClient.put('/strategy', {
      doc,
    });
  };

  delete = (_id: string) => {
    return httpClient.delete('/strategy', {
      params: {
        _id,
      },
    });
  };
}

export { HomeService };
