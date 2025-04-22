"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ChevronRight,
  ChevronDown,
  BookOpen,
  Code,
  Database,
  Server,
  Globe,
  Shield,
  Brain,
  Download,
  LayoutTemplate,
  BookOpenCheck,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { TreeNode } from "@/lib/learning-paths-data"

interface LearningPathTreeProps {
  treeData: TreeNode;
}

export default function LearningPathTree({ treeData: initialTreeData }: LearningPathTreeProps) {
  const [viewMode, setViewMode] = useState<"tree" | "flowchart">("tree")
  const flowchartRef = useRef<HTMLDivElement>(null)
  const treeRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  const [treeData, setTreeData] = useState<TreeNode>(initialTreeData);

  useEffect(() => {
    setTreeData(initialTreeData);
  }, [initialTreeData]);

  // 重置缩放比例当视图模式改变时
  useEffect(() => {
    setScale(1)
  }, [viewMode])

  const toggleNode = (nodeId: string) => {
    const toggleExpanded = (node: TreeNode): TreeNode => {
      if (node.id === nodeId) {
        return { ...node, expanded: !node.expanded }
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(toggleExpanded)
        }
      }
      return node
    }

    setTreeData(toggleExpanded(treeData))
  }

  const exportAsImage = async (mode: "tree" | "flowchart") => {
    try {
      const html2canvas = (await import("html2canvas")).default
      const ref = mode === "tree" ? treeRef.current : flowchartRef.current

      if (!ref) return

      const canvas = await html2canvas(ref, {
        backgroundColor: null,
        scale: 2,
      })

      const image = canvas.toDataURL("image/png", 1.0)
      const link = document.createElement("a")
      link.download = `计算机科学学习路线-${mode === "tree" ? "树形图" : "流程图"}.png`
      link.href = image
      link.click()
    } catch (error) {
      console.error("导出图片失败:", error)
    }
  }

  const renderTreeNode = (node: TreeNode, level = 0) => {
    const hasChildren = node.children && node.children.length > 0
    const isExpanded = node.expanded

    return (
      <div key={node.id} className="relative">
        <div
          className={`flex items-start gap-2 p-2 rounded-lg transition-colors hover:bg-accent/50 ${level > 0 ? "mt-2" : ""}`}
        >
          {hasChildren && (
            <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 mt-1" onClick={() => toggleNode(node.id)}>
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          )}

          {!hasChildren && <div className="w-6" />}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`${node.color} text-white h-8 w-8 rounded-full flex items-center justify-center shrink-0 mt-0.5`}
                >
                  {node.icon}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-sm font-medium">{node.title}</div>
                <div className="text-xs text-muted-foreground">{node.description}</div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-2">
              <div className="font-medium">{node.title}</div>
              {node.recommendedCourse && (
                <a
                  href={node.recommendedCourse.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs hover:bg-primary/20 transition-colors"
                >
                  <BookOpenCheck className="h-3 w-3" />
                  {node.recommendedCourse.title} ({node.recommendedCourse.provider})
                </a>
              )}
            </div>
            <div className="text-sm text-muted-foreground">{node.description}</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                {node.difficulty}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {node.estimatedTime}
              </Badge>
            </div>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="pl-8 border-l-2 border-border ml-3"
          >
            {node.children!.map((childNode) => renderTreeNode(childNode, level + 1))}
          </motion.div>
        )}
      </div>
    )
  }

  // 计算节点的总数（包括子节点）
  const countNodes = (node: TreeNode): number => {
    if (!node.children || node.children.length === 0) {
      return 1
    }
    return 1 + node.children.reduce((sum, child) => sum + countNodes(child), 0)
  }

  // 计算树的最大深度
  const getMaxDepth = (node: TreeNode): number => {
    if (!node.children || node.children.length === 0) {
      return 1
    }
    return 1 + Math.max(...node.children.map(getMaxDepth))
  }

  // 计算树的最大宽度（每层的最大节点数）
  const getMaxWidth = (node: TreeNode): number => {
    const widths: number[] = []

    const traverse = (node: TreeNode, level: number) => {
      if (!widths[level]) widths[level] = 0
      widths[level]++

      if (node.children) {
        node.children.forEach((child) => traverse(child, level + 1))
      }
    }

    traverse(node, 0)
    return Math.max(...widths)
  }

  // 垂直流程图渲染函数 - 优化版本，采用交错排布
  const renderVerticalFlowchartNode = (node: TreeNode, x: number, y: number, level = 0, parentX = 0, parentY = 0) => {
    const nodeWidth = 180; // 卡片宽度
    const nodeHeight = 110; // 增加卡片高度
    const verticalGap = 150; // 大幅增加基础垂直间距
    const horizontalGap = 80; // 增加水平间距
    
    // 是否为叶子节点（最下层节点）
    const isLeafNode = !node.children || node.children.length === 0;
    
    // 计算当前节点的位置
    const nodeX = x;
    const nodeY = y;

    // 如果不是根节点，绘制从父节点到当前节点的连线
    const lineElement =
      level > 0 ? (
        <svg
          className="absolute pointer-events-none"
          style={{
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        >
          <line
            x1={parentX + nodeWidth / 2}
            y1={parentY + nodeHeight}
            x2={nodeX + nodeWidth / 2}
            y2={nodeY}
            stroke="currentColor"
            strokeWidth="2"
            strokeOpacity="0.3"
          />
        </svg>
      ) : null;

    // 递归渲染子节点
    let childrenElements = null;
    if (node.children && node.children.length > 0) {
      // 计算子节点的总宽度
      const childNodeCount = node.children.length;
      // 增加总宽度计算中的间距，确保子节点有足够空间
      const totalChildrenWidth = childNodeCount * nodeWidth + (childNodeCount - 1) * horizontalGap;
      // 从左侧开始计算第一个子节点的位置
      const childStartX = nodeX + nodeWidth / 2 - totalChildrenWidth / 2;

      // 检查是否为最后一层的父节点，即子节点是叶子节点
      const hasLeafChildren = node.children.some(child => !child.children || child.children.length === 0);
      
      childrenElements = node.children.map((child, childIndex) => {
        // 确保每个子节点有足够间距
        const childX = childStartX + childIndex * (nodeWidth + horizontalGap);
        
        // 如果是叶子节点的父节点，则实现交错排布
        let childY = nodeY + nodeHeight + verticalGap;
        
        // 对最后一层实现交错排布
        if (hasLeafChildren && (!child.children || child.children.length === 0)) {
          // 奇偶交错，偶数索引位置向下偏移
          if (childIndex % 2 === 1) {
            childY += nodeHeight * 1.2; // 增加向下偏移量至120%的节点高度
          }
        }

        return renderVerticalFlowchartNode(child, childX, childY, level + 1, nodeX, nodeY);
      });
    }

    return (
      <React.Fragment key={node.id}>
        {lineElement}
        <div
          className="absolute"
          style={{
            left: nodeX,
            top: nodeY,
            width: nodeWidth,
            height: nodeHeight,
          }}
        >
          <div className="h-full w-full p-3 rounded-lg border bg-card shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <div
                className={`${node.color} text-white h-6 w-6 rounded-full flex items-center justify-center shrink-0`}
              >
                {node.icon}
              </div>
              <div className="font-medium text-sm truncate">{node.title}</div>
            </div>
            <div className="text-xs text-muted-foreground line-clamp-2 flex-1">{node.description}</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="outline" className="text-[10px] px-1">
                {node.difficulty}
              </Badge>
              <Badge variant="outline" className="text-[10px] px-1">
                {node.estimatedTime}
              </Badge>
            </div>
          </div>
        </div>
        {childrenElements}
      </React.Fragment>
    );
  };

  // 计算垂直流程图的尺寸和位置
  const calculateFlowchartLayout = () => {
    const nodeWidth = 180; // 与上面保持一致
    const nodeHeight = 110;
    const verticalGap = 150;
    const horizontalGap = 80;

    const maxDepth = getMaxDepth(treeData);
    const maxWidth = getMaxWidth(treeData);

    // 计算高度：增加额外空间以适应交错排布
    const height = maxDepth * (nodeHeight + verticalGap) + nodeHeight * 2.5;

    // 计算宽度：最大宽度 * (节点宽度 + 水平间距)
    // 增加最小宽度以确保有足够的展示空间
    const width = Math.max(maxWidth * (nodeWidth + horizontalGap) * 1.2, 1400);

    // 计算根节点的位置
    const rootX = width / 2 - nodeWidth / 2;
    const rootY = 20;

    return { width, height, rootX, rootY };
  };

  const flowchartLayout = calculateFlowchartLayout()

  // 缩放控制
  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 1.5))
  }

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5))
  }

  return (
    <div className="bg-card rounded-lg border shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(value) => value && setViewMode(value as "tree" | "flowchart")}
        >
          <ToggleGroupItem value="tree" aria-label="树形视图">
            <ChevronRight className="h-4 w-4 mr-2" />
            树形视图
          </ToggleGroupItem>
          <ToggleGroupItem value="flowchart" aria-label="流程图视图">
            <LayoutTemplate className="h-4 w-4 mr-2" />
            流程图视图
          </ToggleGroupItem>
        </ToggleGroup>

        <div className="flex items-center gap-2">
          {viewMode === "flowchart" && (
            <>
              <Button variant="outline" size="icon" onClick={zoomOut} disabled={scale <= 0.5}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-xs w-12 text-center">{Math.round(scale * 100)}%</span>
              <Button variant="outline" size="icon" onClick={zoomIn} disabled={scale >= 1.5}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </>
          )}
          <Button variant="outline" size="sm" onClick={() => exportAsImage(viewMode)}>
            <Download className="h-4 w-4 mr-2" />
            导出为图片
          </Button>
        </div>
      </div>

      {viewMode === "tree" ? (
        <div className="overflow-x-auto" ref={treeRef}>
          <div className="min-w-[600px]">{renderTreeNode(treeData)}</div>
        </div>
      ) : (
        <div className="overflow-auto border rounded-md p-4 h-[600px]" ref={flowchartRef}>
          <div
            className="relative transform-gpu"
            style={{
              width: flowchartLayout.width,
              height: flowchartLayout.height,
              transform: `scale(${scale})`,
              transformOrigin: "0 0",
              transition: "transform 0.2s ease",
            }}
          >
            {renderVerticalFlowchartNode(treeData, flowchartLayout.rootX, flowchartLayout.rootY)}
          </div>
        </div>
      )}
    </div>
  )
}
