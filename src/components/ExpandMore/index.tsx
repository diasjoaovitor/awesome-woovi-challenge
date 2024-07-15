import { PropsWithChildren } from 'react'
import { Box, Collapse, IconButton, Typography } from '@mui/material'
import { ExpandLess, ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { useOpen } from '@/hooks'
import * as S from './styles'

export const ExpandMore = ({
  children,
  title
}: PropsWithChildren<{ title: string }>) => {
  const { open, handleToggle } = useOpen()

  return (
    <Box>
      <Box sx={S.Title}>
        <Typography component="p">
          <strong>{title}</strong>
        </Typography>
        <IconButton onClick={handleToggle}>
          {!open ? <ExpandMoreIcon /> : <ExpandLess />}
        </IconButton>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </Box>
  )
}
