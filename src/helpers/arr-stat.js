// https://gist.githubusercontent.com/Daniel-Hug/7273430/raw/5fef061da351ec08355f6eb305ee9d8bad2071da/arr-stat.js
const arr = {
  max: function(array) {
    return Math.max.apply(null, array);
  },

  min: function(array) {
    return Math.min.apply(null, array);
  },

  range: function(array) {
    return arr.max(array) - arr.min(array);
  },

  midrange: function(array) {
    return arr.range(array) / 2;
  },

  sum: function(array) {
    var num = 0;
    for (var i = 0, l = array.length; i < l; i++) num += array[i];
    return num;
  },

  mean: function(array) {
    return arr.sum(array) / array.length;
  },

  median: function(array) {
    array.sort(function(a, b) {
      return a - b;
    });
    var mid = array.length / 2;
    return mid % 1 ? array[mid - 0.5] : (array[mid - 1] + array[mid]) / 2;
  },

  modes: function(array) {
    if (!array.length) return [];
    var modeMap = {},
      maxCount = 0,
      modes = [];

    array.forEach(function(val) {
      if (!modeMap[val]) modeMap[val] = 1;
      else modeMap[val]++;

      if (modeMap[val] > maxCount) {
        modes = [val];
        maxCount = modeMap[val];
      } else if (modeMap[val] === maxCount) {
        modes.push(val);
        maxCount = modeMap[val];
      }
    });
    return modes;
  },

  variance: function(array) {
    var mean = arr.mean(array);
    return arr.mean(
      array.map(function(num) {
        return Math.pow(num - mean, 2);
      })
    );
  },

  standardDeviation: function(array) {
    return Math.sqrt(arr.variance(array));
  },

  meanAbsoluteDeviation: function(array) {
    var mean = arr.mean(array);
    return arr.mean(
      array.map(function(num) {
        return Math.abs(num - mean);
      })
    );
  },

  zScores: function(array) {
    var mean = arr.mean(array);
    var standardDeviation = arr.standardDeviation(array);
    return array.map(function(num) {
      return (num - mean) / standardDeviation;
    });
  },

  modifiedZScores: function(array) {
    var median = arr.median(array);
    var meanAbsoluteDeviation = arr.meanAbsoluteDeviation(array);
    return array.map(function(num) {
      return (num - median) / meanAbsoluteDeviation;
    });
  },
  normalize_array: function(arr) {
    const normalize = function(val, max, min) {
      return (val - min) / (max - min);
    };

    var max = Math.max.apply(null, arr);
    var min = Math.min.apply(null, arr);

    var hold_normed_values = [];
    arr.forEach(function(this_num) {
      hold_normed_values.push(normalize(this_num, max, min));
    });

    return hold_normed_values;
  },
  round_to_precision: function(x, precision) {
    if (!precision) return x;
    var y = +x + (precision === undefined ? 0.5 : precision / 2);
    return y - (y % (precision === undefined ? 1 : +precision));
  }
};

export default arr;
