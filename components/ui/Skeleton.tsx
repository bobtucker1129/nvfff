'use client'

export default function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-stone-800 rounded ${className}`}
      aria-hidden="true"
    />
  )
}
