import React from 'react';
import Chart from 'react-apexcharts';

type PolarAreaChartProps = {
  data: Record<string, number>; // objeto: chave = rótulo, valor = número
  title?: string;
};

const PolarAreaChart: React.FC<PolarAreaChartProps> = ({ data, title = 'Polar Area Chart' }) => {
  const label_map: { [key: string]: string } = {
  'intelligence': 'Inteligência',
  'strength': 'Força',
  'stealthiness': 'Furtividade',
  'resilience': 'Resilência',
  'moral': 'Moral'
}
  const labels = Object.keys(data).map(key => label_map[key]);
  const values = Object.values(data);
  
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'polarArea',
      width: 250,
      height: 250
    },
    labels: labels,
    theme: {
      monochrome: {
        enabled: true,
        color: '#f50a1c',
        shadeTo: 'light',
        shadeIntensity: 1
      },
    },
    stroke: {
            colors: undefined,
            show: false,
            },
    yaxis: {
            show: false
           },
    fill: {
      opacity: 1,
    },
    title: {
      text: title,
      align: 'center',
      style: {
        fontSize: '15px',
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Inter',
      },
    },
    legend: {
      show: true,
      position: 'left',
      fontWeight: '600',
      onItemHover: {
        highlightDataSeries: true
      },
      itemMargin: {
        horizontal: 5,
        vertical: 0.2
      },
      labels: {
        colors: 'white',
        useSeriesColors: false
      }
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <Chart options={chartOptions} series={values} type="polarArea" height={135} />
    </div>
  );
};

export default PolarAreaChart;
