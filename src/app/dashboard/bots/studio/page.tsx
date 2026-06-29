'use client'

import { useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Save, Play, Eye, Undo, Redo, Settings, ChevronLeft, ChevronRight, X, Trash2, GripVertical, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { blockDefinitions, blockCategories, getBlocksByCategory, getBlockDef, BlockDefinition } from '@/data/bot-blocks'

interface CanvasBlock {
  id: string
  type: string
  x: number
  y: number
  config: Record<string, unknown>
  connections: string[]
}

export default function BotStudioPage() {
  const [blocks, setBlocks] = useState<CanvasBlock[]>([])
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState('messaging')
  const [dragOver, setDragOver] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  const addBlock = useCallback((type: string, x: number, y: number) => {
    const def = getBlockDef(type)
    if (!def) return
    const newBlock: CanvasBlock = {
      id: `${type}-${Date.now()}`,
      type,
      x,
      y,
      config: { ...def.defaultConfig },
      connections: [],
    }
    setBlocks(prev => [...prev, newBlock])
    setSelectedBlock(newBlock.id)
  }, [])

  const removeBlock = useCallback((id: string) => {
    setBlocks(prev => prev.filter(b => b.id !== id))
    if (selectedBlock === id) setSelectedBlock(null)
  }, [selectedBlock])

  const updateBlockPosition = useCallback((id: string, x: number, y: number) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, x, y } : b))
  }, [])

  const updateBlockConfig = useCallback((id: string, config: Record<string, unknown>) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, config } : b))
  }, [])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const type = e.dataTransfer.getData('blockType')
    if (!type) return
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left - 100
    const y = e.clientY - rect.top - 30
    addBlock(type, Math.max(0, x), Math.max(0, y))
  }

  const selectedBlockDef = selectedBlock ? getBlockDef(blocks.find(b => b.id === selectedBlock)?.type || '') : null
  const selectedBlockData = blocks.find(b => b.id === selectedBlock)

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-dark-primary">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-dark-border bg-dark-secondary">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-dark-tertiary text-gray-400 hover:text-white transition-all">
            <Undo className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg hover:bg-dark-tertiary text-gray-400 hover:text-white transition-all">
            <Redo className="w-4 h-4" />
          </button>
          <div className="w-px h-6 bg-dark-border mx-2" />
          <button className="p-2 rounded-lg hover:bg-dark-tertiary text-gray-400 hover:text-white transition-all">
            <Save className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">{blocks.length} بلوك</span>
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={cn('flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all', previewMode ? 'bg-primary-500/20 text-primary-400' : 'text-gray-400 hover:text-white')}
          >
            <Eye className="w-4 h-4" />
            معاينة
          </button>
          <button className="btn-primary text-sm !py-1.5 !px-4 flex items-center gap-2">
            <Play className="w-4 h-4" />
            نشر
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Block Palette */}
        <div className="w-64 border-l border-dark-border bg-dark-secondary flex flex-col">
          {/* Categories */}
          <div className="p-3 space-y-1 border-b border-dark-border">
            {blockCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all',
                  activeCategory === cat.id ? 'bg-dark-tertiary text-white' : 'text-gray-400 hover:text-white'
                )}
              >
                <span className={cat.color}>{cat.icon}</span>
                {cat.nameAr}
              </button>
            ))}
          </div>

          {/* Block List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {getBlocksByCategory(activeCategory).map((block) => (
              <div
                key={block.type}
                draggable
                onDragStart={(e) => e.dataTransfer.setData('blockType', block.type)}
                className="glass-card !p-3 cursor-grab active:cursor-grabbing card-hover group"
              >
                <div className="flex items-center gap-3">
                  <div className={cn('w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center text-sm', block.color)}>
                    {block.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">{block.nameAr}</p>
                    <p className="text-[10px] text-gray-500 truncate">{block.description}</p>
                  </div>
                  <GripVertical className="w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div
          ref={canvasRef}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={() => setDragOver(false)}
          className={cn(
            'flex-1 relative overflow-auto bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-dark-secondary via-dark-primary to-dark-primary',
            dragOver && 'ring-2 ring-primary-500/50'
          )}
          onClick={() => setSelectedBlock(null)}
        >
          {/* Empty State */}
          {blocks.length === 0 && !previewMode && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-sm">
                <div className="w-20 h-20 rounded-3xl glass flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-10 h-10 text-primary-400" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-2">ابدأ ببناء البوت</h3>
                <p className="text-gray-400 mb-4">اسحب البلوكات من اليسار إلى هنا لبناء تدفق البوت</p>
                <button
                  onClick={() => addBlock('text_message', 200, 100)}
                  className="btn-primary text-sm"
                >
                  أضف بلوك ترحيب
                </button>
              </div>
            </div>
          )}

          {/* Blocks */}
          {blocks.map((block) => {
            const def = getBlockDef(block.type)
            if (!def) return null
            const isSelected = selectedBlock === block.id

            return (
              <motion.div
                key={block.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ position: 'absolute', left: block.x, top: block.y }}
                onClick={(e) => { e.stopPropagation(); setSelectedBlock(block.id) }}
                className={cn(
                  'w-56 glass rounded-xl p-3 cursor-pointer transition-all group',
                  isSelected ? 'ring-2 ring-primary-500 shadow-lg shadow-primary-500/20' : 'hover:ring-1 hover:ring-white/10'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={cn('w-6 h-6 rounded-md bg-gradient-to-br flex items-center justify-center text-xs', def.color)}>
                      {def.icon}
                    </div>
                    <span className="text-xs text-white font-medium">{def.nameAr}</span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeBlock(block.id) }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-all"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                {block.type === 'text_message' && (
                  <p className="text-[11px] text-gray-500 truncate">
                    {(block.config as { text?: string }).text || 'أدخل النص...'}
                  </p>
                )}
                {block.type === 'ai_chat' && (
                  <p className="text-[11px] text-gray-500">
                    النموذج: {(block.config as { model?: string }).model || 'gemini-flash'}
                  </p>
                )}
                {block.type === 'buttons' && (
                  <p className="text-[11px] text-gray-500">
                    {(block.config as { buttons?: { text: string }[] }).buttons?.length || 0} زر
                  </p>
                )}
                {/* Connection points */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-dark-border border-2 border-dark-primary cursor-pointer hover:bg-primary-500 transition-colors" />
              </motion.div>
            )
          })}
        </div>

        {/* Right Panel - Properties */}
        {selectedBlock && selectedBlockDef && selectedBlockData && (
          <div className="w-72 border-r border-dark-border bg-dark-secondary overflow-y-auto">
            <div className="p-4 border-b border-dark-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>{selectedBlockDef.icon}</span>
                <h3 className="font-heading font-bold text-white text-sm">{selectedBlockDef.nameAr}</h3>
              </div>
              <button onClick={() => setSelectedBlock(null)} className="text-gray-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {/* Text field for text_message */}
              {selectedBlockData.type === 'text_message' && (
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">نص الرسالة</label>
                  <textarea
                    value={(selectedBlockData.config as { text?: string }).text || ''}
                    onChange={(e) => updateBlockConfig(selectedBlockData.id, { ...selectedBlockData.config, text: e.target.value })}
                    className="input-field h-24 resize-none"
                    placeholder="أدخل النص هنا..."
                  />
                </div>
              )}

              {/* Model selector for ai_chat */}
              {selectedBlockData.type === 'ai_chat' && (
                <>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">نموذج الذكاء الاصطناعي</label>
                    <select
                      value={(selectedBlockData.config as { model?: string }).model || 'gemini-flash'}
                      onChange={(e) => updateBlockConfig(selectedBlockData.id, { ...selectedBlockData.config, model: e.target.value })}
                      className="input-field"
                    >
                      <option value="gemini-flash">Gemini Flash (مجاني)</option>
                      <option value="gemini-pro">Gemini Pro</option>
                      <option value="gpt-4o-mini">GPT-4o mini</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">تعليمات النظام (System Prompt)</label>
                    <textarea
                      value={(selectedBlockData.config as { prompt?: string }).prompt || ''}
                      onChange={(e) => updateBlockConfig(selectedBlockData.id, { ...selectedBlockData.config, prompt: e.target.value })}
                      className="input-field h-20 resize-none"
                      placeholder="أخبر البوت كيف يتصرف..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">درجة الإبداع (Temperature)</label>
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.1"
                      value={(selectedBlockData.config as { temperature?: number }).temperature ?? 0.7}
                      onChange={(e) => updateBlockConfig(selectedBlockData.id, { ...selectedBlockData.config, temperature: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                    <span className="text-xs text-gray-500">{(selectedBlockData.config as { temperature?: number }).temperature ?? 0.7}</span>
                  </div>
                </>
              )}

              {/* Buttons config */}
              {selectedBlockData.type === 'buttons' && (
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">الأزرار</label>
                  <div className="space-y-2">
                    {((selectedBlockData.config as { buttons?: { text: string; value: string }[] }).buttons || [])?.map((btn, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          type="text"
                          value={btn.text}
                          onChange={(e) => {
                            const buttons = [...((selectedBlockData.config as { buttons?: { text: string; value: string }[] }).buttons || [])]
                            buttons[i] = { ...buttons[i], text: e.target.value }
                            updateBlockConfig(selectedBlockData.id, { ...selectedBlockData.config, buttons })
                          }}
                          className="input-field flex-1"
                          placeholder={`زر ${i + 1}`}
                        />
                        <button
                          onClick={() => {
                            const buttons = ((selectedBlockData.config as { buttons?: { text: string; value: string }[] }).buttons || []).filter((_, idx) => idx !== i)
                            updateBlockConfig(selectedBlockData.id, { ...selectedBlockData.config, buttons })
                          }}
                          className="p-2 rounded-lg hover:bg-red-500/20 text-gray-500 hover:text-red-400"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const buttons = [...((selectedBlockData.config as { buttons?: { text: string; value: string }[] }).buttons || []), { text: '', value: '' }]
                        updateBlockConfig(selectedBlockData.id, { ...selectedBlockData.config, buttons })
                      }}
                      className="w-full py-2 rounded-lg border border-dashed border-dark-border text-sm text-gray-500 hover:text-white hover:border-white/20 transition-all"
                    >
                      + إضافة زر
                    </button>
                  </div>
                </div>
              )}

              {/* Delay config */}
              {selectedBlockData.type === 'delay' && (
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">مدة التأخير (ثوان)</label>
                  <input
                    type="number"
                    value={(selectedBlockData.config as { seconds?: number }).seconds || 5}
                    onChange={(e) => updateBlockConfig(selectedBlockData.id, { ...selectedBlockData.config, seconds: parseInt(e.target.value) })}
                    className="input-field"
                    min={1}
                    max={300}
                  />
                </div>
              )}

              {/* API Call */}
              {selectedBlockData.type === 'api_call' && (
                <>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">طريقة الطلب</label>
                    <select
                      value={(selectedBlockData.config as { method?: string }).method || 'GET'}
                      onChange={(e) => updateBlockConfig(selectedBlockData.id, { ...selectedBlockData.config, method: e.target.value })}
                      className="input-field"
                    >
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="DELETE">DELETE</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">رابط API</label>
                    <input
                      type="url"
                      value={(selectedBlockData.config as { url?: string }).url || ''}
                      onChange={(e) => updateBlockConfig(selectedBlockData.id, { ...selectedBlockData.config, url: e.target.value })}
                      className="input-field"
                      placeholder="https://api.example.com"
                    />
                  </div>
                </>
              )}

              {/* Image */}
              {selectedBlockData.type === 'image' && (
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">رابط الصورة</label>
                  <input
                    type="url"
                    value={(selectedBlockData.config as { url?: string }).url || ''}
                    onChange={(e) => updateBlockConfig(selectedBlockData.id, { ...selectedBlockData.config, url: e.target.value })}
                    className="input-field"
                    placeholder="https://example.com/image.jpg"
                  />
                  <label className="block text-xs text-gray-400 mb-1.5 mt-3">التعليق</label>
                  <input
                    type="text"
                    value={(selectedBlockData.config as { caption?: string }).caption || ''}
                    onChange={(e) => updateBlockConfig(selectedBlockData.id, { ...selectedBlockData.config, caption: e.target.value })}
                    className="input-field"
                    placeholder="نص التعليق..."
                  />
                </div>
              )}

              {/* Default */}
              {!['text_message', 'ai_chat', 'buttons', 'delay', 'api_call', 'image'].includes(selectedBlockData.type) && (
                <p className="text-sm text-gray-500 text-center py-8">
                  إعدادات هذا البلوك قيد التطوير
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
