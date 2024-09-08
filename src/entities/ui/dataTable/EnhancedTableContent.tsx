import { memo, ReactNode } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import { TableSkeleton } from '@/shared/ui/TableSkeleton/TableSkeleton'
import { RequestStatus } from '@/app/model/appSlice'
import { ReturnComponent } from '@/shared/types'
import { EnhancedTableHead, HeadCellType } from './EnhancedTableHead'

type TableContentPropsType = {
  children?: ReactNode[]
  headCells: HeadCellType[]
  pageCount: number
  status: RequestStatus
}
export const EnhancedTableContent = memo(
  ({ children, headCells, pageCount = 7, status }: TableContentPropsType): ReturnComponent => {
    return (
      <Paper sx={{ mb: 2, width: '100%' }}>
        <TableContainer>
          <Table aria-labelledby={'tableTitle'} size={'medium'} sx={{ minWidth: 750 }}>
            <EnhancedTableHead headCells={headCells} status={status} />
            <TableBody sx={{ height: 'inherit' }}>
              {status === 'loading' && (
                <TableSkeleton amountCell={headCells.length} amountRow={pageCount} />
              )}
              {status !== 'loading' && children}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    )
  }
)
