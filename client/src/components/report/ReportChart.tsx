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
    title: {
      text: props.id,
      align: 'center',
      floating: false,
      style: { fontSize: '24px', fontWeight: '400' },
    },
    chart: {
      id: props.id,
      foreColor: 'black',
    },
    labels: props.labels,
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      floating: false,
    },
    // TODO: Check responsive values
    // responsive: {}

    // TODO: Consider the other types of charts
  };

  return (
    <ReactApexChart
      width={'60%'}
      options={options}
      series={props.series}
      type={props.type}
    />
  );
};

export default ReportChart;
