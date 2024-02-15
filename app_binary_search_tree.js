class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
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

const tree = new Tree();
tree.add(10);
tree.add(5);
tree.add(2);
tree.add(6);
tree.add(20);
tree.add(25);
tree.add(23);
tree.add(28);
// tree.add(26);
tree.add(39);
// tree.remove(20);
// tree.remove(39);
tree.remove(25);

console.log(tree);
console.log(tree.find(6));
console.log(tree.find(7));
console.log(tree.find(39));