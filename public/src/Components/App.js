import '../App.css';
import { getData } from '../Function/getData';
import { getDate } from '../Function/getDate';
import { useState } from 'react';
import { List } from './List';
var moment = require('moment');


function App() {

  const [string, setString] = useState('')
  const [train, setTrain] = useState([])
  const [title, setTitle] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState(0)

  var date, arr = [], ShowType = ''

  const handleSearch = async () => {
    setTrain([])
    arr = string.split(' ')
    let trainType = ['自強', '普悠瑪', '區間', '區間快', '太魯閣', '莒光']

    if (arr.length === 3 && trainType.indexOf(arr[2]) < 0) {   // A B 時間
      date = getDate(arr[2])
      getData(arr[0], arr[1], date, setTrain)
    }

    else if (arr.length === 3 && trainType.indexOf(arr[2]) >= 0) { // A B 車種
      date = moment().format('YYYY-MM-DD')
      ShowType = arr[2]
      getData(arr[0], arr[1], date)
        .then(data => {
          data = data.filter(train => train.trainType === arr[2] ? train : false)
          setTrain(data)
        })
    }

    else if (arr.length === 2) {  // A B
      date = moment().format('YYYY-MM-DD')
      getData(arr[0], arr[1], date, setTrain)
    }

    else if (arr.length === 4) {  // A B 時間 車種
      date = getDate(arr[2])
      ShowType = arr[3]
      getData(arr[0], arr[1], date)
        .then(data => {
          data = data.filter(train => train.trainType === arr[3] ? train : false)
          setTrain(data)
        })
    }
    setTitle(`${date} ${arr[0]} 至 ${arr[1]} ${ShowType} 結果如下`)
    setShow(true)
  }

  const handleInputChange = (e) => {
    setString(e.target.value)
  }

  return (
    <div className='App'>
      <h1 onClick={() => window.location.reload()} className='cursor-pointer text-4xl'>台鐵班次時刻查詢</h1>
      <div className='search'>
        <input className='form-control' type='text' placeholder='範例:「台北 高雄」「鳳山 新左營 7/1」「台北 花蓮 太魯閣」 「台中 彰化 3/7 莒光」' onChange={handleInputChange}></input>
        <button className='btn btn-primary' onClick={handleSearch}>查詢</button>
      </div>
      <div className={`searchTitle ${train.length === 0 ? 'hide' : ''} my-8`}>{title}</div>
      <div className={`tutorial ${show ? 'hide' : ''} text-3xl`}>
        <ul>格式: [起站] [迄站] [日期/車種] [車種]</ul>
        <ul>一、&nbsp;起迄站必填，若日期/車種都空白預設為今日所有車種，第三格自動判斷填入為車種or日期</ul>
        <ul>二.&nbsp;日期格式支援
          <li>1. YYYY-MM-DD&nbsp;&nbsp;例:2021-07-04</li>
          <li>2. MM/DD&nbsp;&nbsp;例:7/1 or 07/01 (月份/日期可不補零)</li>
          <li>3.  今天 明天 後天 大後天</li>
        </ul>
        <ul>三.&nbsp;車種可填: 普悠瑪/太魯閣/自強/莒光/區間快/區間</ul>
        <ul>四.&nbsp;每個參數中間皆需要加空白</ul>
      </div>

      <div className={`list ${show ? '' : 'hide'} ${train.length === 0 ? 'hide' : ''}`}>
        <div className='flex flex-col'>
          {train?.map(train => (<List key={train.id} date={train.date} from={train.from} to={train.to}
            fromTime={train.fromTime} toTime={train.toTime}
            trainNo={train.trainNo} trainType={train.trainType}
            timeDiff={train.timeDiff} TripLine={train.TripLine}
            WheelChairFlag={train.WheelChairFlag} BreastFeedFlag={train.BreastFeedFlag} />))}
        </div>
      </div>
      <div className={`error ${train.length === 0 && show ? '' : 'hide'}`}>沒有搜尋結果<br></br>請檢查輸入條件是否正確</div>
    </div>
  );

}


export default App;
