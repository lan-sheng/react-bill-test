import classNames from 'classnames'
import './index.scss'
import { useMemo } from 'react'
const DayBill = ({ date, billList }) => {
  const { pay, income, total } = useMemo(() => {
    // 支出
    const pay = billList.reduce((total, item) => {
      if (item.type === 'pay') {
        total += item.money
      }
      return total
    }, 0)
    // 收入
    const income = billList.reduce((total, item) => {
      if (item.type === 'income') {
        total += item.money
      }
      return total
    }, 0)
    // 结余
    const total = income + pay
    return { pay, income, total }
  }, [billList])
  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          {/* expand 有这个类名 展开的箭头朝上的样子 */}
          {/* <span className={classNames('arrow', visible && 'expand')} onClick={() => setVisible(!visible)}></span> */}
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{total.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
      {/* 单日列表 */}
      {/* <div className="billList" style={{ display: visible ? 'block' : 'none' }}>
        {billList.map(item => {
          return (
            <div className="bill" key={item.id}>
              图标
              <Icon type={item.useFor} />
              <div className="detail">
                <div className="billType">{billTypeToName[item.useFor]}</div>
              </div>
              <div className={classNames('money', item.type)}>{item.money.toFixed(2)}</div>
            </div>
          )
        })}
      </div> */}
    </div>
  )
}
export default DayBill
