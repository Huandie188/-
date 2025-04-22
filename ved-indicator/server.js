const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  // 添加自定义路由
  server.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello, world!' });
  });

  // 将所有其他请求传递给Next.js处理
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> 服务器在 http://localhost:${port} 上运行`);
  });
}); 