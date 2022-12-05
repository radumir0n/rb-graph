type Color = 'red' | 'blue'

export class Node<T> {
    value: T
    color: Color
    adjacentNodes: Set<Node<T>>

    constructor(value: T, color: Color) {
        this.value = value
        this.color = color
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

    addNode(item: T, prev?: T): Node<T> {
        let node = this.nodes.get(item)
        let color: Color;

        if (node) {
            return node;
        }

        if(prev) {
            const prevData = this.nodes.get(prev)
            if(prevData?.color === 'blue') {
                color = 'red'
            } else {
                color = 'blue'
            }
        } else {
            if (this.nodes.size === 0) {
                color = 'red'
            } else {
                const lastNode = [...this.nodes.values()].at(-1)
                if (lastNode?.color === 'blue'){
                    color = 'red'
                } else {
                    color = 'blue'
                }
            }
        }

        node = new Node<T>(item, color)
        this.nodes.set(item, node)

        return node
    }

    addEdge(source: T, destination: T): void {
        const sourceNode: Node<T> = this.addNode(source)
        const destinationNode: Node<T> = this.addNode(destination, source)

        sourceNode.addAdjacentNode(destinationNode)
        destinationNode.addAdjacentNode(sourceNode)
    }

    isConnected(head: Node<T> | undefined): boolean | undefined {
        if (!head) {
            return undefined
        }

        const allVisited: Map<T, boolean> = new Map()

        const visited = this.dfs(head)

        this.nodes.forEach((node: Node<T>) => {
            if (!allVisited.has(node.value)) {
                this.walk(node, allVisited)
            }
        })

        return visited.size === allVisited.size
    }

    isRedBlueColorable(head: Node<T> | undefined): boolean | undefined {
        if (!head) {
            return undefined
        }

        const allVisited: Map<T, boolean> = new Map()
        const allColors: boolean[] = []

        this.nodes.forEach((node: Node<T>) => {
            if (!allVisited.has(node.value)) {
                this.walk(node, allVisited)
            }

            const hasSameColor: boolean[] = []
            const { color } = node
            node.adjacentNodes.forEach((adj: Node<T>) => {
                if (adj.color === color) {
                    hasSameColor.push(true)
                } else {
                    hasSameColor.push(false)
                }
            })
            allColors.push(hasSameColor.includes(true))
        })
        
        return !allColors.includes(true)
    }

    dfs(head: Node<T> | undefined): Map<T, boolean> {
        const visited: Map<T, boolean> = new Map()
        
        if (head) {
            this.walk(head, visited)
        }

        return visited
    }

    private walk(node: Node<T>, visited: Map<T, boolean>): void {
        if (!node) return;
    
        visited.set(node.value, true);
    
        node.adjacentNodes.forEach((node: Node<T>) => {
          if (!visited.has(node.value)) {
            this.walk(node, visited)
          }
        });
      }
}