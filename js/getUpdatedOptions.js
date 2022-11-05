function getYAxisData (options, showMinMaxObj) {
  return options.yAxis
};

/**
  {
    "yAxisIndex0": {
        "min": 135,
        "max": 631,
        "delta": 496
    },
    "yAxisIndex1": {
        "min": -25,
        "max": 24,
        "delta": 49
    },
    "yAxisIndex2": {
        "min": -2.6,
        "max": 8.5,
        "delta": 11.1
    }
  }
 */
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
  const deltaObj = getDeltaObj(options, from, to);
  console.log('🚀 ~ file: getUpdatedOptions.js ~ line 70 ~ getUpdatedOptions ~ deltaObj', deltaObj);

  const virtualMinMaxObj = getVirtualMinMax(deltaObj);

  const showMinMaxObj = getShowMinMax(deltaObj, virtualMinMaxObj);

  const yAxisData = getYAxisData(options, showMinMaxObj);

  return {
    ...options,
    yAxis: yAxisData,
  };
}