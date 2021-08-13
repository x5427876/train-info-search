var moment = require('moment');

function getDate(date) {
    let newDate;
    let twoDigDay1 = '0' + date.substring(2)
    let twoDigDay2 = '0' + date.substring(3)
    const today = new Date()
    if (date.indexOf('/') >= 1) {
        newDate = `${today.getFullYear()}-0${date.substring(0, 1)}-${date.substring(2).length === 1 ? twoDigDay1 : date.substring(2)}`
    }
    if (date.indexOf('/') >= 2) {
        newDate = `${today.getFullYear()}-${date.substring(0, 2)}-${date.substring(3).length === 1 ? twoDigDay2 : date.substring(3)}`
    }
    if (date === '今天') {
        newDate = moment().format('YYYY-MM-DD')
    }
    else if (date === '明天') {
        newDate = moment().add(1, 'days').format('YYYY-MM-DD')
    }
    else if (date === '後天') {
        newDate = moment().add(2, 'days').format('YYYY-MM-DD')
    }
    else if (date === '大後天') {
        newDate = moment().add(3, 'days').format('YYYY-MM-DD')
    }
    return newDate
}

export { getDate }


