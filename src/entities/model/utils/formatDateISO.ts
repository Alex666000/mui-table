/**
 * Функция для форматирования даты в формате ISO 8601
 * Возвращает дату в виде строки формата YYYY-MM-DD
 * @param dateString - строка с датой в ISO формате
 */
export function formatDateISO(dateString: string, isInput: boolean = false): string {
  const date = new Date(dateString)

  if (isNaN(date.getTime())) {
    return '' // Возвращаем пустую строку, если дата некорректна
  }

  return isInput ? date.toISOString().slice(0, 16) : date.toISOString()
}
