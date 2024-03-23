import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import sum from '@/sum'
const sum1 = sum(1, 2)
console.log('sum: ', sum1)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
