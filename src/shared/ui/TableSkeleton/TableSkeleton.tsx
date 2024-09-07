import { FC } from 'react'

import Skeleton from '@mui/material/Skeleton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

type TableSkeleton = {
  amountCell?: number
  amountRow?: number
}

export const TableSkeleton: FC<TableSkeleton> = ({ amountCell = 5, amountRow = 6 }) => {
  const skeletonItem = Array.from(new Array(amountRow)).map((item, index) => {
    return (
      <TableRow key={index} sx={{ height: '58px' }}>
        {Array.from(new Array(amountCell)).map((cell, i) => {
          return (
            <TableCell component={'th'} key={i} scope={'row'}>
              <Skeleton />
            </TableCell>
          )
        })}
      </TableRow>
    )
  })

  return <>{skeletonItem}</>
}
