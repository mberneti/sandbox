import Tree from "./Tree";

let tree = new Tree();

function BinaryHeap() {
  this.content = [];
  this.initContent = [];
  this.history = [];
  this.sortedArray = [];
}

BinaryHeap.prototype = {
  push: function(element) {
    // Add the new element to the end of the array.
    this.content.push(element);
    this.initContent.push(element);
    this.log("insert " + this.content.length);
    // Allow it to bubble up.
    // this.heapSort(this.content.length);
  },
  arr: function(index) {
    return this.content[index];
  },
  swap: function(i, j) {
    this.log(`swap`, [i, j]);
    [this.content[i], this.content[j]] = [this.content[j], this.content[i]];
  },
  heapSort: function() {
    let length = this.content.length;
    let i = Math.floor(length / 2 - 1);

    while (i >= 0) {
      this.maxHeapify(i, length);
      i--;
    }
  },
  log: function(label, logNode) {
    this.history.push({
      label,
      root: tree.getRoot(this.content, {}, 0),
      logNode,
      output:
        this.sortedArray.length > 0 && tree.getArrayHierarchy(this.sortedArray)
    });
  },
  maxHeapify: function(i, length) {
    this.log(`MaxHeap (${i})`);

    let largest = i;

    let left = i * 2 + 1;
    let right = left + 1;

    let hasLeftChild = left < length;
    let hasRightChild = right < length;

    if (hasLeftChild) this.log(`compare`, [left, largest]);

    if (hasLeftChild && this.arr(left) > this.arr(largest)) {
      largest = left;
    }

    if (hasRightChild) this.log(`compare`, [right, largest]);

    if (hasRightChild && this.arr(right) > this.arr(largest)) {
      largest = right;
    }

    if (largest !== i) {
      this.swap(i, largest);
      this.maxHeapify(largest, length);
    }
  },
  getTree: function() {
    this.heapSort();
    let root = tree.getRoot(this.content, {}, 0);
    let initRoot = tree.getRoot(this.initContent, {}, 0);
    this.log(`done`);
    return { root, initRoot, history: this.history };
  }
};

export default BinaryHeap;
