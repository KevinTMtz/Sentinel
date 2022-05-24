import axios from 'axios';

import { ReportSearchQuery } from '../../types/types';

export const searchAndGetReport = async (
  reportSearchProps: ReportSearchQuery,
) => {
  return await axios('/reports/search', {
    method: 'GET',
    responseType: 'json',
    params: reportSearchProps,
  });
};
