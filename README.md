![Computer Science | Binary Search Tree](assets/banner.png)

![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![Make & Leave Project](https://img.shields.io/badge/Make%20%26%20Leave-Project-blue?style=for-the-badge)


# Binary Search Tree (BST) Implementation

This repository contains a JavaScript implementation of a Binary Search Tree (BST), providing foundational tree operations like insertion, deletion, searching, and traversal. The project supports traversal methods including in-order, pre-order, post-order, and level-order, along with balance checking and rebalancing.

# Installation

```bash
npm install @tekksunn/cs-binary-search-tree
```

## Features

- `insert(value)` - Adds a new node to the BST while maintaining order.
- `deleteItem(value)` - Removes a node by value, handling cases with no children, one child, or two children.
- `find(value)` - Locates and retrieves a node based on its value.
- `levelOrder(callback)` - Traverses the tree in breadth-first level order, calling the provided callback function on each node.
- `inOrder(callback)` - Traverses the tree in in-order sequence (left-root-right) and calls the provided callback function on each node.
- `preOrder(callback)` - Traverses the tree in pre-order sequence (root-left-right) and calls the provided callback function on each node.
- `postOrder(callback)` - Traverses the tree in post-order sequence (left-right-root) and calls the provided callback function on each node.
- `height(node)` - Calculates and returns the height of the given node.
- `depth(node)` - Calculates and returns the depth of the given node relative to the tree’s root.
- `isBalanced()` - Checks if the tree is balanced.
- `rebalance()` - Rebalances the tree when it becomes unbalanced.
- `prettyPrint()` - Visualizes the tree structure in a console-friendly format.

## Contributing

Feel free to fork this project and create a pull request if you'd like to contribute. Please make sure to write tests for any new features you add.

## License

This project is open source and available under the [MIT License](LICENSE).
