// src\router\index.js
import Layout from '@/pages/Layout'
import Month from '@/pages/Month'
import New from '@/pages/New'
import Year from '@/pages/Year'

import { createBrowserRouter } from 'react-router-dom'
// 创建路由实例 绑定path element
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/year',
        element: <Year />, // Year,
      },
      {
        path: '/month',
        element: <Month />, // Month,
      },
    ],
  },
  {
    path: '/new',
    element: <New />,
  },
])
export default router
