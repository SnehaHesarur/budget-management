import { RRule, RRuleSet } from 'rrule'
import moment from 'moment'

export function getDateTimes(startDate, endDate) {
  const rruleSet = new RRuleSet()
  rruleSet.rrule(new RRule({
    dtstart: moment(startDate, 'MM-DD-YYYY').toDate(),
    until: moment(endDate, 'MM-DD-YYYY').toDate(),
    freq: RRule.DAILY
  }))
  return rruleSet.all()
}
