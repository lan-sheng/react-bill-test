import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import './theme.css'

import sum from '@/sum'
const sum1 = sum(1, 2)
console.log('sum: ', sum1)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<RouterProvider router={router} />)
