'use client'

import { StreamableValue } from 'ai/rsc'
import type { UIState } from '@/app/actions'
import { CollapsibleMessage } from './collapsible-message'

interface ChatMessagesProps {
  messages: UIState
}

type GroupedMessage = {
  id: string
  components: React.ReactNode[]
  isCollapsed?: StreamableValue<boolean>
}

interface CollapsibleMessageProps {
  message: {
    id: string
    role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool'
    content: React.ReactNode[]
    isCollapsed?: StreamableValue<boolean>
  }
  isLastMessage: boolean
}

export type AIMessage = {
  role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool'
  content: string | React.ReactNode[]
  id: string
  name?: string
  isCollapsed?: StreamableValue<boolean>
  type?:
    | 'answer'
    | 'related'
    | 'skip'
    | 'inquiry'
    | 'input'
    | 'input_related'
    | 'tool'
    | 'followup'
    | 'end'
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  if (!messages.length) {
    return null
  }

  // Group messages based on ID, and if there are multiple messages with the same ID, combine them into one message
  const groupedMessages = messages.reduce(
    (acc: { [key: string]: GroupedMessage }, message) => {
      if (!acc[message.id]) {
        acc[message.id] = {
          id: message.id,
          components: [],
          isCollapsed: message.isCollapsed
        }
      }
      acc[message.id].components.push(message.component)
      return acc
    },
    {}
  )

  // Convert grouped messages into an array with explicit type
  const groupedMessagesArray = Object.values(groupedMessages).map(group => ({
    ...group,
    components: group.components as React.ReactNode[]
  })) as {
    id: string
    components: React.ReactNode[]
    isCollapsed?: StreamableValue<boolean>
  }[]

  return (
    <>
      {groupedMessagesArray.map((groupedMessage: GroupedMessage) => (
        <CollapsibleMessage
          key={`${groupedMessage.id}`}
          message={{
            id: groupedMessage.id,
            role: 'assistant',
            content: groupedMessage.components,
            isCollapsed: groupedMessage.isCollapsed
          }}
          isLastMessage={groupedMessage.id === messages[messages.length - 1].id}
        />
      ))}
    </>
  )
}
