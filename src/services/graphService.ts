export class Node<T> {
    value: T
    adjacentNodes: Set<Node<T>>

    constructor(value: T) {
        this.value = value
        this.adjacentNodes = new Set<Node<T>>
    }

    addAdjacentNode(item: Node<T>): void {
        this.adjacentNodes.add(item)
    }
}

export class Graph<T> {
    nodes: Map<T, Node<T>>

    constructor() {
        this.nodes = new Map<T, Node<T>>()
    }

    addNode(item: T): Node<T> {
        let node = this.nodes.get(item)

        if (node) {
            return node;
        }

        node = new Node<T>(item)
        this.nodes.set(item, node)

        return node
    }

    addEdge(source: T, destination: T): void {
        const sourceNode: Node<T> = this.addNode(source)
        const destinationNode: Node<T> = this.addNode(destination)

        sourceNode.addAdjacentNode(destinationNode)
    }
}