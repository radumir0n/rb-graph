import React, { useEffect, useState } from 'react'

import RBGraph from './RBGraph'

import useGraph from '../hooks/useGraph'

import { Graph } from '../services/graphService'

const GraphForm: React.FC = () => {
    const [graph, setGraph, mapInputToGraphStruct] = useGraph()
    const [input, setInput] = useState('')
    const [graphToCheck, setGraphToCheck] = useState('')

    const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value)
    }

    const onCheckGraph = () => {
        setGraph(new Graph<string>())
        setGraphToCheck(input)
        mapInputToGraphStruct(graphToCheck)
    }

    useEffect(() => {
        console.log(graph)
    }, [graph])

    return (
        <>
            <div className="mb-3">
                <label className="form-label">Enter a graph:</label>
                <textarea className="form-control mb-3" 
                        placeholder='ex: a-b, b-c, c-d'
                        value={input}
                        onChange={onInputChange}>
                </textarea>
                <div className="d-flex flex-row-reverse">
                    <button className="btn btn-secondary" onClick={onCheckGraph}>Check Graph</button>
                </div>
            </div>
            <div className='d-flex flex-column'>
                <div className="mb-3">
                    Description:
                    <ul>
                        <li>Connected</li>
                        <li>Red-blue colorable</li>
                    </ul>
                </div>
                <div className="mb-3">
                    <RBGraph />
                </div>
            </div>
        </>
    )
}

export default GraphForm