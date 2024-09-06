/**
 * Функция для форматирования даты в формате ISO 8601
 * Возвращает дату в виде строки формата YYYY-MM-DD
 * @param dateString - строка с датой в ISO формате
 */
export const formatDateISO = (dateString: string) => {
  const date = new Date(dateString)
  return date.toISOString().split('T')[0] // Возвращаем часть даты без времени
}
