import { Loader2Icon } from 'lucide-react'

export const Loading = () => {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <Loader2Icon className="animate-spin" />
    </div>
  )
}
