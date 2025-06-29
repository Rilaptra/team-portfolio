import ErrorBoundary from '@/components/Utils/ErrorBoundary'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  children?: ReactNode;
  className?: string;
}

export default function Section({id = "", children = null, className = ''} : SectionProps) {
    return <ErrorBoundary>
        <section id={id} className={cn('px-4', className)}>{children}</section>
    </ErrorBoundary>
}