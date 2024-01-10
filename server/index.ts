const express = require('express');
const app = express();
const port = 8080; // 后端端口

const cors = require('cors'); // 导入cors包

// 使用cors中间件，允许所有来源访问你的API
app.use(cors());

// 设置路由，用于获取数据
app.get('/api/items', (req, res) => {
  res.json(data);
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// 模拟数据
const data = {
    code:200,
    data:[
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
    ]
};