import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { tablesThunks } from '../../model/slice'
import { TableData } from '../../model/types'

export const useRecordManagement = () => {
  const dispatch = useDispatch()
  const [isAddModalOpen, setAddModalOpen] = useState(false)
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [newRecord, setNewRecord] = useState<TableData>({
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
  const [editRecord, setEditRecord] = useState<TableData | null>(null)

  const handleAdd = () => setAddModalOpen(true)

  const handleEdit = (record: TableData) => {
    setEditRecord(record)
    setEditModalOpen(true)
  }

  const handleModalClose = () => {
    setAddModalOpen(false)
    setEditModalOpen(false)
  }

  const handleSaveRecord = async (record: TableData) => {
    try {
      await dispatch(tablesThunks.createRecord(record))
      await dispatch(tablesThunks.fetchTableData())
    } catch (error) {
      console.error('Failed to save the record:', error)
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
  }

  const handleUpdateRecord = async (record: TableData) => {
    try {
      if (editRecord?.id) {
        await dispatch(tablesThunks.updateRecord({ id: editRecord.id, data: record }))
        await dispatch(tablesThunks.fetchTableData())
      }
    } catch (error) {
      console.error('Failed to update the record:', error)
    } finally {
      setEditModalOpen(false)
      setEditRecord(null)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await dispatch(tablesThunks.deleteRecord(id))
      await dispatch(tablesThunks.fetchTableData())
    } catch (error) {
      console.error('Failed to delete the record:', error)
    }
  }

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
