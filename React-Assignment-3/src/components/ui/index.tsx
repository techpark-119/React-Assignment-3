import React from 'react'
import type { ButtonProps, ModalProps } from '../../types'

export const Button = React.memo<ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    disabled = false,
    onClick,
    ...props
  }: ButtonProps) => {
    const baseClasses =
      'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'

    const variants = {
      primary:
        'bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white focus:ring-purple-500 shadow-purple-500/25',
      secondary:
        'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 focus:ring-gray-500 shadow-gray-500/25',
      danger: 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white focus:ring-red-500 shadow-red-500/25',
      ghost: 'bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-700 focus:ring-gray-500 border border-gray-200/50 shadow-gray-500/10 dark:bg-gray-800/80 dark:hover:bg-gray-700/90 dark:text-gray-200 dark:border-gray-600/50',
      success:
        'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white focus:ring-emerald-500 shadow-emerald-500/25',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm rounded-xl',
      md: 'px-6 py-3 text-sm rounded-xl',
      lg: 'px-8 py-4 text-base rounded-xl',
    }

    return (
      <button
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    )
  }
)

export const Input = React.memo<React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
      className={`w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 hover:shadow-md focus:shadow-lg placeholder-gray-400 dark:bg-gray-800/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-500 ${className}`}
      {...props}
    />
  )
)

export const Textarea = React.memo<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className = '', ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    className={`w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 hover:shadow-md focus:shadow-lg resize-none placeholder-gray-400 dark:bg-gray-800/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-500 ${className}`}
    {...props}
  />
))

export const Select = React.memo<React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className = '', children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <select
      className={`w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 hover:shadow-md focus:shadow-lg cursor-pointer dark:bg-white dark:border-gray-600 dark:text-black ${className}`}
      {...props}
    >
      {children}
    </select>
  )
)

export const Card = React.memo<{
  children: React.ReactNode
  className?: string
}>(({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] ${className}`}
  >
    {children}
  </div>
))

export const Badge = React.memo<{
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning'
  className?: string
}>(({ children, variant = 'default', className = '' }: {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning'
  className?: string
}) => {
  const variants = {
    default: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 shadow-sm',
    primary: 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 shadow-purple-500/20',
    success: 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 shadow-emerald-500/20',
    warning: 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 shadow-yellow-500/20',
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border border-white/30 ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
})

export const Modal = React.memo<ModalProps>(
  ({ isOpen, onClose, title, children }: ModalProps) => {
    React.useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }

      if (isOpen) {
        document.addEventListener('keydown', handleEscape)
        document.body.style.overflow = 'hidden'
      }

      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = 'unset'
      }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto animate-in fade-in duration-300">
        <div className="flex min-h-screen items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300"
            onClick={onClose}
          />
          <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 animate-in zoom-in-95 duration-300 dark:bg-gray-800/95 dark:border-gray-700/20">
            <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110 p-1 rounded-full hover:bg-gray-100 dark:text-gray-500 dark:hover:text-gray-300 dark:hover:bg-gray-700"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    )
  }
)