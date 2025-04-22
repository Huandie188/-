// 用户接口定义
export interface User {
  email: string;
  password: string;
  name?: string;
  createdAt: Date;
}

// 使用localStorage存储用户信息
class UserStore {
  private readonly STORAGE_KEY = 'edufusion_users';

  // 获取所有用户
  getUsers(): User[] {
    if (typeof window === 'undefined') return [];
    
    const storedUsers = localStorage.getItem(this.STORAGE_KEY);
    if (!storedUsers) return [];
    
    try {
      const parsedUsers = JSON.parse(storedUsers);
      // 恢复Date对象
      return parsedUsers.map((user: any) => ({
        ...user,
        createdAt: new Date(user.createdAt)
      }));
    } catch (error) {
      console.error('Failed to parse users from storage:', error);
      return [];
    }
  }

  // 保存用户列表
  private saveUsers(users: User[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Failed to save users to storage:', error);
    }
  }

  // 添加新用户
  addUser(user: Omit<User, 'createdAt'>): User | null {
    const users = this.getUsers();
    
    // 检查邮箱是否已注册
    if (users.some(u => u.email === user.email)) {
      return null; // 邮箱已被注册
    }
    
    const newUser: User = {
      ...user,
      createdAt: new Date()
    };
    
    users.push(newUser);
    this.saveUsers(users);
    
    return newUser;
  }

  // 验证用户凭据
  validateUser(email: string, password: string): User | null {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    return user || null;
  }

  // 检查邮箱是否已被注册
  isEmailRegistered(email: string): boolean {
    const users = this.getUsers();
    return users.some(u => u.email === email);
  }
}

// 导出单例实例
export const userStore = new UserStore(); 