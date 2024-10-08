import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  return (
    <div
      className={cn(
        'h-full mx-auto w-full max-w-[1150px] px-2.5 md:px-20 sm:px-0 mb-4 ',
        className
      )}>
      {children}
    </div>
  )
}

export default MaxWidthWrapper