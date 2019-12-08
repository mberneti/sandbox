import Tree from "./Tree";

let tree = new Tree();

function BinaryHeapInsert() {
  this.content = [];
  this.initContent = [];
  this.history = [];
  this.sortedArray = [];
}

BinaryHeapInsert.prototype = {
  push: function(element) {
    this.log("insert " + this.content.length);
    this.maxHeapInsert(element);
    this.initContent.push(element);
  },
  arr: function(index) {
    return this.content[index];
  },
  swap: function(i, j) {
    this.log(`swap`, [i, j]);
    [this.content[i], this.content[j]] = [this.content[j], this.content[i]];
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
  getParentValue: function(i) {
    let parentIndex = this.getParentIndex(i);
    return this.content[parentIndex];
  },
  getParentIndex: function(i) {
    let parentIndex = Math.ceil(i / 2) - 1;
    return parentIndex;
  },
  maxHeapInsert: function(newNode) {
    this.content.push("N" + newNode);
    this.log("Added Empty Node");
    let lastChildIndex = this.content.length - 1;

    const compareNewNodeWithParent = childIndex => {
      this.log("compare", [childIndex, this.getParentIndex(childIndex)]);
      return newNode > this.getParentValue(childIndex);
    };

    while (lastChildIndex > 0 && compareNewNodeWithParent(lastChildIndex)) {
      this.log("swap", [lastChildIndex, this.getParentIndex(lastChildIndex)]);

      this.content[lastChildIndex] = this.getParentValue(lastChildIndex);
      lastChildIndex = this.getParentIndex(lastChildIndex);
      this.content[lastChildIndex] = "N" + newNode;
    }

    this.content[lastChildIndex] = newNode;
  },
  getTree: function() {
    let root = tree.getRoot(this.content, {}, 0);
    let initRoot = tree.getRoot(this.initContent, {}, 0);
    this.log("done");
    return { root, initRoot, history: this.history };
  }
};

export default BinaryHeapInsert;
