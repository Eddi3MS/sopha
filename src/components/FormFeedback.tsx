import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
} from '@radix-ui/react-icons'

export const FormFeedback = ({
  message,
  type,
}: {
  message?: string
  type?: 'error' | 'success'
}) => {
  if (!message || !type) return null

  if (type === 'error') {
    return (
      <div className="flex items-center p-3 text-sm rounded-md bg-destructive/15 gap-x-2 text-destructive">
        <ExclamationTriangleIcon className="w-4 h-4" />
        <p>{message}</p>
      </div>
    )
  }

  return (
    <div className="flex items-center p-3 text-sm rounded-md bg-emerald-500/15 gap-x-2 text-emerald-500">
      <CheckCircledIcon className="w-4 h-4" />
      <p>{message}</p>
    </div>
  )
}
