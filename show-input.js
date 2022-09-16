const workdayBtn = document.querySelector('#workday-btn')
const holidayBtn = document.querySelector('#holiday-btn')
const tempBtn1 = document.querySelector('#btn-1')
const tempBtn2 = document.querySelector('#btn-2')
const form = document.querySelector('form')
const name = document.querySelector('#name')
const workNum = document.querySelector('#work-num')
const type = document.querySelector('#type')
const startDate = document.querySelector('#start-date')
const startTimeCheck = document.querySelector('#start-time-check')
const startYear = document.querySelector('#start-year')
const startMonth = document.querySelector('#start-month')
const startDay = document.querySelector('#start-day')
const startHour = document.querySelector('#start-hour')
const startMinute = document.querySelector('#start-minute')
const endDate = document.querySelector('#end-date')
const endTimeCheck = document.querySelector('#end-time-check')
const endYear = document.querySelector('#end-year')
const endMonth = document.querySelector('#end-month')
const endDay = document.querySelector('#end-day')
const endHour = document.querySelector('#end-hour')
const endMinute = document.querySelector('#end-minute')
const breakTime = document.querySelector('#break-time')
const overtimeReason = document.querySelector('#overtime-reason')
const noBreakReason = document.querySelector('.no-break-reason')
const noBreakReasonInput = document.querySelector('#no-break-reason')
const saveBtn = document.querySelector('#save-btn')
const saveTemp1 = document.querySelector('#save-temp1')
const saveTemp2 = document.querySelector('#save-temp2')

const today = new Date()
const theDay = new Date() // 建立時間物件
const changeDay = -1 // 設定要往前或往後幾天
const timeStamp = theDay.setDate(theDay.getDate() + changeDay) // theDay.getDate() 是用來取得今天是幾號
const todayData = {
  year: String(today.getFullYear()),
  month: String(today.getMonth() + 1).padStart(2, '0'),
  date: String(today.getDate()).padStart(2, '0'),
  hour: String(today.getHours()).padStart(2, '0')
}
const yesterdayData = {
  year: String(theDay.getFullYear()),
  month: String(theDay.getMonth() + 1).padStart(2, '0'),
  date: String(theDay.getDate()).padStart(2, '0')
}
const btnArray = [
  workdayBtn,
  holidayBtn,
  tempBtn1,
  tempBtn2
]

btnArray.forEach(btn => {
  btn.addEventListener('click', event => {
    form.classList.remove('hidden')
    document.querySelectorAll('button').forEach(btn => {
      btn.classList.remove('btn-dark')
      saveBtn.classList.remove('none')
      saveTemp1.classList.add('none')
      saveTemp2.classList.add('none')
    })
    event.target.classList.add('btn-dark')
  })
})

workdayBtn.addEventListener('click', event => {
  // 帶入 value
  const saveData = JSON.parse(localStorage.getItem('workdayTemp'))
  let startValue = ''
  let endValue = ''

  if (Number(todayData.hour) >= 8 && Number(todayData.hour) < 20) {
    startValue = `${todayData.year}-${todayData.month}-${todayData.date}T05:00`
    startTimeCheck.innerHTML = '上午(AM)'
    endValue = `${todayData.year}-${todayData.month}-${todayData.date}T08:00`
    endTimeCheck.innerHTML = '上午(AM)'
  } else if (Number(todayData.hour) >= 20 && Number(todayData.hour) < 8) {
    startValue = `${todayData.year}-${todayData.month}-${todayData.date}T17:00`
    startTimeCheck.innerHTML = '下午(PM)'
    endValue = `${todayData.year}-${todayData.month}-${todayData.date}T20:00`
    endTimeCheck.innerHTML = '下午(PM)'
  }

  type.options.selectedIndex = 0
  startDate.value = startValue
  endDate.value = endValue
  breakTime.value = 1
  overtimeReason.value = '配合生產'

  startYear.value = startValue.substr(0, 4)
  startMonth.value = startValue.substr(5, 2)
  startDay.value = startValue.substr(8, 2)
  startHour.value = startValue.substr(11, 2)
  startMinute.value = startValue.substr(14, 2)

  endYear.value = endValue.substr(0, 4)
  endMonth.value = endValue.substr(5, 2)
  endDay.value = endValue.substr(8, 2)
  endHour.value = endValue.substr(11, 2)
  endMinute.value = endValue.substr(14, 2)

  if (saveData) {
    name.value = saveData.name
    workNum.value = saveData.workNum
    overtimeReason.value = saveData.overtimeReason
  }
})

