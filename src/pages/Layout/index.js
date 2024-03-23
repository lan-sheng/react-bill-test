import { getBillList } from '@/store/modules/billStore'
import { Button } from 'antd-mobile'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  const dispatch= useDispatch()
  useEffect(() => {
    dispatch(getBillList())
  }, [dispatch])
  return (
    <div>
      Layout
      <Button color="primary">全局样式</Button>
      <div className="puple">
        <Button color="primary">局部样式</Button>
      </div>
      <Outlet />
    </div>
  )
}
export default Layout
