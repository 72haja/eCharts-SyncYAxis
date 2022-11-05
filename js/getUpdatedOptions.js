function getYAxisData (options, showMinMaxObj) {
  return options.yAxis
};

function getDeltaObj (options, from, to) {
  return options.series.reduce((acc, cv, index) => {
    const name = `yAxisIndex${cv.yAxisIndex || 0}`;
    const flattenValues = cv.data.slice(from, to).flat(Infinity)
      .map((v) => Number(v))
      .filter((v) => v === 0 || !!v);

    if (flattenValues.length < 1) {
      return acc;
    }

    if (index > 0) {
      const flattenValuesNoDuplicateAndNoZero = [...new Set(flattenValues)]
        .filter((v) => v !== 0);

      if (flattenValuesNoDuplicateAndNoZero.length < 1) {
        return acc;
      }
    }

    const minValue = Math.min(...flattenValues);
    const maxValue = Math.max(...flattenValues);

    const delta = maxValue - minValue;

    if (acc[name]) {
      const deltaIsBigger = delta > acc[name].delta;

      if (!deltaIsBigger) return acc;

      const minArray = [minValue, acc[name].min].filter(
        (v) => !!v && Math.abs(v) !== Infinity,
      );
      const maxArray = [maxValue, acc[name].max].filter(
        (v) => !!v && Math.abs(v) !== Infinity,
      );
      acc[name] = {
        delta,
        min: Math.min(...minArray, 0),
        max: Math.max(...maxArray, 0),
      };
    } else {
      acc[name] = { min: minValue, max: maxValue, delta };
    }
    return acc;
  }, {});
};

function getVirtualMinMaxObjForKey (deltaObj, delta, key) {
  function getFactor (minMaxKey) {
    return deltaObj[key][minMaxKey] / delta;
  }

  return Object.entries(deltaObj).reduce((acc, [innerKey, innerValue]) => {
    if (innerKey === key) return acc;

    if (delta === 0) {
      acc[innerKey] = { virtualMax: innerValue.max, virtualMin: innerValue.min };
      return acc;
    }
    const virtualResult = {
      virtualMax: (getFactor('max') * innerValue.delta),
      virtualMin: (getFactor('min') * innerValue.delta),
    };
    acc[innerKey] = virtualResult;
    return acc;
  }, {});
};

function getVirtualMinMax (deltaObj) {
  return Object.entries(deltaObj).reduce((acc, [key, value]) => {
    const { delta } = value;
    const virtualMinMaxObj = getVirtualMinMaxObjForKey(deltaObj, delta, key);

    acc[key] = virtualMinMaxObj;
    return acc;
  }, {});
};

function getShowMinMax (deltaObj, virtualMinMaxObj) {
  return virtualMinMaxObj
};

function getExtremNumbers (showMinMaxObj, deltaObj) {
  return showMinMaxObj
};


export default function getUpdatedOptions (options, from, to) {
  const deltaObj = getDeltaObj(options, from, to);
  console.log('🚀 ~ file: getUpdatedOptions.js ~ line 95 ~ getUpdatedOptions ~ deltaObj', deltaObj);

  const virtualMinMaxObj = getVirtualMinMax(deltaObj);
  console.log('🚀 ~ file: getUpdatedOptions.js ~ line 116 ~ getUpdatedOptions ~ virtualMinMaxObj', virtualMinMaxObj);

  const showMinMaxObj = getShowMinMax(deltaObj, virtualMinMaxObj);

  const yAxisData = getYAxisData(options, showMinMaxObj);

  return {
    ...options,
    yAxis: yAxisData,
  };
}