import { FC } from 'react'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

export type HeadCellType = {
  id: string
  label: string
}
type EnhancedTableProps = {
  headCells: HeadCellType[]
  onSortPackList?: (TableHeaderData: string) => void
}
export const EnhancedTableHead: FC<EnhancedTableProps> = ({ headCells }) => {
  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: 'rgb(239, 239, 239)' }}>
        {headCells?.map((headCell) => (
          <TableCell
            key={headCell.id}
            sx={{
              '&:first-of-type': { width: '350px' },
              '&:last-of-type': { width: '280px' },
              width: '220px',
            }}>
            {headCell.id === 'empty' ? headCell.label : <>{headCell.label}</>}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
