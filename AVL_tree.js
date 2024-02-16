//              o
//            /
//          o
//         /
//        o Depth 2 (unbalanced BST) balance factor = 2 (Left - Right)

// 4 Aproach to get out of problem;

// 1) Left Rotation 2) Right rotation 3) Left-Right rotation 4) Right-Left Rotation;

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
    }


    get leftDepth() {
        if (!this.left) {
            return 0;
        }

        return this.left.depth + 1;
    }

    get rightDepth() {
        if (!this.right) {
            return 0;
        }

        return this.right.depth + 1;
    }

    get depth() {
        return Math.max(this.leftDepth,this.rightDepth);
    }

    get balanceFactor() {
        return this.leftDepth - this.rightDepth;
    }

    add(value) {
        if (this.value === null) {
            this.value = value;
            return;
        }
        if (this.value < value){
            if (this.right) {
                this.right.add(value);
                return;
            }
            const newNode = new Node(value);
            newNode.parent = this;
            this.right = newNode;
            return;
        }
        if (this.value > value) {
            if (this.left) {
                this.left.add(value);
                return;
            }
            const newNode = new Node(value);
            newNode.parent = this;
            this.left = newNode;
            return;
        }
    }

    remove(value) {
        const idetifiedNode = this.find(value);

        if (!idetifiedNode) {
            throw new Error('Could not find node with that value');
        }

        if (!idetifiedNode.left && !idetifiedNode.right) {
            const identifiedParent = idetifiedNode.parent;
            idetifiedNode.removeChild(idetifiedNode)
            return;
        }

        if (idetifiedNode.left && idetifiedNode.right) {
            const nextBiggerNode = idetifiedNode.right.findNext();
            if (nextBiggerNode !== idetifiedNode.right) {
                this.remove(nextBiggerNode.value);
                idetifiedNode.value = nextBiggerNode.value;
            } else {
                idetifiedNode.value = idetifiedNode.right.value;
                idetifiedNode.right = idetifiedNode.right.right;
                idetifiedNode.right.parent = idetifiedNode;
            }
        } else {
            const childNode = idetifiedNode.left || idetifiedNode.right;
            idetifiedNode.left = childNode.left;
            idetifiedNode.right = childNode.right;
            idetifiedNode.value = childNode.value;
            return;
        }

    }

    findNext() {
        if (!this.left) {
            return this;
        }
        return this.left.findNext();
    }

    removeChild(node) {
        if (this.left && this.left === node) {
            this.left = null;
            return;
        }
        if (this.right && this.right === node) {
            this.right = null;
            return;
        }
    }

    find(value) {
        if (this.value === value) return this;

        if (this.value < value && this.right) {
            return this.right.find(value);
        }

        if (this.value > value && this.left) {
            return this.left.find(value);
        }
    }
}

class Tree {
    constructor() {
        this.root = new Node(null);
    }
    add(value) {
        this.root.add(value);
    }

    remove(value) {
        this.root.remove(value);
    }

    find(value) {
       return this.root.find(value);
    }
}

class AVLTree extends Tree {
    add(value) {
        super.add(value);

        let curNode = this.root.find(value);

        while(curNode) {
            this.balance(curNode);
            curNode = curNode.parent;
        }
    }

    revome(value) {
        super.remove(value);

        this.balance(this.root);
    }

    balance(node) {
        if (node.balanceFactor < -1) {
            if (node.right.balanceFactor < 0) {
                this.rotateLeft(node);
            } else if (node.right.balanceFactor > 0) {
                this.rotateRightLeft(node);
            }
        } else if (node.balanceFactor > 1) {
            if (node.right.balanceFactor < 0 ) {
                this.rotateLeftRight(node);
            } else if (node.left.balanceFactor > 0) {
                this.rotateRight(node);
            } 
        }
    }

    rotateLeft(node) {
        const rightNode = node.right;
        node.right = null;

        if (node.parent) {
            node.parent.right = rightNode;
            node.parent.right.parent = node.parent;
        } else if (node === this.root) {
            this.root = rightNode;
            this.root.parent = null;
        }

        if (rightNode.left) {
            node.right = rightNode.left;
            node.right.parent = node;
        }

        rightNode.left = node;
        rightNode.left.parent = rightNode;
    }
}

const tree = new AVLTree();

tree.add(1);
tree.add(2);
tree.add(3);

console.log(tree);