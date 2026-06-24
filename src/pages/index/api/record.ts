import request from '../../../api/request'

export interface Record {
  id?: number | string
  record_time?: string
  description: string
  temperature: number
  medication: string
}

export function getHealthRecords() {
  return request.get('/healthRecords')
}

export function createRecord(param: Record) {
  return request.post('/healthRecords', param)
}
