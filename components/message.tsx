'use client'



import { MemoizedReactMarkdown } from './ui/markdown'

import rehypeExternalLinks from 'rehype-external-links'

import remarkGfm from 'remark-gfm'

import { CodeBlock } from './ui/codeblock'

import { ReferenceLink } from './reference-link'

import { SourceReference } from '@/lib/types'

import { Fragment } from 'react'



interface BotMessageProps {

  content: string | React.ReactNode[];

  references?: any;

}



export function BotMessage({ content, references }: BotMessageProps) {

  // Split content by reference markers and create an array of content and references

  const renderContentWithReferences = () => {

    if (!references?.length) {

      return typeof content === 'string' ? (

        <MemoizedReactMarkdown>{content}</MemoizedReactMarkdown>

      ) : (

        content

      )

    }



    if (typeof content !== 'string') {

      return content

    }



    const parts = content.split(/(\[ref:\d+\])/g)

    return parts.map((part, index) => {

      const refMatch = part.match(/\[ref:(\d+)\]/)

      if (refMatch) {

        const refNumber = parseInt(refMatch[1])

        const reference = references.find((ref: SourceReference) => ref.number === refNumber)

        return reference ? (

          <Fragment key={index}>

            <ReferenceLink reference={reference} />

          </Fragment>

        ) : null

      }

      return part ? (

        <Fragment key={index}>

          <MemoizedReactMarkdown

            rehypePlugins={[[rehypeExternalLinks, { target: '_blank' }]]}

            remarkPlugins={[remarkGfm]}

            components={{

              code({ node, inline, className, children, ...props }) {

                if (children.length) {

                  if (children[0] == '▍') {

                    return (

                      <span className="mt-1 cursor-default animate-pulse">▍</span>

                    )

                  }

                  children[0] = (children[0] as string).replace('`▍`', '▍')

                }



                const match = /language-(\w+)/.exec(className || '')



                if (inline) {

                  return (

                    <code className={className} {...props}>

                      {children}

                    </code>

                  )

                }



                return (

                  <CodeBlock

                    key={Math.random()}

                    language={(match && match[1]) || ''}

                    value={String(children).replace(/\n$/, '')}

                    {...props}

                  />

                )

              }

            }}

          >

            {part}

          </MemoizedReactMarkdown>

        </Fragment>

      ) : null

    })

  }



  return (

    <div className="prose-sm prose-neutral prose-a:text-accent-foreground/50">

      {renderContentWithReferences()}

    </div>

  )

}






