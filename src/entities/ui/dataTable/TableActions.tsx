import IconButton from '@mui/material/IconButton'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import { Table } from '../../model/types'
import { ReturnComponent } from '@/shared/types'
import { memo } from 'react'

interface TableActionsProps {
  row: Table
  handleEdit: (row: Table) => void
  handleDelete: (id: string) => void
  handleAdd: () => void
}

export const TableActions = memo(
  ({ row, handleEdit, handleDelete, handleAdd }: TableActionsProps): ReturnComponent => (
    <>
      <IconButton onClick={() => handleEdit(row)} sx={{ padding: '6px' }}>
        <BorderColorOutlinedIcon />
      </IconButton>
      <IconButton onClick={() => handleDelete(row.id)} sx={{ padding: '6px' }}>
        <DeleteOutlinedIcon />
      </IconButton>
      <IconButton onClick={handleAdd} sx={{ padding: '6px' }}>
        <AddToPhotosIcon />
      </IconButton>
    </>
  )
)
