import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Table from './Table'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>Employee Data Table</h1>

<Table/>      
    </>
  )
}

export default App
