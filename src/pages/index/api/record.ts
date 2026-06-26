import request from '../../../api/request'
import type { HealthRecord } from '../types'

export function getHealthRecords() {
  return request.get('/healthRecords')
}

export function createRecord(param: HealthRecord) {
  return request.post('/healthRecords', param)
}

export function deleteRecord(id: number) {
  return request.post('/healthRecords/delete', { id })
}
