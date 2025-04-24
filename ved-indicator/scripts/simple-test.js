const { MongoClient } = require('mongodb');

// 使用硬编码的连接字符串进行测试
const uri = "mongodb+srv://testuser123:Test123456@ac-zlmvbni.pziyvhd.mongodb.net/?retryWrites=true&w=majority";

console.log('尝试连接到MongoDB...');

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log('连接成功！');
    
    // 尝试列出所有数据库
    const dbList = await client.db().admin().listDatabases();
    console.log('可用数据库:', dbList.databases.map(db => db.name).join(', '));
  } catch (err) {
    console.error('连接失败:', err);
  } finally {
    await client.close();
    console.log('连接已关闭');
  }
}

run();