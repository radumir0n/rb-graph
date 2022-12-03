import React, { useState } from 'react'

import { Graph } from '../services/graphService'
import { hasValidCharacters } from '../services/validationService'
import { trimWhitespaces, timesInArray } from '../services/utilService'

type useGraphOutput = [
    Graph<string>,
    React.Dispatch<React.SetStateAction<Graph<string>>>,
    (input: string) => void
]

const useGraph = (): useGraphOutput => {
    const [graph, setGraph] = useState(new Graph<string>())

    const mapInputToGraphStruct = (input: string): void=> {
        let edges = getEdgesFromInput(input) as string[] 

        if (edges) {
            const graphInstance = new Graph<string>()
            const newEdges: string[] = []
            const splitEdges: string[] = []
            
            for(let i = 0; i < edges.length; i++) {
                if(timesInArray('-', edges[i]) > 1) {
                    const split: string[] = splitInputEdges(edges[i])

                    splitEdges.push(...split)
                }
            }

            if (splitEdges.length > 0) {
                const remainingEdges = edges.filter((edge: string) => timesInArray('-', edge) <= 1)

                newEdges.push(...splitEdges)
                newEdges.push(...remainingEdges)
            } else {
                newEdges.push(...edges)
            }

            if (newEdges.length === 1 && newEdges[0].length === 1) {
                graphInstance.addEdge(newEdges[0], newEdges[0])
                setGraph(graphInstance)
                return
            }
            
            for (let i = 0; i < newEdges.length; i++) {
                if (!newEdges[i].includes('-')) {
                    graphInstance.addEdge(newEdges[i], newEdges[i])
                } else {
                    const [a, b] = newEdges[i].split('-')
                    graphInstance.addEdge(a, b)
                    graphInstance.addEdge(b, a)
                }
                setGraph(graphInstance)
            }
        }
    }

    const getEdgesFromInput = (input: string): string[] | void => {
        if (!hasValidCharacters(input)) {
            console.log('Input has invalid characters')
            return
        }

        if (input.length === 0) {
            console.log('Input cannot be null')
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
    ]
}

export default useGraph