import React from 'react'

import Graph from './Graph'

const GraphForm = () => {
  return (
    <>
        <div className="mb-3">
            <label className="form-label">Enter a graph:</label>
            <textarea className="form-control mb-3" placeholder='ex: a-b, b-c, c-d'></textarea>
            <div className="d-flex flex-row-reverse">
                <button className="btn btn-secondary">Check Graph</button>
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
                <Graph />
            </div>
        </div>
    </>
  )
}

export default GraphForm