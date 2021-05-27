export { validatePassword } from '~/lib/utility/validation'
import { performance } from 'perf_hooks'

export const delimitQueryValues = (ctx, keys) => {
  const query = ctx.state.query

  for (const key of keys) {
    if (query[key]) {
      query[key] = query[key].split(',')
    }
  }

  ctx.state.query = query
  return ctx
}

export const chunkArray = (arr, chunkSize = 10) => {
  let i
  let j
  const chunks = []
  for (i = 0, j = arr.length; i < j; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize) as never // TODO: What does this mean?
    chunks.push(chunk)
  }
  return chunks
}

export const offsetDate = (minutesOffset = 0) => {
  const todayDate = new Date()
  todayDate.setMinutes((todayDate.getMinutes() - todayDate.getTimezoneOffset()) + minutesOffset)
  return todayDate.toISOString().slice(0, 10)
}

// NOTE: I am manually offsetting by 5 hours since the server is in UTC but the
// Google Analytics data is in CST.
// This WILL cause a problem when DST happens.
export const lastHour = () => {
  const todayDate = new Date()
  todayDate.setMinutes((todayDate.getMinutes() - todayDate.getTimezoneOffset()) - 300 - 60)
  const lastHour = todayDate.toISOString().slice(11, 13)
  return parseInt(lastHour, 10)
}

export const convertSecondsToDaysText = (seconds) => {
  const totalDays = Math.round(parseInt(seconds, 10) / 86400)
  return `${totalDays > 1 ? `${totalDays} days` : '24 hours'}`
}

export const convertSecToHHMMSS = (sec: number) => {
  const totalSec = Math.floor(sec)
  const hours = totalSec / 3600 % 24
  const minutes = totalSec / 60 % 60
  const seconds = totalSec % 60
  let result = ''

  if (hours > 0) {
    result += hours + ':'
  }

  if (minutes > 9) {
    result += minutes + ':'
  } else if (minutes > 0 && hours > 0) {
    result += '0' + minutes + ':'
  } else if (minutes > 0) {
    result += minutes + ':'
  } else if (minutes === 0 && hours > 0) {
    result += '00:'
  }

  if (seconds > 9) {
    result += seconds
  } else if (seconds > 0 && minutes > 0) {
    result += '0' + seconds
  } else if (seconds > 0) {
    result += seconds
  } else {
    result += '00'
  }

  if (result.length === 2) {
    result = '0:' + result
  }

  if (result.length === 1) {
    result = '0:0' + result
  }

  return result
}

export const addOrderByToQuery = (qb, type, sort, sortDateKey) => {
  const ascKey = 'ASC'
  const descKey = 'DESC'

  if (sort === 'top-past-hour') {
    qb.orderBy(`${type}.pastHourTotalUniquePageviews`, descKey)
    qb.addOrderBy(`${type}.id`, descKey)
  } else if (sort === 'top-past-day') {
    qb.orderBy(`${type}.pastDayTotalUniquePageviews`, descKey)
    qb.addOrderBy(`${type}.id`, descKey)
  } else if (sort === 'top-past-month') {
    qb.orderBy(`${type}.pastMonthTotalUniquePageviews`, descKey)
    qb.addOrderBy(`${type}.id`, descKey)
  } else if (sort === 'top-past-year') {
    qb.orderBy(`${type}.pastYearTotalUniquePageviews`, descKey)
    qb.addOrderBy(`${type}.id`, descKey)
  } else if (sort === 'top-all-time') {
    qb.orderBy(`${type}.pastAllTimeTotalUniquePageviews`, descKey)
    qb.addOrderBy(`${type}.id`, descKey)
  } else if (sort === 'most-recent') {
    qb.orderBy(`${type}.${sortDateKey}`, descKey)
  } else if (sort === 'oldest') {
    qb.orderBy(`${type}.${sortDateKey}`, ascKey)
  } else if (sort === 'alphabetical') {
    qb.orderBy(`${type}.sortableTitle`, ascKey)
  } else if (sort === 'random') {
    qb.orderBy('RANDOM()')
  } else if (sort === 'chronological' && type === 'mediaRef') {
    qb.orderBy(`${type}.startTime`, ascKey)
  } else { // sort = top-past-week
    qb.orderBy(`${type}.pastWeekTotalUniquePageviews`, descKey)
    qb.addOrderBy(`${type}.id`, descKey)
  }

  return qb
}

// eslint-disable-next-line
// @ts-ignore
Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}

export const isBeforeDate = (expirationDate, dayOffset = 0) => {
  const currentDate = new Date() as any
  
  const offsetDate = currentDate.addDays(dayOffset)
  return new Date(expirationDate) > offsetDate
}

export const removeObjectKeysWithEmptyValues = obj =>
  Object.keys(obj).forEach((key) => (obj[key] == null) && delete obj[key])

export const convertToSlug = str => str.replace(/\s+/g, '-').toLowerCase().replace(/\W/g, '').trim()

export const convertToSortableTitle = (title: string) => {
  const sortableTitle = title
    ? title
      .toLowerCase()
      .replace(/\b^the\b|\b^a\b|\b^an\b/i, '')
      .trim()
    : ''
  return sortableTitle ? sortableTitle.replace(/#/g, '') : ''
}

export const isValidDate = (date: any) => date instanceof Date && !isNaN(date as any)

export const cleanFileExtension = (fileExtension: string) => {
  // If an invalid extension is provided, try to correct it.
  if (fileExtension.indexOf('png') >= 0) {
    return 'png'
  } else if (fileExtension.indexOf('jpg') >= 0) {
    return 'jpg'
  } else if (fileExtension.indexOf('jpeg') >= 0) {
    return 'jpeg'
  } else {
    return 'png'
  }
}

export const hasSupportedLanguageMatch = (lang1, lang2) => {
  if (lang1 && lang2) {
    const firstLang = lang1.split('-')[0]
    return lang2.indexOf(firstLang) >= 0
  } else {
    return false
  }
}

export const removeProtocol = (str: string) => {
  return str ? str.replace(/^https?\:\/\//i, '') : ''
}

export const logPerformance = (subject: string, stage: string, notes = '') => {
  console.log(subject + ',' + stage + ',' + Math.ceil(performance.now()).toString() + 'ms' + ',' + notes + ',')
}

export const _logStart = 'start'
export const _logEnd = 'end'

export const parseProp = (item: any, key: string, defaultValue: any) => {
  let val = defaultValue
  if (typeof item === 'object' && item[key]) {
    try {
      val = JSON.parse(item[key])
    } catch (error) {
      console.log(`parseProp ${key} error`, error)
    }
  }
  return val
}
