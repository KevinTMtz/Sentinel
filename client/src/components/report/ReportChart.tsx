import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ReportChartProps {
  id: string;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  labels?: string[];
  categories?: string[];
  // TODO: Define all types of chart
  type: any;
}

const NonAxisReportChart = (props: ReportChartProps) => {
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
  };

  return (
    <ReactApexChart
      width={'40%'}
      options={options}
      series={props.series}
      type={props.type}
    />
  );
};

const AxisReportChart = (props: ReportChartProps) => {
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
    labels: props.labels || [],
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      floating: false,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'top',
        },
      },
    },
    xaxis: {
      categories: props.categories,
      position: 'bottom',
      labels: {
        offsetY: 0,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
        offsetY: -35,
      },
    },
    // TODO: Check responsive values
    // responsive: {}
  };

  return (
    <ReactApexChart
      width={'40%'}
      options={options}
      series={props.series}
      type={props.type}
    />
  );
};

const ReportChart = (props: ReportChartProps) => {
  return props.type === 'pie' ? (
    <NonAxisReportChart {...props} />
  ) : (
    <AxisReportChart {...props} />
  );
};

export default ReportChart;
