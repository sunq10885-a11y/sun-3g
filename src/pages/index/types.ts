export type StatusClass = 'warn' | 'good'

export interface DailyRecord {
  date: string
  temp: string
  tempClass: StatusClass
  summary: string
  summaryClass: StatusClass
  symptoms: string
  medicine: string
  note: string
}

export interface RecordFormValues {
  recordTime: Date
  description: string
  temperature: number
  medicine: string
}
