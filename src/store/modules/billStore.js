import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const billStore = createSlice({
  name: 'bill',
  initialState: {
    billList: [],
  },
  reducers: {
    // 同步修改方法
    setBillList(state, { payload }) {
      state.billList = payload
    },
  },
})
// 解构actionCreator函数
const { setBillList } = billStore.actions

// 编写异步
const getBillList = () => {
  // 编写异步请求，触发同步reducer方法
  return async dispatch => {
    const res = await axios.get('http://localhost:8888/ka')
    dispatch(setBillList(res.data))
  }
}

const reducer = billStore.reducer

export default reducer
export { getBillList }
