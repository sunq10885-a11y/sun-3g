export interface HealthRecord {
  id?: number | string
  recordTime: string
  description: string
  temperature: number | null | undefined
  medication: string
  symptom?: String
}
