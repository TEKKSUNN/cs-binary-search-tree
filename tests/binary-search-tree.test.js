import Tree, { Node } from '../src/modules/binary-search-tree.js';

describe('Tree', () => {
    let tree;

    beforeEach(() => {
        const array = [10, 5, 20, 3, 7, 15, 25];
        tree = new Tree(array);
    });

    test('should initialize a balanced tree from an array', () => {
        expect(tree.isBalanced()).toBe(true);
    });

    test('should insert a new node', () => {
        tree.insert(13);
        expect(tree.find(13)).not.toBeNull();
    });

    test('should not insert a duplicate node', () => {
        tree.insert(10);
        const originalNode = tree.find(10);
        tree.insert(10);
        const duplicateNode = tree.find(10);
        expect(originalNode).toBe(duplicateNode); // Node remains unchanged
    });

    test('should delete a node with no children', () => {
        tree.insert(8);
        tree.deleteItem(8);
        expect(tree.find(8)).toBeNull();
    });

    test('should delete a node with one child', () => {
        tree.insert(8);
        tree.insert(6);
        tree.deleteItem(8);
        expect(tree.find(8)).toBeNull();
        expect(tree.find(6)).not.toBeNull();
    });

    test('should delete a node with two children', () => {
        tree.insert(17);
        tree.insert(18);
        tree.deleteItem(17);
        expect(tree.find(17)).toBeNull();
        expect(tree.find(18)).not.toBeNull();
    });

    test('should find a node with a specific value', () => {
        expect(tree.find(10)).toBeInstanceOf(Node);
        expect(tree.find(99)).toBeNull();
    });

    test('should perform in-order traversal', () => {
        const values = [];
        tree.inOrder(node => values.push(node.value));
        expect(values).toEqual([3, 5, 7, 10, 15, 20, 25]); // Sorted array order
    });

    test('should perform pre-order traversal', () => {
        const values = [];
        tree.preOrder(node => values.push(node.value));
        expect(values).toContain(tree.root.value); // Root node is first in pre-order
    });

    test('should perform post-order traversal', () => {
        const values = [];
        tree.postOrder(node => values.push(node.value));
        expect(values).toContain(tree.root.value); // Root node is last in post-order
    });

    test('should perform level-order traversal', () => {
        const values = [];
        tree.levelOrder(node => values.push(node.value));
        expect(values[0]).toBe(tree.root.value); // Root node is first in level-order
    });

    test('should calculate the height of a node', () => {
        const rootHeight = tree.height(tree.root);
        expect(rootHeight).toBeGreaterThan(0); // Root has height > 0
    });

    test('should calculate the depth of a node', () => {
        const node = tree.find(25);
        const depth = tree.depth(node);
        expect(depth).toBeGreaterThan(0); // Node depth > 0 (for non-root nodes)
    });

    test('should check if the tree is balanced', () => {
        expect(tree.isBalanced()).toBe(true);
        tree.insert(100);
        tree.insert(110);
        expect(tree.isBalanced()).toBe(false); // Tree becomes unbalanced
    });

    test('should rebalance the tree', () => {
        tree.insert(100);
        tree.insert(110);
        expect(tree.isBalanced()).toBe(false);
        tree.rebalance();
        expect(tree.isBalanced()).toBe(true); // Tree should be balanced after rebalancing
    });
});
