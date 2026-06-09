import type { CalendarCardDay } from '@nutui/nutui-react'
import { CalendarCard as NutCalendarCard } from '@nutui/nutui-react'
import '@nutui/nutui-react/dist/es/packages/calendarcard/style/css'
import { useMemo } from 'react'
import { recordDateToDayKey } from '../../utils/date'
import './CalendarCard.scss'

interface CalendarCardProps {
  recordDates: string[]
}

export default function CalendarCard({ recordDates }: CalendarCardProps) {
  const recordDateSet = useMemo(() => new Set(recordDates), [recordDates])

  const isRecordDay = (day: CalendarCardDay) => {
    return recordDateSet.has(recordDateToDayKey(day.year, day.month, day.date))
  }

  const renderDay = (day: CalendarCardDay) => {
    return <div className={`inner-date ${isRecordDay(day) ? 'active' : ''}`}>{day.date}</div>
  }

  return (
    <section className="illness-calendar-card card">
      <NutCalendarCard className="illness-calendar-card__inner" renderDay={renderDay} />
    </section>
  )
}
