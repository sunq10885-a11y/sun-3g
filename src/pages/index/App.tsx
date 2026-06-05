interface CalendarDay {
  day: number | ''
  empty?: boolean
  sick?: boolean
  rangeStart?: boolean
  rangeEnd?: boolean
}

type StatusClass = 'warn' | 'good'

interface DailyRecord {
  date: string
  temp: string
  tempClass: StatusClass
  summary: string
  summaryClass: StatusClass
  symptoms: string
  medicine: string
  note: string
}

const calendarDays: CalendarDay[] = [
  { day: '', empty: true },
  { day: '', empty: true },
  { day: '', empty: true },
  { day: 1, sick: true, rangeStart: true },
  { day: 2, sick: true },
  { day: 3, sick: true, rangeEnd: true },
  { day: 4 },
  { day: 5 },
  { day: 6 },
  { day: 7 },
  { day: 8 },
  { day: 9 },
  { day: 10 },
  { day: 11 },
  { day: 12 },
  { day: 13 },
  { day: 14 },
  { day: 15 },
  { day: 16 },
  { day: 17 },
  { day: 18 },
  { day: 19 },
  { day: 20 },
  { day: 21 },
  { day: 22 },
  { day: 23 },
  { day: 24 },
  { day: 25 },
  { day: 26 },
  { day: 27 },
  { day: 28 },
  { day: 29 },
  { day: 30 },
  { day: 31 },
]

const dailyRecords: DailyRecord[] = [
  {
    date: '5月1日 周三',
    temp: '37.8°C',
    tempClass: 'warn',
    summary: '一般',
    summaryClass: 'warn',
    symptoms: '咳嗽、流鼻涕、轻微发烧',
    medicine: '小儿感冒颗粒 1袋 2次/日',
    note: '晚上咳嗽多，精神一般',
  },
  {
    date: '5月2日 周四',
    temp: '37.2°C',
    tempClass: 'warn',
    summary: '好转',
    summaryClass: 'good',
    symptoms: '咳嗽、流鼻涕',
    medicine: '小儿感冒颗粒 1袋 2次/日',
    note: '食欲一般',
  },
  {
    date: '5月3日 周五',
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
  return (
    <main className="page">
      <section className="profile-card card">
        <div className="avatar">👦</div>
        <div className="profile-info">
          <div className="profile-name">小宝</div>
          <div className="profile-age">3岁2个月</div>
        </div>
      </section>

      <section className="calendar-card card">
        <div className="calendar-header">
          <button type="button" className="calendar-nav" aria-label="上一月">
            ‹
          </button>
          <span className="calendar-month">2024年5月</span>
          <button type="button" className="calendar-nav" aria-label="下一月">
            ›
          </button>
        </div>

        <div className="calendar-weekdays">
          {['日', '一', '二', '三', '四', '五', '六'].map((w) => (
            <span key={w} className="weekday">
              {w}
            </span>
          ))}
        </div>

        <div className="calendar-grid">
          {calendarDays.map((item, index) => (
            <div
              key={index}
              className={[
                'calendar-cell',
                item.empty && 'empty',
                item.sick && 'sick',
                item.rangeStart && 'range-start',
                item.rangeEnd && 'range-end',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {!item.empty && (
                <>
                  <span className="day-num">{item.day}</span>
                  {item.sick && <span className="day-dot" />}
                </>
              )}
            </div>
          ))}
        </div>

        <div className="calendar-legend">
          <div className="legend-item">
            <span className="legend-icon sick" />
            <span>生病中/有记录的日期</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon normal" />
            <span>未记录</span>
          </div>
        </div>
      </section>

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
              <div className="timeline-date">{record.date}</div>
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
