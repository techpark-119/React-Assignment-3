import React from 'react'
import { Check } from 'lucide-react'
import type { ShoppingListModalProps } from '../types'
import { Modal, Button } from './ui'

const ShoppingListModal = React.memo<ShoppingListModalProps>(
  ({ items, isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Shopping List">
      <div className="p-6">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <span className="text-3xl">🛍️</span>
            </div>
            <p className="text-gray-500 text-lg font-medium">
              Your shopping list is empty
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Add ingredients from recipes to get started!
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <p className="text-green-800 font-semibold text-center">
                ✨ {items.length} items ready for shopping!
              </p>
            </div>
            <ul className="space-y-3 mb-6 max-h-60 overflow-y-auto">
              {items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center space-x-3 py-3 px-4 bg-white/50 rounded-xl border border-gray-100 hover:bg-white/80 transition-colors"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <Check size={14} className="text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </>
        )}
        <Button onClick={onClose} className="w-full" size="lg">
          Close Shopping List
        </Button>
      </div>
    </Modal>
  )
)

export default ShoppingListModal
