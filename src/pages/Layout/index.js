import { Button } from 'antd-mobile'
import { Outlet } from 'react-router-dom'

const Layout = () => {
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
