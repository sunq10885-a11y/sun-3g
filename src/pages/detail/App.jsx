import { getProductById } from '../../data/products.js'

function App() {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')
  const product = id ? getProductById(id) : null

  return (
    <main className="page">
      <a className="back-link" href="/">
        ← 返回首页
      </a>
      <h1>商品详情</h1>
      {product ? (
        <article className="detail-card">
          <h2>{product.name}</h2>
          <p className="meta">编号 {product.id} · {product.price}</p>
          <p className="desc">{product.description}</p>
        </article>
      ) : (
        <p className="empty">
          {id ? `未找到编号为「${id}」的商品` : '请从首页选择商品查看详情'}
        </p>
      )}
    </main>
  )
}

export default App
