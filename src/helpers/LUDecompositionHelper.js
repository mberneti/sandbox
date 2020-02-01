function LUDecomposition(matrix) {
  this.matrix = matrix;
  this.size = matrix.length;

  this.yList = matrix.map(x => 0);
  this.xList = matrix.map(x => 0);

  this.bList = matrix.map(x => x[x.length - 1]);

  this.upperTriangle = JSON.parse(JSON.stringify(matrix));
  this.lowerTriangle = JSON.parse(JSON.stringify(matrix));

  // initializing lowertTriangle ----------
  for (let i = 0; i < this.size; i++) {
    for (let j = 0; j < this.size; j++) {
      if (i === j) {
        this.lowerTriangle[i][j] = 1;
      } else {
        this.lowerTriangle[i][j] = 0;
      }
    }
  }
  // -------------------------------------
}

LUDecomposition.prototype = {
  updateUpperTriangular: function(i, sourceI, factor) {
    for (let j = 0; j < this.size; j++) {
      this.upperTriangle[i][j] =
        this.upperTriangle[i][j] + factor * this.upperTriangle[sourceI][j];
    }
  },
  updateLowerTriangular: function(i, j, factor) {
    this.lowerTriangle[i][j] = -factor;
  },
  makeLU: function() {
    for (let i = 1; i < this.size; i++) {
      for (let j = 0; j < i; j++) {
        let sourceI = j;
        var factor = -(
          this.upperTriangle[i][j] / this.upperTriangle[sourceI][j]
        );

        this.updateUpperTriangular(i, sourceI, factor);

        this.updateLowerTriangular(i, j, factor);
      }
    }
  },

  lowerTriangularSum: function(i) {
    let sum = 0;
    for (let j = 0; j < i; j++) {
      sum += this.yList[j] * this.lowerTriangle[i][j];
    }
    return sum;
  },
  getYList: function() {
    for (let i = 0; i < this.size; i++) {
      this.yList[i] = this.bList[i] - this.lowerTriangularSum(i);
    }
  },

  upperTriangularSum: function(i) {
    let sum = 0;
    for (let j = this.size - 1; j > i; j--) {
      sum += this.xList[j] * this.upperTriangle[i][j];
    }
    return sum;
  },
  getXList: function() {
    for (let i = this.size - 1; i >= 0; i--) {
      var xFactor = this.upperTriangle[i][i];
      this.xList[i] = (this.yList[i] - this.upperTriangularSum(i)) / xFactor;
    }
  },

  getResult: function() {
    this.makeLU();

    this.getYList();

    this.getXList();

    return {
      upperTriangle: this.upperTriangle,
      lowerTriangle: this.lowerTriangle,
      yList: this.yList,
      xList: this.xList
    };
  }
};

export default LUDecomposition;
