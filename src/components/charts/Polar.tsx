import React from 'react';
import Chart from 'react-apexcharts';

type PolarAreaChartProps = {
  data: Record<string, number>; // objeto: chave = rótulo, valor = número
  title?: string;
};

const PolarAreaChart: React.FC<PolarAreaChartProps> = ({ data, title = 'Polar Area Chart' }) => {
  const label_map: { [key: string]: string } = {
    intelligence: 'Inteligência',
    strength: 'Força',
    agility: 'Agilidade',
    resilience: 'Resiliência',
    moral: 'Moral'
  };

  const keys = Object.keys(data);

  const labels = keys.map(key => label_map[key] ?? key);
  const values = keys.map(key => {
    const n = Number(data[key]);
    return Number.isFinite(n) ? n : 0;
  });

  if (labels.length !== values.length) {
    console.warn("PolarAreaChart ERROR: labels e values não combinam");
  }


  
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
