'use client'

import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { SourceReference } from '@/lib/types'
import Link from 'next/link'

interface ReferenceLinkProps {
  reference: SourceReference
}

export function ReferenceLink({ reference }: ReferenceLinkProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <sup>
            <Link
              href={reference.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-1 text-xs font-medium text-primary hover:text-primary/80 cursor-pointer"
            >
              {reference.number}
            </Link>
          </sup>
        </TooltipTrigger>
        {reference.title && (
          <TooltipContent side="top" className="max-w-sm">
            <p className="text-sm font-medium">{reference.title}</p>
            {reference.snippet && (
              <p className="text-xs text-muted-foreground mt-1">{reference.snippet}</p>
            )}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}