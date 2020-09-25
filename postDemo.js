const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const app = new Koa()

app.use(bodyParser())

app.use(async (ctx) => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    // 显示表单页面
    let html = `
      <h1>表单验证</h1>
      <form method='post' action='/'>
        <p>username</p>
        <input name='username' /></br>
        <p>age</p>
        <input name='age' /></br>
        <button type='submit'>submit</button>
      </form>
    `
    ctx.body = html
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    ctx.body = ctx.request.body
  } else {
    ctx.body = '<h1> 404! </h1>'
  }
})

function parsePostData (ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postData = ''
      ctx.req.on('data', (data) => {
        postData += data
      })
      ctx.req.on('end', (data) => {
        let parseData = parseQueryStr(postData)
        resolve(parseData)
      })
    } catch(error) {
      reject(error)
    }
  })
}

function parseQueryStr (queryStr) {
  let queryData = {}
  let queryStrList = queryStr.split('&')
  for (let [index, queryStr] of queryStrList.entries()) {
    let itemList = queryStr.split('=')
    queryData[itemList[0]] = decodeURIComponent(itemList[1])
  }
  return queryData
}

app.listen(3000, () => {
  console.log('[postDemo] is running at port 3000')
})