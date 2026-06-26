import { useEffect, useState } from 'react'
import { createRecord, deleteRecord, getHealthRecords } from './api/record'
import { RecordFormPopup } from './components/RecordFormPopup'
import type { HealthRecord } from './types'
import { formatRecordDate } from './utils/date'
import { ICONS } from './utils/icons'

function App() {
  const [recordList, setRecordList] = useState<HealthRecord[][]>([])
  const [currentItem, setCurrentItem] = useState<any>({})
  const [recordPopupVisible, setRecordPopupVisible] = useState(false)

  const queryDatas = () => {
    getHealthRecords()
      .then((response: any) => {
        const list: HealthRecord[] = response.data || []
        const grouped = list.reduce<Record<string, HealthRecord[]>>((acc, item) => {
          const day = item.recordTime.slice(0, 10)
          if (!acc[day]) {
            acc[day] = []
          }
          acc[day].push(item)
          return acc
        }, {})
        setRecordList(Object.values(grouped))
      })
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : '课程列表加载失败'
        console.error(message)
      })
  }

  useEffect(() => {
    queryDatas()
  }, [])

  const handleRecordSubmit = async (item: HealthRecord) => {
    await createRecord({
      recordTime: item.recordTime,
      description: item.description || '',
      temperature: item.temperature || null,
      medication: item.medication || '',
    })
    queryDatas()
  }

  const clickCreateRecord = () => {
    setCurrentItem({})
    setRecordPopupVisible(true)
  }

  const handleClickCard = (recordItem: HealthRecord) => {
    setCurrentItem(recordItem)
    setRecordPopupVisible(true)
  }

  const handleDeleteRecord = (id: number) => {
    deleteRecord(id)
    setRecordPopupVisible(false)
    setRecordList(
      (prev) =>
        prev
          .map((dayGroup) => dayGroup.filter((item) => item.id !== id)) // 内层过滤掉id=1的项
          .filter((dayGroup) => dayGroup.length > 0) // 外层：如果某天的数据被删空了，顺便把这个空分组也去掉
    )
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

      {/* <CalendarCard recordDates={recordDates} /> */}

      <button type="button" className="create-record-btn" onClick={clickCreateRecord}>
        + 新建记录
      </button>

      <RecordFormPopup
        key={currentItem?.id}
        visible={recordPopupVisible}
        item={currentItem}
        onClose={() => setRecordPopupVisible(false)}
        onSubmit={handleRecordSubmit}
        onDelete={handleDeleteRecord}
      />

      <section className="timeline-section">
        <div className="timeline-list">
          {recordList.map((recordArr) => (
            <div key={recordArr[0].recordTime} className="timeline-item">
              <div className="timeline-node" />
              <div className="timeline-date">{formatRecordDate(recordArr[0].recordTime)}</div>
              <div>
                {recordArr.map((recordItem: HealthRecord, index: Number) => (
                  <div
                    key={recordItem.recordTime + index}
                    className="daily-card"
                    onClick={() => handleClickCard(recordItem)}
                  >
                    <div className="time-show">{recordItem.recordTime.slice(11, 16)}</div>

                    {recordItem.symptom ? (
                      <div className="tag-block">
                        <span className="tag">咳嗽</span>
                        <span className="tag">有痰</span>
                      </div>
                    ) : null}
                    {recordItem.description ? (
                      <span className="value-line">{recordItem.description}</span>
                    ) : null}
                    {recordItem.temperature || recordItem.medication ? (
                      <div className="other-info">
                        {recordItem.temperature ? (
                          <div className="info-item">
                            <img src={ICONS.temp} alt="" />
                            <span>{recordItem.temperature}</span>
                          </div>
                        ) : null}
                        {recordItem.medication ? (
                          <div className="info-item">
                            <img src={ICONS.med} alt="" />
                            <span>{recordItem.medication}</span>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
