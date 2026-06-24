import {
  Button,
  DatePicker,
  Form,
  Input,
  Popup,
  TextArea,
  type PickerOption,
} from '@nutui/nutui-react'
import '@nutui/nutui-react/dist/style.css'
import { useEffect, useState } from 'react'
import type { RecordFormValues } from '../../types'
import { formatDateTime } from '../../utils/recordForm'
import './RecordFormPopup.scss'

interface RecordFormPopupProps {
  visible: boolean
  onClose: () => void
  onSubmit: (values: RecordFormValues) => void
}

export default function RecordFormPopup({ visible, onClose, onSubmit }: RecordFormPopupProps) {
  const [form] = Form.useForm()

  const [dateShow, setDateShow] = useState(false)
  const [time, setTime] = useState(formatDateTime(new Date()))

  const formatter = (type: string, option: PickerOption) => {
    switch (type) {
      case 'year':
        option.label += '年'
        break
      case 'month':
        option.label += '月'
        break
      case 'day':
        option.label += '日'
        break
      case 'hour':
        option.label += '时'
        break
      case 'minute':
        option.label += '分'
        break
      default:
        option.label += ''
    }
    return option
  }

  useEffect(() => {
    if (!visible) {
      form.resetFields()
    }
  }, [visible, form])

  const handleCancel = () => {
    form.resetFields()
    onClose()
  }

  const handleFinish = (values: RecordFormValues) => {
    onSubmit(Object.assign(values, { recordTime: time }))
    form.resetFields()
    onClose()
  }

  const confirmTime = (values: (string | number)[]) => {
    const date = values.slice(0, 3).join('-')
    const time1 = values.slice(3).join(':')
    setTime(`${date} ${time1}`)
  }

  const openDate = () => {
    setDateShow(true)
  }

  return (
    <Popup
      visible={visible}
      position="bottom"
      round
      closeable={false}
      closeOnOverlayClick={false}
      title="新建记录"
      className="record-form-popup"
      style={{ maxHeight: '72%' }}
      onClose={handleCancel}
    >
      <div className="record-form-popup__body">
        <Form
          form={form}
          labelPosition="top"
          onFinish={handleFinish}
          initialValues={{
            description: '',
            medication: '',
          }}
        >
          <Form.Item label="时间" name="recordTime">
            <span onClick={openDate}>{time}</span>
          </Form.Item>

          <Form.Item
            label="描述"
            name="description"
            rules={[{ required: true, message: '请输入描述' }]}
          >
            <TextArea placeholder="请输入症状或备注" rows={3} maxLength={200} showCount />
          </Form.Item>

          <Form.Item label="体温(度)" name="temperature">
            <Input type="digit" placeholder="请输入体温" />
          </Form.Item>

          <Form.Item label="用药" name="medication">
            <TextArea placeholder="请输入用药信息" rows={3} maxLength={200} showCount />
          </Form.Item>
        </Form>
      </div>

      <DatePicker
        title="时间选择"
        type="datetime"
        startDate={new Date(2025, 0, 1)}
        endDate={new Date(2026, 10, 1)}
        visible={dateShow}
        defaultValue={new Date()}
        formatter={formatter}
        onClose={() => setDateShow(false)}
        onConfirm={(options, values) => confirmTime(values)}
      />

      <div className="record-form-popup__footer">
        <Button className="record-form-popup__btn" onClick={handleCancel}>
          取消
        </Button>
        <Button type="primary" className="record-form-popup__btn" onClick={() => form.submit()}>
          确定
        </Button>
      </div>
    </Popup>
  )
}
