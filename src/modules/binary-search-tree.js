import { mergeSort } from "./merge-sort";

export class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export default class Tree {
  constructor(array) {
    if (!Array.isArray(array)) {
      return;
    }
    this.root = Tree.buildTree(sortArray(array));
  }

  insert(value, node = this.root) {
    if (value === node.value) {
      return;
    }
    if (value > node.value) {
      if (node.right === null) {
        node.right = new Node(value);
        return;
      }
      this.insert(value, node.right);
    } else if (value < node.value) {
      if (node.left === null) {
        node.left = new Node(value);
        return;
      }
      this.insert(value, node.left);
    }
    return;
  }

  deleteItem(value, node = this.root) {
    // Base case: If the tree is empty
    if (node === null) {
      return null;
    }

    // Recursive case: Traverse the tree to find the node to delete
    if (value < node.value) {
      // If the value to be deleted is smaller than the root's value,
      // move to the left subtree
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.value) {
      // If the value to be deleted is greater than the root's value,
      // move to the right subtree
      node.right = this.deleteItem(value, node.right);
    } else {
      // Node with the value found; now to delete it

      // Case 1: Node with only one child or no child
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      // Case 2: Node with two children
      // Find the in-order successor (smallest in the right subtree)
      let successor = this.getMinValueNode(node.right);

      // Copy the successor's value to the node
      node.value = successor.value;

      // Delete the successor
      node.right = this.deleteItem(successor.value, node.right);
    }
    return node;
  }

  // Helper function to find the minimum value node in a subtree
  getMinValueNode(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  // Method to find a node with the specified value
  find(value, node = this.root) {
    if (node === null || node.value === value) {
      return node;
    }
    if (value < node.value) {
      return this.find(value, node.left);
    } else {
      return this.find(value, node.right);
    }
  }

  // Iterative level-order traversal with callback
  levelOrder(callback) {
    if (!callback) {
      throw new Error("Callback function is required.");
    }

    const queue = [this.root];
    while (queue.length > 0) {
      const node = queue.shift();
      if (node) {
        callback(node);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }
  }

  // Recursive level-order traversal with callback
  levelOrderRecursive(callback, queue = [this.root]) {
    if (!callback) {
      throw new Error("Callback function is required.");
    }

    if (queue.length === 0) return;

    const node = queue.shift();
    if (node) {
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    this.levelOrderRecursive(callback, queue);
  }

  // In-order traversal with callback
  inOrder(callback, node = this.root) {
    if (!callback) {
      throw new Error("Callback function is required.");
    }
    if (node) {
      this.inOrder(callback, node.left);
      callback(node);
      this.inOrder(callback, node.right);
    }
  }

  // Pre-order traversal with callback
  preOrder(callback, node = this.root) {
    if (!callback) {
      throw new Error("Callback function is required.");
    }
    if (node) {
      callback(node);
      this.preOrder(callback, node.left);
      this.preOrder(callback, node.right);
    }
  }

  // Post-order traversal with callback
  postOrder(callback, node = this.root) {
    if (!callback) {
      throw new Error("Callback function is required.");
    }
    if (node) {
      this.postOrder(callback, node.left);
      this.postOrder(callback, node.right);
      callback(node);
    }
  }

  // Method to calculate the height of a given node
  height(node) {
    if (node === null) {
      return -1; // Base case: height of a null node is -1
    }
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return 1 + Math.max(leftHeight, rightHeight);
  }

  // Method to calculate the depth of a given node
  depth(node, current = this.root, depthLevel = 0) {
    if (current === null) {
      return -1; // Node not found in tree
    }
    if (current === node) {
      return depthLevel;
    }
    if (node.value < current.value) {
      return this.depth(node, current.left, depthLevel + 1);
    } else {
      return this.depth(node, current.right, depthLevel + 1);
    }
  }

  // Method to check if the tree is balanced
  isBalanced(node = this.root) {
    if (node === null) return true;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    const heightDifference = Math.abs(leftHeight - rightHeight) <= 1;
    return (
      heightDifference &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  // Method to rebalance the tree
  rebalance() {
    // Step 1: Collect all node values in sorted order using in-order traversal
    const values = [];
    this.inOrder((node) => values.push(node.value));

    // Step 2: Rebuild the tree using the static buildTree method
    this.root = Tree.buildTree(values);
  }

  static buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }

  static prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      Tree.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      Tree.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

function removeDuplicates(array) {
  const newArray = [];
  array.forEach((value) => {
    if (!newArray.includes(value)) {
      newArray.push(value);
    }
  });
  return newArray;
}

function sortArray(array) {
  return mergeSort(removeDuplicates(array));
}
