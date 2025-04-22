"use client"

import React, { useState, useEffect } from "react"
import { ChevronRight, Copy, Link, Share2 } from "lucide-react"
import { motion } from "framer-motion"

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [copied, setCopied] = useState<string | null>(null)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")

  const baiduPanLink = "https://pan.baidu.com/s/1bqPBAWQXkieZi-tN1n-70A"
  const extractCode = "wdao"

  const bookCategories = [
    "人工智能",
    "数据科学",
    "编程语言",
    "算法与数据结构",
    "前端开发",
    "后端开发",
    "数据库",
    "操作系统",
    "网络安全",
    "软件工程",
    "系统架构",
    "云计算",
  ]

  const filteredCategories = bookCategories.filter(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 自定义通知函数
  const showToast = (message: string) => {
    setNotificationMessage(message)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 2000)
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    showToast(`已复制${type === "link" ? "链接" : type === "code" ? "提取码" : "内容"}`)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="pb-20">
      {/* 自定义通知组件 */}
      {showNotification && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50"
        >
          {notificationMessage}
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-violet-600/90 to-indigo-600/90 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            IT黑皮丛书资源库
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl max-w-3xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            精心收集的百本经典编程与技术领域黑皮书PDF资源，涵盖从入门到专家的各个层次，助你构建全面的技术知识体系。
          </motion.p>
        </div>
      </section>

      {/* Resource Card Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Link Card */}
            <motion.div 
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200 shadow-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">百度网盘资源</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">网盘链接</span>
                    <button 
                      onClick={() => copyToClipboard(baiduPanLink, "link")}
                      className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center"
                    >
                      {copied === "link" ? "已复制" : "复制链接"} 
                      <Copy className="ml-1 h-3 w-3" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
                    <span className="text-sm text-gray-700 truncate flex-1">{baiduPanLink}</span>
                    <a 
                      href={baiduPanLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ml-2 text-indigo-600 hover:text-indigo-800"
                    >
                      <Link className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">提取码</span>
                    <button 
                      onClick={() => copyToClipboard(extractCode, "code")}
                      className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center"
                    >
                      {copied === "code" ? "已复制" : "复制提取码"} 
                      <Copy className="ml-1 h-3 w-3" />
                    </button>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                    <span className="text-sm font-mono text-gray-700">{extractCode}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <a 
                    href={baiduPanLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-center transition-colors font-medium"
                  >
                    前往百度网盘获取资源
                  </a>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: 'IT黑皮丛书资源',
                          text: `百度网盘链接：${baiduPanLink}，提取码：${extractCode}`,
                          url: window.location.href,
                        })
                      } else {
                        copyToClipboard(`百度网盘链接：${baiduPanLink}，提取码：${extractCode}`, "all")
                      }
                    }}
                    className="mt-2 block w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-md text-center transition-colors font-medium flex items-center justify-center"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    分享资源
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Resource Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">资源说明</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <span>精选的100本计算机与编程领域的经典黑皮书PDF合集</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <span>包含Python、Java、C/C++、JavaScript等主流编程语言</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <span>涵盖人工智能、数据分析、Web开发、算法、数据库等热门领域</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <span>高清PDF格式，支持电脑和移动设备阅读</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <span>资源持续更新，定期增加新书籍</span>
                  </li>
                </ul>
              </div>
              
              <div className="pt-4">
                <p className="text-gray-500 text-sm">
                  注意：资源仅供个人学习使用，请勿用于商业用途。如有侵权，请联系我们删除。
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Book Categories Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">书籍分类导航</h2>
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="搜索书籍分类..."
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            >
              <h3 className="font-medium text-gray-800">{category}</h3>
              <p className="text-sm text-gray-500 mt-1">查看全部</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reading Suggestions */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">阅读建议</h2>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200">
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <span className="font-semibold text-indigo-600 mr-2">初学者：</span>
              <span>从编程语言基础入门书籍开始，掌握一门语言的核心概念和语法，如《Python编程：从入门到实践》或《Java编程思想》。</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-indigo-600 mr-2">进阶学习：</span>
              <span>学习算法与数据结构的基础知识，推荐《算法导论》或《数据结构与算法分析》。</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-indigo-600 mr-2">专业方向：</span>
              <span>根据自己的兴趣和职业规划，选择特定领域的专业书籍深入学习，如Web开发、人工智能、数据库等。</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-indigo-600 mr-2">系统学习：</span>
              <span>建议结合我们的AI个性化学习路径，系统化地规划你的学习进程，形成完整的知识体系。</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
} 