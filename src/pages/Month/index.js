import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import classNames from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import DayBill from './components/DayBill'

const Month = () => {
  // 按月做数据分组
  const billList = useSelector(state => state.bill.billList)
  const groupedBillList = useMemo(() => {
    return _.groupBy(billList, item => dayjs(item.date).format('YYYY-MM'))
  }, [billList])

  // 控制弹框的打开和关闭
  const [dateVisible, setDateVisible] = useState(false)

  // 选择的月份
  const [currentDate, setCurrentDate] = useState(dayjs(new Date()).format('YYYY-MM'))

  // 当前月份账单数据
  const [currentMonthList, setCurrentMonthList] = useState([])

  const { pay, income, total } = useMemo(() => {
    // 支出
    const pay = currentMonthList.reduce((total, item) => {
      if (item.type === 'pay') {
        total += item.money
      }
      return total
    }, 0)
    // 收入
    const income = currentMonthList.reduce((total, item) => {
      if (item.type === 'income') {
        total += item.money
      }
      return total
    }, 0)
    // 结余
    const total = income + pay
    return { pay, income, total }
  }, [currentMonthList])

  // 当前月按日做分组
  const dayGroup = useMemo(() => {
    const groupData = _.groupBy(currentMonthList, item => dayjs(item.date).format('YYYY-MM-DD'))
    const keys = Object.keys(groupData)
    return { groupData, keys }
  }, [currentMonthList])
  const { groupData, keys } = dayGroup

  // 初始化时把当前月份的数据渲染出来
  useEffect(() => {
    const formatDate = dayjs().format('YYYY-MM')
    console.log('groupedBillList[formatDate]: ', groupedBillList[formatDate])
    groupedBillList[formatDate] && setCurrentMonthList(groupedBillList[formatDate])
  }, [groupedBillList])

  // 确认回调
  const onConfirm = date => {
    setDateVisible(false)
    const formatDate = dayjs(date).format('YYYY-MM')
    setCurrentDate(formatDate)
    setCurrentMonthList(groupedBillList[formatDate])
  }
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">{currentDate + ''}月账单</span>
            {/* 思路：根据当前弹框打开的状态控制expand类名是否存在 */}
            <span className={classNames('arrow', dateVisible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            onCancel={() => setDateVisible(false)}
            onConfirm={onConfirm}
            onClose={() => setDateVisible(false)}
            max={new Date()}
          />
        </div>
        {/* 单日列表统计 */}
        {keys.map(key => {
          return <DayBill key={key} date={key} billList={groupData[key]} />
        })}
      </div>
    </div>
  )
}
export default Month
