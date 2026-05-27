'use client'

import { useState, useEffect } from 'react'
import { parseColor, generateShadesAndTints, type ColorInfo } from './utils'
import { Copy, RefreshCw, Palette } from 'lucide-react'

export default function ColorPicker() {
  const [color, setColor] = useState<string>('#6366F1')
  const [info, setInfo] = useState<ColorInfo | null>(null)
  const [palette, setPalette] = useState<string[] | null>(null)
  const [copiedText, setCopiedText] = useState<string | null>(null)

  useEffect(() => {
    const parsed = parseColor(color)
    setInfo(parsed)
    if (parsed) {
      setPalette(generateShadesAndTints(parsed.hex))
    } else {
      setPalette(null)
    }
  }, [color])

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(text)
      setTimeout(() => setCopiedText(null), 2000)
    })
  }

  function handleRandomColor() {
    const randomHex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    setColor(randomHex)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl border border-white/40 dark:border-gray-800 shadow-2xl transition-all">
      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-brand/10 text-brand rounded-full mb-4">
          <Palette size={14} /> Design Utilities
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Color Picker & Palette Generator
        </h2>
        <p className="mt-3 text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Select a color to instantly view HEX, RGB, and HSL values, along with a perfectly matched palette.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Picker Side */}
        <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center space-y-6">
          <div 
            className="w-40 h-40 rounded-full shadow-inner border-4 border-white dark:border-gray-700 transition-colors duration-300"
            style={{ backgroundColor: info ? info.hex : '#000000' }}
          />
          
          <div className="w-full max-w-xs flex gap-3 relative">
            <input
              type="color"
              value={info ? info.hex : '#000000'}
              onChange={(e) => setColor(e.target.value)}
              className="w-14 h-14 p-1 rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 block"
              aria-label="Color Picker"
            />
            <div className="flex-1 relative">
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-14 px-4 text-xl font-mono uppercase bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand outline-none text-gray-900 dark:text-white"
                placeholder="#000000"
              />
            </div>
            <button
              onClick={handleRandomColor}
              className="w-14 h-14 flex items-center justify-center bg-brand text-white rounded-xl shadow-md hover:bg-brand/90 transition-all hover:rotate-180 duration-500"
              aria-label="Random Color"
            >
              <RefreshCw size={20} />
            </button>
          </div>
          
          {!info && (
            <p className="text-sm text-red-500">Please enter a valid HEX color.</p>
          )}
        </div>

        {/* Info Side */}
        <div className="flex flex-col space-y-4 justify-center">
          {[
            { label: 'HEX', value: info?.hex || '-' },
            { label: 'RGB', value: info?.rgb || '-' },
            { label: 'HSL', value: info?.hsl || '-' }
          ].map((item) => (
            <div key={item.label} className="bg-white/80 dark:bg-gray-800/80 p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 flex justify-between items-center group">
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{item.label}</p>
                <p className="text-xl font-mono font-medium text-gray-900 dark:text-white mt-1">{item.value}</p>
              </div>
              <button
                onClick={() => info && handleCopy(item.value)}
                disabled={!info}
                className={`p-3 rounded-xl transition-all ${
                  copiedText === item.value 
                    ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-gray-100 text-gray-500 hover:bg-brand/10 hover:text-brand dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-brand/20'
                }`}
                aria-label={`Copy ${item.label}`}
              >
                <Copy size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Palette */}
      {palette && (
        <section>
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5 ml-1">
            Generated Palette
          </p>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {palette.map((pColor, index) => (
              <button
                key={index}
                onClick={() => handleCopy(pColor)}
                className="flex-1 h-20 md:h-24 rounded-xl min-w-[3rem] shadow-sm hover:shadow-lg transition-transform hover:-translate-y-2 cursor-pointer relative group border border-black/5 dark:border-white/5"
                style={{ backgroundColor: pColor }}
                title={`Copy ${pColor}`}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-xl backdrop-blur-[2px]">
                  <span className="text-white text-xs font-mono font-bold">{pColor}</span>
                </div>
              </button>
            ))}
          </div>
          {copiedText && palette.includes(copiedText) && (
            <p className="text-center text-sm text-green-600 dark:text-green-400 mt-3 font-medium animate-pulse">
              Copied {copiedText} to clipboard!
            </p>
          )}
        </section>
      )}
    </div>
  )
}
