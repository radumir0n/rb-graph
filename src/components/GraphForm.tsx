import React, { useState } from 'react'

import useGraph from '../hooks/useGraph'

import { Graph } from '../services/graphService'

const GraphForm: React.FC = () => {
    const [
        graph,
        setGraph, 
        mapInputToGraphStruct,
        connectionMessage,
        colorableMessage] = useGraph()
    const [input, setInput] = useState('')

    const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value)
    }
    
    const onCheckGraph = () => {
        setGraph(new Graph<string>())
        mapInputToGraphStruct(input)
    }

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
                        <li>{connectionMessage}</li>
                        <li>{colorableMessage}</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default GraphForm