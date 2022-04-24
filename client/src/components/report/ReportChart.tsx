import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ReportChartProps {
  id: string;
  series: number[];
  labels: string[];
  // TODO: Define all types of chart
  type: any;
}

const ReportChart = (props: ReportChartProps) => {
  const options: ApexOptions = {
    chart: {
      id: props.id,
      foreColor: 'black',
      type: props.type,
    },
    labels: props.labels,
    legend: {
      width: 400,
      position: 'top',
    },
  };

  return (
    <ReactApexChart options={options} series={props.series} type={props.type} />
  );
};

export default ReportChart;
