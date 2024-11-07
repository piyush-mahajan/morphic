'use client'

import React, { useEffect, useState } from 'react'
import { AIMessage } from '@/lib/types'
import { ActionButtons } from './action-buttons'
import { BotMessage } from './message'

interface CollapsibleMessageProps {
  message: AIMessage
  isLastMessage: boolean
}

export function CollapsibleMessage({ message, isLastMessage }: CollapsibleMessageProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Only show action buttons for assistant messages and when content exists
  const shouldShowActions = message.role === 'assistant' && 
    message.type !== 'followup' && 
    message.type !== 'inquiry'

  return (
    <div className="message-container">
      {/* Message content */}
      <div className="message-content">
        {message.content}
      </div>
      
      {/* Show action buttons after content */}
      {mounted && shouldShowActions && (
        <div className="mt-2" suppressHydrationWarning>
          <ActionButtons message={message} />
        </div>
      )}
    </div>
  )
}






























