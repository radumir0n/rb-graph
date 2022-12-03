import React from 'react'
import GraphForm from './components/GraphForm'

const App: React.FC = () => {
  return (
    <div className="container mt-5">
      <h4>Red-blue colorable graph</h4>
      <p>Info: a word is a node, a dash an edge and a new line or a comma a separation between paths</p>
      <GraphForm />
    </div>
  )
}

export default App