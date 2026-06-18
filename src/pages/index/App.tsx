import { useEffect, useState } from 'react'
import { getCourses, type Course } from '../../api/courses'
import { CalendarCard } from './components/CalendarCard'
import { RecordFormPopup } from './components/RecordFormPopup'
import type { DailyRecord, RecordFormValues } from './types'
import { formatRecordDate } from './utils/date'

const dailyRecords: DailyRecord[] = [
  {
    date: '20260501',
    temp: '37.8°C',
    tempClass: 'warn',
    summary: '一般',
    summaryClass: 'warn',
    symptoms: '咳嗽、流鼻涕、轻微发烧',
    medicine: '小儿感冒颗粒 1袋 2次/日',
    note: '晚上咳嗽多，精神一般',
  },
  {
    date: '20260502',
    temp: '37.2°C',
    tempClass: 'warn',
    summary: '好转',
    summaryClass: 'good',
    symptoms: '咳嗽、流鼻涕',
    medicine: '小儿感冒颗粒 1袋 2次/日',
    note: '食欲一般',
  },
  {
    date: '20260503',
    temp: '36.6°C',
    tempClass: 'good',
    summary: '已好转',
    summaryClass: 'good',
    symptoms: '流鼻涕',
    medicine: '—',
    note: '精神好，食欲正常',
  },
  {
    date: '20260504',
    temp: '36.6°C',
    tempClass: 'good',
    summary: '已好转',
    summaryClass: 'good',
    symptoms: '流鼻涕',
    medicine: '—',
    note: '精神好，食欲正常',
  },
  {
    date: '20260505',
    temp: '36.6°C',
    tempClass: 'good',
    summary: '已好转',
    summaryClass: 'good',
    symptoms: '流鼻涕',
    medicine: '—',
    note: '精神好，食欲正常',
  },
  {
    date: '20260506',
    temp: '36.6°C',
    tempClass: 'good',
    summary: '已好转',
    summaryClass: 'good',
    symptoms: '流鼻涕',
    medicine: '—',
    note: '精神好，食欲正常',
  },
  {
    date: '20260507',
    temp: '36.6°C',
    tempClass: 'good',
    summary: '已好转',
    summaryClass: 'good',
    symptoms: '流鼻涕',
    medicine: '—',
    note: '精神好，食欲正常',
  },
  {
    date: '20260508',
    temp: '36.6°C',
    tempClass: 'good',
    summary: '已好转',
    summaryClass: 'good',
    symptoms: '流鼻涕',
    medicine: '—',
    note: '精神好，食欲正常',
  },
]

function App() {
  const recordDates = dailyRecords.map((record) => record.date)
  const [courses, setCourses] = useState<Course[]>([])
  const [coursesError, setCoursesError] = useState('')
  const [recordPopupVisible, setRecordPopupVisible] = useState(false)

  useEffect(() => {
    getCourses()
      .then((response) => {
        setCourses(response.data)
      })
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : '课程列表加载失败'
        setCoursesError(message)
      })
  }, [])

  const handleRecordSubmit = (values: RecordFormValues) => {
    console.log('新建记录', values)
  }

  return (
    <main className="page">
      <section className="profile-card card">
        <div className="avatar">👦</div>
        <div className="profile-info">
          <div className="profile-name">小宝</div>
          <div className="profile-age">3岁2个月</div>
        </div>
      </section>

      <CalendarCard recordDates={recordDates} />

      <button
        type="button"
        className="create-record-btn"
        onClick={() => setRecordPopupVisible(true)}
      >
        + 新建记录
      </button>

      <RecordFormPopup
        visible={recordPopupVisible}
        onClose={() => setRecordPopupVisible(false)}
        onSubmit={handleRecordSubmit}
      />

      <section className="section-block">
        <h2 className="section-title">病程记录</h2>
        <div className="summary-card">
          <div className="summary-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
              <path d="M9 3v12.5a3.5 3.5 0 1 0 2 0V3H9z" fill="#007AFF" />
              <path d="M8 3h8v2H8V3z" fill="#007AFF" />
              <circle cx="10" cy="18.5" r="1.5" fill="#FF9500" />
            </svg>
          </div>
          <div className="summary-content">
            <div className="summary-top">
              <span className="summary-disease">感冒</span>
              <span className="tag tag-ended">已结束</span>
            </div>
            <div className="summary-date">5月1日 - 5月3日 共3天</div>
            <div className="summary-symptoms">症状：咳嗽、流鼻涕、低烧</div>
          </div>
          <span className="chevron">›</span>
        </div>
        <p className="section-tip">
          <span className="tip-icon">ⓘ</span>
          超过2天未记录会自动结束当前病程
        </p>
      </section>

      <section className="timeline-section">
        <div className="timeline-header">
          <span className="timeline-bar" />
          <span className="timeline-title">感冒 (5月1日 - 5月3日 共3天)</span>
          <button type="button" className="timeline-toggle">
            收起 ^
          </button>
        </div>

        <div className="timeline-list">
          {dailyRecords.map((record) => (
            <div key={record.date} className="timeline-item">
              <div className="timeline-node" />
              <div className="timeline-date">{formatRecordDate(record.date)}</div>
              <div className="daily-card">
                <div className="daily-card-head">
                  <span className={`daily-summary ${record.summaryClass}`}>
                    小结：{record.summary}
                  </span>
                </div>
                <div className="daily-row">
                  <span className="daily-label">体温：</span>
                  <span className={`daily-value ${record.tempClass}`}>{record.temp}</span>
                </div>
                <div className="daily-row">
                  <span className="daily-label">症状：</span>
                  <span className="daily-value">{record.symptoms}</span>
                </div>
                <div className="daily-row">
                  <span className="daily-label">用药：</span>
                  <span className="daily-value">{record.medicine}</span>
                </div>
                <div className="daily-row">
                  <span className="daily-label">备注：</span>
                  <span className="daily-value">{record.note}</span>
                </div>
                <span className="daily-chevron">›</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
