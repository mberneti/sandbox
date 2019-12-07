import { hierarchy } from "d3-hierarchy";

function Node(val) {
  this.name = val;
  this.children = Array(2).fill(null);
}

function Tree() {
  this.root = null;
  this.lastNode = null;
  this.index = 0;
}

Tree.prototype.getArrayTree = function(arr, i) {
  if (!i && i !== 0) i = 0;

  let root = { name: arr[i] + "" };
  if (i + 1 >= arr.length) return root;
  if (!root) root = { name: arr[i] + "" };
  root.children = [this.getArrayTree(arr, i + 1)];
  return root;
};

Tree.prototype.getArrayHierarchy = function(arr) {
  var jsonData = this.getArrayTree(arr);
  return this.getHierarchy(jsonData);
};

Tree.prototype.getHierarchy = function(root) {
  return hierarchy(root);
};

Tree.prototype.getRoot = function(arr, root, i) {
  return this.getHierarchy(this.insertLevelOrder(arr, root, i));
};

Tree.prototype.insertLevelOrder = function(arr, root, i) {
  // Base case for recursion

  if (i < arr.length) {
    var temp = new Node(arr[i]);
    root = temp;
    // insert left child
    root.children[0] = this.insertLevelOrder(arr, root.left, 2 * i + 1);
    // insert right child
    root.children[1] = this.insertLevelOrder(arr, root.right, 2 * i + 2);
  }

  if (root && root.children) {
    if (!root.children[0] && !root.children[1]) delete root.children;
    else if (!root.children[0]) root.children.splice(0, 1);
    else if (!root.children[1]) root.children.splice(1, 1);
  }

  return root;
};

export default Tree;
