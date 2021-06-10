import {
  datetime,
  secondsDuration,
  relativeTime,
  startEndTime,
  startEndTimeWithWeek,
} from './datetime'
import { hidePhoneNumber } from './phone-number'
import { htmlWithoutTag, ellipsis } from './html'

export const filters = {
  // datetime
  datetime,
  secondsDuration,
  relativeTime,
  startEndTime,
  startEndTimeWithWeek,
  // phone-number
  hidePhoneNumber,
  // html
  htmlWithoutTag,
  ellipsis,
}

export default {
  install: Vue => {
    for (let key in filters) {
      Vue.filter(key, filters[key])
    }
  },
}