holidayBtn.addEventListener('click', event => {
  // 帶入 value
  const saveData = JSON.parse(localStorage.getItem('holidayTemp'))
  let startValue = ''
  let endValue = ''

  if (Number(todayData.hour) >= 5 && Number(todayData.hour) < 8) {
    startValue = `${yesterdayData.year}-${yesterdayData.month}-${yesterdayData.date}T20:00`
    startTimeCheck.innerHTML = '下午(PM)'
    endValue = `${todayData.year}-${todayData.month}-${todayData.date}T05:00`
    endTimeCheck.innerHTML = '上午(AM)'
    breakTime.value = 1
  } else if (Number(todayData.hour) >= 8 && Number(todayData.hour) < 17) {
    startValue = `${yesterdayData.year}-${yesterdayData.month}-${yesterdayData.date}T20:00`
    startTimeCheck.innerHTML = '下午(PM)'
    endValue = `${todayData.year}-${todayData.month}-${todayData.date}T08:00`
    endTimeCheck.innerHTML = '上午(AM)'
    breakTime.value = 2
  } else if (Number(todayData.hour) >= 17 && Number(todayData.hour) < 20) {
    startValue = `${todayData.year}-${todayData.month}-${todayData.date}T08:00`
    startTimeCheck.innerHTML = '上午(AM)'
    endValue = `${todayData.year}-${todayData.month}-${todayData.date}T17:00`
    endTimeCheck.innerHTML = '下午(PM)'
    breakTime.value = 1
  } else if (Number(todayData.hour) >= 20 && Number(todayData.hour) < 5) {
    startValue = `${todayData.year}-${todayData.month}-${todayData.date}T08:00`
    startTimeCheck.innerHTML = '上午(AM)'
    endValue = `${todayData.year}-${todayData.month}-${todayData.date}T20:00`
    endTimeCheck.innerHTML = '下午(PM)'
    breakTime.value = 2
  }

  type.options.selectedIndex = 2
  startDate.value = startValue
  endDate.value = endValue
  overtimeReason.value = '假日配合生產保養'

  startYear.value = startValue.substr(0, 4)
  startMonth.value = startValue.substr(5, 2)
  startDay.value = startValue.substr(8, 2)
  startHour.value = startValue.substr(11, 2)
  startMinute.value = startValue.substr(14, 2)

  endYear.value = endValue.substr(0, 4)
  endMonth.value = endValue.substr(5, 2)
  endDay.value = endValue.substr(8, 2)
  endHour.value = endValue.substr(11, 2)
  endMinute.value = endValue.substr(14, 2)

  if (saveData) {
    name.value = saveData.name
    workNum.value = saveData.workNum
    overtimeReason.value = saveData.overtimeReason
  }
})

startDate.addEventListener('input', event => {
  const inputValue = event.target.value
  const year = document.querySelector('#start-year')
  const month = document.querySelector('#start-month')
  const day = document.querySelector('#start-day')
  const hour = document.querySelector('#start-hour')
  const minute = document.querySelector('#start-minute')
  year.value = inputValue.substr(0, 4)
  month.value = inputValue.substr(5, 2)
  day.value = inputValue.substr(8, 2)
  hour.value = inputValue.substr(11, 2)
  minute.value = inputValue.substr(14, 2)
  if (Number(hour.value) < 12) {
    startTimeCheck.innerHTML = '上午(AM)'
  } else {
    startTimeCheck.innerHTML = '下午(PM)'
  }
})

endDate.addEventListener('input', event => {
  const inputValue = event.target.value
  const year = document.querySelector('#end-year')
  const month = document.querySelector('#end-month')
  const day = document.querySelector('#end-day')
  const hour = document.querySelector('#end-hour')
  const minute = document.querySelector('#end-minute')
  year.value = inputValue.substr(0, 4)
  month.value = inputValue.substr(5, 2)
  day.value = inputValue.substr(8, 2)
  hour.value = inputValue.substr(11, 2)
  minute.value = inputValue.substr(14, 2)
  if (Number(hour.value) < 12) {
    endTimeCheck.innerHTML = '上午(AM)'
  } else {
    endTimeCheck.innerHTML = '下午(AM)'
  }
})

saveBtn.addEventListener('click', event => {
  const saveData = {
    name: name.value,
    workNum: workNum.value,
    overtimeReason: overtimeReason.value
  }
  localStorage.setItem('holidayTemp', JSON.stringify(saveData))
  alert('儲存成功')
})

// tempBtn1.addEventListener('click', event => {
//   form.reset()
//   saveBtn.classList.add('none')
//   saveTemp1.classList.remove('none')
//   saveTemp2.classList.add('none')
//   const temp = JSON.parse(localStorage.getItem('temp1'))
//   if (temp) {
//     name.value = temp.name
//     workNum.value = temp.workNum
//     type.value = temp.type
//     startDate.value = temp.startDate
//     endDate.value = temp.endDate
//     breakTime.value = temp.breakTime
//     overtimeReason.value = temp.overtimeReason

//     startHour.value = temp.startDate.substr(11, 2)
//     startMinute.value = temp.startDate.substr(14, 2)

//     endHour.value = temp.endDate.substr(11, 2)
//     endMinute.value = temp.endDate.substr(14, 2)
//   }
// })

// tempBtn2.addEventListener('click', event => {
//   form.reset()
//   saveBtn.classList.add('none')
//   saveTemp1.classList.add('none')
//   saveTemp2.classList.remove('none')
//   const temp = JSON.parse(localStorage.getItem('temp2'))
//   if (temp) {
//     name.value = temp.name
//     workNum.value = temp.workNum
//     type.value = temp.type
//     startDate.value = temp.startDate
//     endDate.value = temp.endDate
//     breakTime.value = temp.breakTime
//     overtimeReason.value = temp.overtimeReason

//     startHour.value = temp.startDate.substr(11, 2)
//     startMinute.value = temp.startDate.substr(14, 2)

//     endHour.value = temp.endDate.substr(11, 2)
//     endMinute.value = temp.endDate.substr(14, 2)
//   }
// })

// saveTemp1.addEventListener('click', event => {
//   const temp1 = {
//     name: name.value,
//     workNum: workNum.value,
//     type: type.value,
//     startDate: startDate.value,
//     endDate: endDate.value,
//     breakTime: breakTime.value,
//     overtimeReason: overtimeReason.value
//   }
//   localStorage.setItem('temp1', JSON.stringify(temp1))
//   alert('儲存成功')
// })

// saveTemp2.addEventListener('click', event => {
//   const temp2 = {
//     name: name.value,
//     workNum: workNum.value,
//     type: type.value,
//     startDate: startDate.value,
//     endDate: endDate.value,
//     breakTime: breakTime.value,
//     overtimeReason: overtimeReason.value
//   }
//   localStorage.setItem('temp2', JSON.stringify(temp2))
//   alert('儲存成功')
// })