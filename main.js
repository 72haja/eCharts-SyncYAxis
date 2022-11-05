import './style.css'
import * as echarts from 'echarts';

// generate date range for each day from 2022-06-01 to 2022-12-31
const sampleMainXAxisData = Array.from({ length: 182 }, (_, i) => {
  const date = new Date(2022, 6, i + 1);
  return date.toLocaleDateString("de-DE");
});

// generate random data for each day between 100 and 300
const sampleMainSeriesData = sampleMainXAxisData.map(() => Math.floor(Math.random() * 200) + 100);

const sampleFeatureSeriesData1 = sampleMainXAxisData.map(
  (_, index) => {
    if (index < 100 || index > 150) return null

    return Math.floor(Math.random() * 50) - 25
  }
);

const sampleFeatureSeriesData2 = sampleMainXAxisData.map(
  (_, index) => {
    if (index < 75 || index > 155) return null

    return Math.floor(Math.random() * 10) - 5
  }
);

// initialize the echarts instance
var myChart = echarts.init(document.getElementById('main'));
// Draw the chart
myChart.setOption({
  xAxis: {
    type: 'category',
    data: sampleMainXAxisData,
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 100
    },
    {
      start: 0,
      end: 100
    }
  ],
  zoom: {
    start: 0,
    end: 100,
  },
  legend: {
    data: ['Main', 'Feature 1', 'Feature 2']
  },
  yAxis: [
    {
      name: 'Main',
      type: 'value',
      id: 'main',
      nameLocation: 'center',
      nameTextStyle: {
        padding: [0, 0, 20, 0],
      },
    },
    {
      name: 'Feature - 1',
      type: 'value',
      id: 'feature-1',
      nameLocation: 'center',
      offset: 10,
      nameTextStyle: {
        padding: [-20, 0, 0, 0],
      },
    },
    {
      name: 'Feature - 2',
      type: 'value',
      id: 'feature-2',
      index: 2,
      nameLocation: 'center',
      offset: 50,
      nameTextStyle: {
        padding: [-20, 0, 0, 0],
      },
    }
  ],
  series: [
    {
      data: sampleMainSeriesData,
      type: 'line',
      name: 'Main',
    },
    {
      data: sampleFeatureSeriesData1,
      type: 'line',
      name: 'Feature 1',
      yAxisIndex: 1,
    },
    {
      data: sampleFeatureSeriesData2,
      type: 'line',
      name: 'Feature 2',
      yAxisIndex: 2,
    },
  ]
});
