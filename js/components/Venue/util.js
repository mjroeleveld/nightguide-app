import moment from 'moment';

export function parseTime(time) {
  const split = time.split(':');
  const parsed = moment().hours(split[0]);
  if (split[1]) {
    parsed.minutes(split[1]);
  } else {
    parsed.minutes(0);
  }
  return parsed;
}

export function checkIsOpenFromSchedule(schedule) {
  const todayScheduleParsed = getDayScheduleParsed(schedule);
  return (
    todayScheduleParsed &&
    moment().isBetween(todayScheduleParsed.from, todayScheduleParsed.to)
  );
}

export function getDayKey(dowOffset = 0) {
  return moment()
    .add(dowOffset, 'days')
    .locale('en')
    .format('ddd')
    .toLowerCase();
}

export function getDayScheduleParsed(schedule, dowOffset = 0) {
  const dayKey = getDayKey(dowOffset);
  const daySchedule = schedule[dayKey];

  if (!daySchedule || !daySchedule.from || !daySchedule.to) {
    return null;
  }

  const from = parseTime(daySchedule.from).add(dowOffset, 'days');
  let to = parseTime(daySchedule.to).add(dowOffset, 'days');
  // If nighttime (03:00)
  if (to.isBefore(from)) {
    to = to.add(1, 'days');
  }

  return {
    from,
    to,
  };
}