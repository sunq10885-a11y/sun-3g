import request from './request'

export interface Course {
  id?: number | string
  name?: string
  [key: string]: unknown
}

export function getCourses() {
  return request.get<Course[]>('/courses')
}
