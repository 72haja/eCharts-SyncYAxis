function getYAxisData (options, showMinMaxObj) {
  return options.yAxis
};


function getDeltaObj (options, from, to) {
  return options
};

function getVirtualMinMax (deltaObj) {
  return deltaObj
};

function getShowMinMax (deltaObj, virtualMinMaxObj) {
  return virtualMinMaxObj
};

function getExtremNumbers (showMinMaxObj, deltaObj) {
  return showMinMaxObj
};


export default function getUpdatedOptions (options, from, to) {
  const deltaObj = getDeltaObj(from, to);

  const virtualMinMaxObj = getVirtualMinMax(deltaObj);

  const showMinMaxObj = getShowMinMax(deltaObj, virtualMinMaxObj);

  const yAxisData = getYAxisData(options, showMinMaxObj);

  return {
    ...options,
    yAxis: yAxisData,
  };
}