import { SxProps, Theme } from '@mui/material'

export const Wrapper: SxProps<Theme> = {
  li: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    cursor: 'pointer',
    '+ li': {
      borderTop: 0
    }
  }
}

export const ListItemTitle: SxProps<Theme> = {
  backgroundColor: 'lightGrey',
  borderRadius: 3,
  px: 2,
  position: 'absolute',
  top: -10,
  fontWeight: 'bold'
}

export const GetListItem = ({
  isChecked,
  nextElementIsChecked
}: {
  isChecked: boolean
  nextElementIsChecked: boolean
}) => {
  const borderColor = !isChecked ? 'text.secondary' : 'primary.main'
  const borderBottomColor = !nextElementIsChecked ? borderColor : 'primary.main'

  const style: SxProps<Theme> = {
    border: 1,
    borderColor,
    borderBottomColor,
    ':first-of-type': {
      borderRadius: 2,
      mb: 3
    },
    ':nth-of-type(2)': {
      border: 1,
      borderRadius: 2,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderColor,
      borderBottomColor
    },
    ':last-of-type': {
      borderRadius: 2,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
    }
  }
  return style
}

export const CashbackListItem: SxProps<Theme> = {
  borderRadius: 2,
  my: 2
}

export const MainContent: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  width: '100%'
}
