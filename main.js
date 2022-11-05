import './style.css'
import getUpdatedOptions from './js/getUpdatedOptions';
import * as echarts from 'echarts';

const sampleMainXAxisData = Array.from({ length: 184 }, (_, i) => {
  const date = new Date(2022, 6, i + 1);
  return date.toLocaleDateString("de-DE");
});

const sampleMainSeriesData = sampleMainXAxisData.map(
  (_, index) => Math.floor(Math.random() * 200) + 100 + (index * 2)
);
sampleMainSeriesData[0] = 100;
sampleMainSeriesData[sampleMainSeriesData.length - 1] = 700;

const sampleFeatureSeriesData1_1 = sampleMainXAxisData.map(
  (_, index) => {
    if (index <= 100 || index >= 150) return null

    return Math.floor(Math.random() * 50) - 25
  }
);

const sampleFeatureSeriesData1_2 = sampleMainXAxisData.map(
  (_, index) => {
    if (index <= 50 || index >= 130) return null

    return Math.floor(Math.random() * 800) - 15
  }
);
sampleFeatureSeriesData1_2[50] = 850;
sampleFeatureSeriesData1_2[130] = -30;

const sampleFeatureSeriesData2 = sampleMainXAxisData.map(
  (_, index) => {
    if (index <= 75 || index >= 155) return null

    return Math.floor(Math.random() * 10) - 5 + (index * 0.03)
  }
);
sampleFeatureSeriesData2[75] = -3;
sampleFeatureSeriesData2[155] = 10;

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
    data: [
      'Main',
      'Feature 1_1',
      'Feature 1_2',
      'Feature 2',
    ]
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
      data: sampleFeatureSeriesData1_1,
      type: 'line',
      name: 'Feature 1_1',
      yAxisIndex: 1,
    },
    {
      data: sampleFeatureSeriesData1_2,
      type: 'line',
      name: 'Feature 1_2',
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

function setLocalDataZoom (dataZoom) {
  options.dataZoom = dataZoom
}

function updateOptions (updatedOptions) {
  myChart.setOption(updatedOptions);
}

function scale () {
  const currentOption = myChart.getOption();
  const { dataZoom } = currentOption;
  setLocalDataZoom(dataZoom);
  const { startValue, endValue } = dataZoom[0];
  const updatedOptions = getUpdatedOptions(options, startValue, endValue + 1);

  updateOptions(updatedOptions);
};

myChart.on('datazoom', 'series.candlestick', () => {
  scale();
});