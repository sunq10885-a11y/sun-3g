export interface ParsedDate {
  year: number
  month: number
  day: number
}

const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

export function parseRecordDate(dateStr: string): ParsedDate {
  return {
    year: Number(dateStr.slice(0, 4)),
    month: Number(dateStr.slice(4, 6)),
    day: Number(dateStr.slice(6, 8)),
  }
}

export function recordDateToDate(dateStr: string): Date {
  const { year, month, day } = parseRecordDate(dateStr)
  return new Date(year, month - 1, day)
}

export function recordDateToDayKey(year: number, month: number, date: number): string {
  return `${year}${String(month).padStart(2, '0')}${String(date).padStart(2, '0')}`
}

export function formatRecordDate(dateStr: string): string {
  const { year, month, day } = parseRecordDate(dateStr)
  const date = new Date(year, month - 1, day)
  return `${month}月${day}日 ${WEEKDAYS[date.getDay()]}`
}
