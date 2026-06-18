export function formatDateTime(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export function parsePickerDateTime(selectedValue: string[]): Date {
  const year = Number(selectedValue[0])
  const month = Number(selectedValue[1]) - 1
  const day = Number(selectedValue[2])
  const hour = Number(selectedValue[3])
  const minute = Number(selectedValue[4])
  return new Date(year, month, day, hour, minute)
}
