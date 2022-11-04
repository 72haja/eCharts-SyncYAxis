import './style.css'
import * as echarts from 'echarts';

console.log("Hello World!");

// initialize the echarts instance
var myChart = echarts.init(document.getElementById('main'));
// Draw the chart
myChart.setOption({
  title: {
    text: 'ECharts Getting Started Example'
  },
  tooltip: {},
  xAxis: {
    data: ['shirt', 'cardigan', 'chiffon', 'pants', 'heels', 'socks']
  },
  yAxis: {},
  series: [
    {
      name: 'sales',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
});

console.log('🚀 ~ file: main.js ~ line 8 ~ myChart', myChart);