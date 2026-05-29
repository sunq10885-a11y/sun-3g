export const products = [
  {
    id: '1',
    name: '无线蓝牙耳机',
    price: '¥299',
    description:
      '主动降噪、长续航，适合通勤与办公。支持多设备切换，佩戴轻盈舒适。',
  },
  {
    id: '2',
    name: '机械键盘',
    price: '¥459',
    description:
      '热插拔轴体、RGB 背光，打字手感清脆。铝合金定位板，耐用稳定。',
  },
  {
    id: '3',
    name: '便携显示器',
    price: '¥899',
    description:
      '15.6 英寸 IPS 屏，USB-C 一线通。出差扩展双屏，提升工作效率。',
  },
]

export function getProductById(id) {
  return products.find((item) => item.id === id)
}
