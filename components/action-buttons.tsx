'use client'

import React from 'react'

import { toast } from 'react-hot-toast'

import { Copy, Share2, Download } from 'lucide-react'

import { Button } from './ui/button'

import { useEffect, useState } from 'react'

import { AIMessage } from '@/lib/types'



interface ActionButtonsProps {

  message: AIMessage

}



export function ActionButtons({ message }: ActionButtonsProps) {

  const [mounted, setMounted] = useState(false)



  useEffect(() => {

    setMounted(true)

  }, [])



  const extractContent = (message: AIMessage): string => {

    if (!message) return ''



    const content = message.content

    if (typeof content === 'string') {

      return content

    }



    if (Array.isArray(content)) {

      return content

        .map(item => {

          if (typeof item === 'string') return item

          if (React.isValidElement(item) && item.props?.children) {

            return String(item.props.children)

          }

          return ''

        })

        .join('\n')

    }



    return ''

  }



  const handleCopy = async () => {

    try {

      const text = extractContent(message)

      if (!text) {

        toast.error('No content to copy')

        return

      }

      await navigator.clipboard.writeText(text)

      toast.success('Copied to clipboard')

    } catch (error) {

      toast.error('Failed to copy')

    }

  }



  const handleShare = async () => {

    try {

      const text = extractContent(message)

      if (!text) {

        toast.error('No content to share')

        return

      }

      if (navigator.share) {

        await navigator.share({

          title: 'AI Response',

          text: text,

          url: window.location.href

        })

      } else {

        await navigator.clipboard.writeText(window.location.href)

        toast.success('Link copied to clipboard')

      }

    } catch (error) {

      toast.error('Failed to share')

    }

  }



  const handleDownload = () => {

    try {

      const text = extractContent(message)

      if (!text) {

        toast.error('No content to download')

        return

      }

      const blob = new Blob([text], { type: 'text/plain' })

      const url = URL.createObjectURL(blob)

      const a = document.createElement('a')

      a.href = url

      a.download = 'ai-response.txt'

      document.body.appendChild(a)

      a.click()

      document.body.removeChild(a)

      URL.revokeObjectURL(url)

    } catch (error) {

      toast.error('Failed to download')

    }

  }



  if (!mounted) return null



  return (

    <div className="flex gap-2" suppressHydrationWarning>

      <Button

        variant="outline"

        size="sm"

        className="flex items-center gap-2"

        onClick={handleCopy}

      >

        <Copy className="h-4 w-4" />

        Copy

      </Button>

      <Button

        variant="outline"

        size="sm"

        className="flex items-center gap-2"

        onClick={handleShare}

      >

        <Share2 className="h-4 w-4" />

        Share

      </Button>

      <Button

        variant="outline"

        size="sm"

        className="flex items-center gap-2"

        onClick={handleDownload}

      >

        <Download className="h-4 w-4" />

        Download

      </Button>

    </div>

  )

} 






























