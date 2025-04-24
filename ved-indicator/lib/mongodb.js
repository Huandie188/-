import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('请在.env.local文件中添加MONGODB_URI环境变量');
}

/**
 * 全局变量缓存MongoDB连接
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * 连接到MongoDB数据库
 * @returns {Promise<Mongoose>} Mongoose实例
 */
export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then(mongoose => {
        console.log('MongoDB连接成功');
        return mongoose;
      })
      .catch(error => {
        console.error('MongoDB连接错误:', error);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}