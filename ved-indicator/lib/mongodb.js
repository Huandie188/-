import mongoose from 'mongoose';

/**
 * 全局变量缓存MongoDB连接
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * 获取MongoDB连接URI
 * 只在实际需要连接时检查环境变量
 */
const getMongoURI = () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    // 在开发环境中提供更有用的错误信息
    if (process.env.NODE_ENV === 'development') {
      throw new Error('请在.env.local文件中添加MONGODB_URI环境变量');
    }
    // 在生产环境中使用更通用的错误信息
    throw new Error('MongoDB连接URI未配置');
  }
  return uri;
};

/**
 * 连接到MongoDB数据库
 * @returns {Promise<Mongoose>} Mongoose实例
 */
export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    try {
      const MONGODB_URI = getMongoURI();
      
      const opts = {
        bufferCommands: false,
      };

      cached.promise = mongoose.connect(MONGODB_URI, opts)
        .then(mongoose => {
          console.log('MongoDB连接成功');
          return mongoose;
        });
    } catch (error) {
      console.error('MongoDB连接初始化错误:', error);
      // 在这里不抛出错误，而是返回null，让API路由自己处理错误
      return null;
    }
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error('MongoDB连接错误:', error);
    // 清空promise以便下次尝试
    cached.promise = null;
    throw error;
  }
}