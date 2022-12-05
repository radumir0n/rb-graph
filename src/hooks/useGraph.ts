import React, { useState, useEffect } from 'react'

import { Graph } from '../services/graphService'
import { hasValidCharacters, hasRepeatedCommasAndDashes } from '../services/validationService'
import { trimWhitespaces, timesInArray } from '../services/utilService'

type useGraphOutput = [
    Graph<string>,
    React.Dispatch<React.SetStateAction<Graph<string>>>,
    (input: string) => void,
    string,
    string
]

const useGraph = (): useGraphOutput => {
    const defaultGraphMessage = 'Graph is not defined'
    const [graph, setGraph] = useState(new Graph<string>())
    const [connectionMessage, setConnectionMessage] = useState<string>(defaultGraphMessage)
    const [isConnected, setIsConnected] = useState<boolean | undefined>(undefined)
    const [colorableMessage, setColorableMessage] = useState<string>(defaultGraphMessage)
    const [isRBColorable, setIsRBColorable] = useState<boolean | undefined>(undefined)
    const [firstKey] = graph.nodes.keys()

    useEffect(() => {
        setIsConnected(graph.isConnected(graph.nodes.get(firstKey)))

        if(isConnected) {
            setConnectionMessage('Graph is connected')
        } else if (!isConnected && isConnected !== undefined) {
            setConnectionMessage('Graph is disconnected')
        } else {
            setConnectionMessage(defaultGraphMessage)
        }
    }, [graph, isConnected])

    useEffect(() => {
        setIsRBColorable(graph.isRedBlueColorable(graph.nodes.get(firstKey)))

        if(isRBColorable) {
            setColorableMessage('Graph is red-blue colorable')
        } else if (!isRBColorable && isRBColorable !== undefined) {
            setColorableMessage('Graph is not red-blue colorable')
        } else {
            setColorableMessage(defaultGraphMessage)
        }
    }, [graph, isRBColorable])

    const mapInputToGraphStruct = (input: string): void => {
        let edges: any[] | void = getEdgesFromInput(input)

        if (edges) {
            const graphInstance = new Graph<string>()
            
            for(let i = 0; i < edges.length; i++) {
                if(timesInArray('-', edges[i]) > 1) {
                    const split: string[] = splitInputEdges(edges[i])

                    edges.splice(i, 1, ...split)
                }
            }
            
            for (let i = 0; i < edges.length; i++) {
                if (!edges[i].includes('-')) {
                    graphInstance.addNode(edges[i])
                } else {
                    const [a, b] = edges[i].split('-')
                    if (a.length === 0) {
                        graphInstance.addNode(b)
                    } else if (b.length === 0) {
                        graphInstance.addNode(a)
                    } else {
                        graphInstance.addEdge(a, b)
                    }
                }
                setGraph(graphInstance)
            }
        }
    }

    const getEdgesFromInput = (input: string): string[] | void => {
        if (!hasValidCharacters(input)) {
            alert('Input has invalid characters')
            return
        }

        if (input.length === 0) {
            alert('Input cannot be null')
            return
        }

        if(hasRepeatedCommasAndDashes(input)) {
            alert('Input has invalid structure')
            return
        }

        const value = trimWhitespaces(input)

        if (!value.includes(',') && !value.includes('\n')) {
            return [value]
        }

        const edges = value.split(/[,/\n/]/).filter((edge: string) => edge.length > 0)

        return edges
    }

    const splitInputEdges = (input: string): string[] => {
        return input
            .split('')
            .reduce((acc: string[], curr: string, idx: number, arr: string[]) => {
                if (curr === '-') {
                    acc.push(`${arr[idx - 1]}-${arr[idx + 1]}`)
                }

                return acc
            }, [])
    }

    return [
        graph,
        setGraph,
        mapInputToGraphStruct,
        connectionMessage,
        colorableMessage
    ]
}

export default useGraph