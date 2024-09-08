/**
 * Функция для форматирования даты в формате ISO 8601.
 * @param {string} dateString - Строка с датой в формате ISO, например, '2024-09-06T21:54:00.000Z'.
 * @param {boolean} [isInput=false] - Флаг, указывающий, нужно ли форматировать дату для использования в поле ввода (`true`) или для отображения (`false`).
 * @returns {string} - Отформатированная строка даты:
 *  - Если `isInput` равно `true`, возвращается дата и время в формате `YYYY-MM-DDTHH:mm`, который подходит для использования в поле типа `datetime-local`.
 *  - Если `isInput` равно `false`, возвращается локализованная строка даты и времени, соответствующая текущему региону и языковым настройкам.
 */
export function formatDateISO(dateString: string, isInput: boolean = false): string {
  const date = new Date(dateString)

  if (isNaN(date.getTime())) {
    return ''
  }
  date.setHours(date.getHours() - 3)

  if (isInput) {
    return date.toISOString().slice(0, 16)
  }

  // Формат для отображения с московским временем
  return date.toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })
}
