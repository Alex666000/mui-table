import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectDataTable } from '../../model/selectors'
import { selectIsLoggedIn } from '@/features/auth/model/selectors/auth.selectors'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import Button from '@mui/material/Button'
import { selectAppStatus } from '@/app/model/appSelectors'
import { EnhancedTableContent } from './EnhancedTableContent'
import { RequestStatus } from '@/app/model/appReducer'
import { NotFindAnything } from './NotFindAnything'
import { EmptyIcon } from '@/shared/assets/icons/EmptyIcon'
import { formatDateISO } from '../../model/utils'
import { AddRecordModal } from './AddRecordModal'
import { EditRecordModal } from './EditRecordModal'
import { TableData } from '../../model/types'
import { useRecordManagement } from '@/entities/model/hooks'
import { tablesThunks } from '../../model/slice'
import { headCells } from '../../model/const'

export const DataTable: FC = () => {
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
    setNewRecord,
    setEditRecord,
  } = useRecordManagement()

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(tablesThunks.fetchTableData())
    }
  }, [isLoggedIn, dispatch])

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(tablesThunks.fetchTableData())
    }
  }, [status, dispatch])

  const handleDelete = async (id: string) => {
    try {
      await dispatch(tablesThunks.deleteRecord(id))
      dispatch(tablesThunks.fetchTableData()) // Обновляем таблицу после удаления
    } catch (error) {
      console.error('Failed to delete the record:', error)
    }
  }

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
        <IconButton onClick={() => handleEdit(row)} sx={{ padding: '6px' }}>
          <BorderColorOutlinedIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(row.id)} sx={{ padding: '6px' }}>
          <DeleteOutlinedIcon />
        </IconButton>
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
      <Button variant="contained" color="primary" onClick={handleAdd}>
        Добавить запись
      </Button>
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
