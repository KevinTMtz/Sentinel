import axios from 'axios';

import { ReportSearchProps } from '../../types/types';

export const searchAndGetReport = async (
  reportSearchProps: ReportSearchProps,
) => {
  return await axios('/reports/search', {
    method: 'GET',
    responseType: 'json',
    params: reportSearchProps,
  });
};
