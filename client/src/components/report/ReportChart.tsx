import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const chartStyle = {
  maxWidth: '600px',
  minWidth: '500px',
  margin: 'auto',
};

const responsiveChartOption = [
  {
    breakpoint: 200,
    options: {
      chart: {
        width: 400,
      },
      legend: {
        position: 'bottom',
      },
    },
  },
];

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
    responsive: responsiveChartOption,
    colors: ['#44bd32', '#ff3f34', '#80808066'],
  };

  return (
    <ReactApexChart
      options={options}
      series={props.series}
      type={props.type}
      style={chartStyle}
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
    colors: [
      ({ dataPointIndex }: { dataPointIndex: number }) => {
        if (props.categories) {
          const categoryNum = Number(props.categories[dataPointIndex]);

          if (categoryNum < 0) {
            return '#ff3f34';
          } else if (categoryNum > 0) {
            return '#44bd32';
          } else {
            return '#80808066';
          }
        }
      },
    ],
    responsive: responsiveChartOption,
  };

  return (
    <ReactApexChart
      options={options}
      series={props.series}
      type={props.type}
      style={chartStyle}
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
