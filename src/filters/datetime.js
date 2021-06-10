import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import updateLocalePlugin from 'dayjs/plugin/updateLocale'
import relativeTimePlugin from 'dayjs/plugin/relativeTime'
import durationPlugin from 'dayjs/plugin/duration'

dayjs.extend(updateLocalePlugin)
dayjs.extend(relativeTimePlugin)
dayjs.extend(durationPlugin)

dayjs.locale('zh-cn')

dayjs.updateLocale('en', {
  relativeTime: {
    future: '%s后',
    past: '%s前',
    s: '刚刚',
    m: '1分钟',
    mm: '%d分钟',
    h: '1小时',
    hh: '%d小时',
    d: '1天',
    dd: '%d天',
    M: '1个月',
    MM: '%d个月',
    y: '1年',
    yy: '%d年',
  },
})

export function datetime(value, formatter = 'YYYY-MM-DD') {
  if (!value) {
    return
  }
  return dayjs(value).format(formatter)
}

export function secondsDuration(value) {
  if (value >= 0) {
    const v = dayjs.duration(value, 'seconds')
    const seconds = v.seconds().toString().padStart(2, '0')
    const minutes = v.minutes().toString().padStart(2, '0')
    const hours = v.asHours().toFixed(0)
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`
    }
    return `${minutes}:${seconds}`
  }
}

export function relativeTime(value) {
  if (!value) {
    return
  }
  return dayjs(value).fromNow()
}

export function startEndTime(value) {
  if (Array.isArray(value)) {
    const start = dayjs(value[0])
    const end = dayjs(value[1])

    if (!start.isValid() || !end.isValid()) {
      return
    }

    if (start.isSame(end, 'day')) {
      return `${start.format('YYYY-M-D HH:mm')} - ${end.format('HH:mm')}`
    } else if (start.isSame(end, 'year')) {
      return `${start.format('YYYY-M-D HH:mm')} 至 ${end.format('M-D HH:mm')}`
    } else {
      return `${start.format('YYYY-M-D HH:mm')} 至 ${end.format('YYYY-M-D HH:mm')}`
    }
  }
}

export function startEndTimeWithWeek(value) {
  if (Array.isArray(value)) {
    const start = dayjs(value[0])
    const end = dayjs(value[1])

    if (!start.isValid() || !end.isValid()) {
      return
    }

    if (start.isSame(end, 'day')) {
      return `${start.format('YYYY-M-D (ddd) HH:mm')} - ${end.format('HH:mm')}`
    } else if (start.isSame(end, 'year')) {
      return `${start.format('YYYY-M-D (ddd) HH:mm')} 至 ${end.format('M-D (ddd) HH:mm')}`
    } else {
      return `${start.format('YYYY-M-D (ddd) HH:mm')} 至 ${end.format('YYYY-M-D (ddd) HH:mm')}`
    }
  }
}
