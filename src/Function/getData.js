import { stationCode } from '../Function/station';
import axios from 'axios';

const getData = async (stationFrom, stationTo, date, setTrain) => {
    var url = `https://ptx.transportdata.tw/MOTC/v3/Rail/TRA/DailyTrainTimetable/OD/${stationCode(stationFrom)}/to/${stationCode(stationTo)}/${date}?$top=30&$format=JSON`
    const res = await axios.get(url)
    var info = [], id = 1;
    const { TrainTimetables } = res.data
    console.log(res)

    TrainTimetables.forEach(train => {
        info.push({
            id: id,
            date: res.data.TrainDate,
            from: train.StopTimes[0].StationName.Zh_tw,
            to: train.StopTimes[1].StationName.Zh_tw,
            fromTime: train.StopTimes[0].ArrivalTime,
            toTime: train.StopTimes[1].ArrivalTime,
            trainNo: train.TrainInfo.TrainNo,
            trainType: train.TrainInfo.TrainTypeName.Zh_tw.indexOf('(') >= 0 ? train.TrainInfo.TrainTypeName.Zh_tw.substring(0, train.TrainInfo.TrainTypeName.Zh_tw.indexOf('(')) : train.TrainInfo.TrainTypeName.Zh_tw,
            timeDiff: Timediff(train.StopTimes[0].ArrivalTime, train.StopTimes[1].ArrivalTime),
            TripLine: train.TrainInfo.TripLine,  // 1:'山線',2:'海線',3:'成追線'
            WheelChairFlag: train.TrainInfo.WheelChairFlag, // 是否設身障旅客專用座位車 : [0:'否',1:'是'] 
            BreastFeedFlag: train.TrainInfo.BreastFeedFlag, // 是否設有哺(集)乳室車廂 : [0:'否',1:'是'] 
        })
        id++
    })

    if (setTrain) {
        setTrain(info)
    }

    return info
}

function Timediff(start, end) {
    start = start.split(":");
    end = end.split(":");
    var startDate = new Date(0, 0, 0, (start[0] === '00' ? '24' : start[0]), start[1], 0);
    var endDate = new Date(0, 0, 0, (end[0] === '00' ? '24' : end[0]), end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);

    return hours + "時" + (minutes < 9 ? "0" : "") + minutes + "分";
}


export { getData }