import axios from 'axios';

interface ReportSearchProps {
  topic: string;
  location: string | undefined;
  date: Date | undefined;
}

export const getReport = async (props: ReportSearchProps, callback: any) => {
  // TODO: Get req body from search component
  const data = {
    topic: props.topic,
    location: props.location,
    until: props.date,
  };

  axios('/reports/search', {
    method: 'GET',
    responseType: 'json',
    params: data,
  }).then(
    (res: any) => {
      callback(res.data.report);
    },
    (err: any) => {
      console.log(err);
    },
  );
};
