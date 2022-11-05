import './style.css'
import * as echarts from 'echarts';

const sampleMainXAxisData = Array.from({ length: 184 }, (_, i) => {
  const date = new Date(2022, 6, i + 1);
  return date.toLocaleDateString("de-DE");
});

const sampleMainSeriesData = sampleMainXAxisData.map(
  (_, index) => Math.floor(Math.random() * 200) + 100 + (index * 2)
);

const sampleFeatureSeriesData1 = sampleMainXAxisData.map(
  (_, index) => {
    if (index <= 100 || index >= 150) return null

    return Math.floor(Math.random() * 50) - 25
  }
);

const sampleFeatureSeriesData2 = sampleMainXAxisData.map(
  (_, index) => {
    if (index <= 75 || index >= 155) return null

    return Math.floor(Math.random() * 10) - 5 + (index * 0.03)
  }
);

let plotYAxis = [
  {
    name: 'Main',
    type: 'value',
    nameLocation: 'center',
    splitLine: {
      show: false,
    },
    nameTextStyle: {
      padding: [0, 0, 20, 0],
    },
  },
  {
    name: 'Feature - 1',
    type: 'value',
    nameLocation: 'center',
    splitLine: {
      show: false,
    },
    nameTextStyle: {
      padding: [-20, 0, 0, 0],
    },
    offset: 10,
  },
  {
    name: 'Feature - 2',
    type: 'value',
    nameLocation: 'center',
    splitLine: {
      show: false,
    },
    nameTextStyle: {
      padding: [-20, 0, 0, 0],
    },
    offset: 50,
  }
]

var myChart = echarts.init(document.getElementById('main'));

const options = {
  legend: {
    data: ['Main', 'Feature 1', 'Feature 2']
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  xAxis: {
    type: 'category',
    data: sampleMainXAxisData,
  },
  yAxis: plotYAxis,
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
}

myChart.setOption(options);
