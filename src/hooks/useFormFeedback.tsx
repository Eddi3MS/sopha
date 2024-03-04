import { useState } from 'react'

type FeedbackState = {
  message: string
  type: 'error' | 'success'
} | null

const initState: FeedbackState = null

export const useFormFeedback = () => {
  const [feedback, setFeedback] = useState<FeedbackState>(initState)

  return { feedback, setFeedback }
}
