'use client'

import React from 'react'

import { AIMessage } from '@/lib/types'

import { ActionButtons } from './action-buttons'

import { BotMessage } from './message'
import { StreamableValue } from 'ai/rsc'



interface CollapsibleMessageProps {
  message: {
    id: string
    role: AIMessage['role']
    content: string | React.ReactNode[]
    type?: AIMessage['type']
    isCollapsed?: StreamableValue<boolean>
    references?: any
  }
  isLastMessage: boolean
}



export function CollapsibleMessage({ message, isLastMessage }: CollapsibleMessageProps) {
  const shouldShowActions = message.role === 'assistant' && 
    message.type !== 'followup' && 
    message.type !== 'inquiry'

  const content = Array.isArray(message.content)
    ? message.content
    : message.content

  return (
    <div className="message-container">
      <div className="message-content">
        <BotMessage 
          content={content}
          references={message.references}
        />
      </div>
      
      {shouldShowActions && (
        <div className="mt-2">
          <ActionButtons message={message} />
        </div>
      )}
    </div>
  )
}






























































































































































































































































