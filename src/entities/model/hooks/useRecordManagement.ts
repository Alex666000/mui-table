import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { tablesThunks } from '../../model/slice'
import { Table } from '../../model/types'
import { Nullable } from '@/shared/types/nullable'

export const useRecordManagement = () => {
  const dispatch = useDispatch()
  const [isAddModalOpen, setAddModalOpen] = useState(false)
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [newRecord, setNewRecord] = useState<Table>({
    id: `${Math.random()}`,
    documentStatus: '',
    employeeNumber: '',
    documentType: '',
    documentName: '',
    companySignatureName: '',
    employeeSignatureName: '',
    employeeSigDate: new Date().toISOString().slice(0, 16),
    companySigDate: new Date().toISOString().slice(0, 16),
  })
  const [editRecord, setEditRecord] = useState<Nullable<Table>>(null)

  const handleAdd = useCallback(() => setAddModalOpen(true), [])

  const handleEdit = useCallback((record: Table) => {
    setEditRecord(record)
    setEditModalOpen(true)
  }, [])

  const handleModalClose = useCallback(() => {
    setAddModalOpen(false)
    setEditModalOpen(false)
  }, [])

  const handleSaveRecord = useCallback(
    async (record: Table) => {
      try {
        await dispatch(tablesThunks.createRecord(record))
        await dispatch(tablesThunks.fetchTableData())
      } catch (error) {
        // console.error('Failed to save the record:', error)
      } finally {
        setAddModalOpen(false)
        setNewRecord({
          id: `${Math.random()}`,
          documentStatus: '',
          employeeNumber: '',
          documentType: '',
          documentName: '',
          companySignatureName: '',
          employeeSignatureName: '',
          employeeSigDate: new Date().toISOString().slice(0, 16),
          companySigDate: new Date().toISOString().slice(0, 16),
        })
      }
    },
    [dispatch]
  )

  const handleUpdateRecord = useCallback(
    async (record: Table) => {
      try {
        if (editRecord?.id) {
          await dispatch(tablesThunks.updateRecord({ id: editRecord.id, data: record }))
          await dispatch(tablesThunks.fetchTableData())
        }
      } catch (error) {
        // console.error('Failed to update the record:', error)
      } finally {
        setEditModalOpen(false)
        setEditRecord(null)
      }
    },
    [dispatch, editRecord]
  )

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await dispatch(tablesThunks.deleteRecord(id))
        await dispatch(tablesThunks.fetchTableData())
      } catch (error) {
        // console.error('Failed to delete the record:', error)
      }
    },
    [dispatch]
  )

  return {
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
  }
}
