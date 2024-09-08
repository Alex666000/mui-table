import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectDataTable } from '../../model/selectors'
import { selectIsLoggedIn } from '@/features/auth/model/selectors/auth.selectors'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { selectAppStatus } from '@/app/model/appSelectors'
import { EnhancedTableContent } from './EnhancedTableContent'
import { RequestStatus } from '@/app/model/appSlice'
import { NotFindAnything } from './NotFindAnything'
import { EmptyIcon } from '@/shared/assets/icons/EmptyIcon'
import { formatDateISO } from '../../model/utils'
import { AddRecordModal } from './AddRecordModal'
import { EditRecordModal } from './EditRecordModal'
import { TableData } from '../../model/types'
import { useRecordManagement } from '@/entities/model/hooks'
import { tablesThunks } from '../../model/slice'
import { headCells } from '../../model/const'
import { ReturnComponent } from '@/shared/types'
import { TableActions } from '@/entities/ui/dataTable/TableActions'

export const DataTable = (): ReturnComponent => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const tableData = useSelector(selectDataTable)
  const status = useSelector(selectAppStatus)

  const {
    isAddModalOpen,
    isEditModalOpen,
    newRecord,
    editRecord,
    handleAdd,
    handleEdit,
    handleModalClose,
    handleSaveRecord,
    handleUpdateRecord,
    handleDelete,
    setNewRecord,
    setEditRecord,
  } = useRecordManagement()

  useEffect(() => {
    if (isLoggedIn || status === 'succeeded') {
      dispatch(tablesThunks.fetchTableData())
    }
  }, [isLoggedIn, status, dispatch])

  const tableItems = (tableData as TableData[]).map((row, index) => (
    <TableRow hover key={index}>
      <TableCell align={'left'}>{formatDateISO(row.companySigDate)}</TableCell>
      <TableCell align={'left'}>{row.companySignatureName}</TableCell>
      <TableCell align={'left'}>{row.documentName}</TableCell>
      <TableCell align={'left'}>{row.documentStatus}</TableCell>
      <TableCell align={'left'}>{row.documentType}</TableCell>
      <TableCell align={'left'}>{row.employeeNumber}</TableCell>
      <TableCell align={'left'}>{formatDateISO(row.employeeSigDate)}</TableCell>
      <TableCell align={'left'}>{row.employeeSignatureName}</TableCell>
      <TableCell align={'left'}>
        <TableActions
          row={row}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleAdd={handleAdd}
        />
      </TableCell>
    </TableRow>
  ))

  return (
    <>
      <EnhancedTableContent headCells={headCells} pageCount={20} status={status as RequestStatus}>
        {tableItems}
      </EnhancedTableContent>

      {!(tableData as TableData[]).length && (
        <NotFindAnything status={status as RequestStatus} value="Данные" />
      )}
      {status === 'failed' && <EmptyIcon />}
      <AddRecordModal
        open={isAddModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveRecord}
        newRecord={newRecord}
        setNewRecord={setNewRecord}
      />
      {editRecord && (
        <EditRecordModal
          open={isEditModalOpen}
          onClose={handleModalClose}
          onSave={handleUpdateRecord}
          record={editRecord}
          setRecord={setEditRecord}
        />
      )}
    </>
  )
}
