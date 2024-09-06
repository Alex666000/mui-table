export function formatDateISO(dateString: string, isInput: boolean = false): string {
  const date = new Date(dateString)

  if (isNaN(date.getTime())) {
    return '' // Возвращаем пустую строку, если дата некорректна
  }

  // Если дата предназначена для отображения в input (формат YYYY-MM-DDTHH:mm)
  if (isInput) {
    return date.toISOString().slice(0, 16) // Обрезаем до даты и времени
  }

  // Формат для отображения (например, локализованный формат)
  return date.toLocaleString() // Локализованная строка даты и времени
}
