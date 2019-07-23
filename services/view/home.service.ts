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
}

export { HomeService };
