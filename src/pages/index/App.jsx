import { products } from '../../data/products.js'

function App() {
  return (
    <main className="page">
      <h1>商品列表</h1>
      <p className="subtitle">多页面应用示例 · 点击「查看详情」进入详情页</p>
      <ul className="card-list">
        {products.map((item) => (
          <li key={item.id} className="card">
            <div>
              <h2>{item.name}</h2>
              <p>{item.price}</p>
            </div>
            <a className="card-link" href={`/detail/?id=${item.id}`}>
              查看详情
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
