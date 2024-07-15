import { useState } from 'react'

export const useOpen = (isOpened?: boolean) => {
  const [open, setOpen] = useState(Boolean(isOpened))

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const handleToggle = () => setOpen((open) => !open)

  return {
    open,
    setOpen,
    handleOpen,
    handleClose,
    handleToggle
  }
}
