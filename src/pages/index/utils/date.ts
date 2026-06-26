export interface ParsedDate {
  year: number
  month: number
  day: number
}

const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

export function recordDateToDayKey(year: number, month: number, date: number): string {
  return `${year}${String(month).padStart(2, '0')}${String(date).padStart(2, '0')}`
}

export function formatRecordDate(dateStr: string): string {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  let yearStr = ''
  if (year !== new Date().getFullYear()) {
    yearStr = year + '年'
  }
  return `${yearStr}${date.getMonth() + 1}月${date.getDate()}日 ${WEEKDAYS[date.getDay()]}`
}
