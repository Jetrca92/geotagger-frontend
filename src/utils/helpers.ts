export const errorDistanceString = (distance: number) => {
  if (distance < 999) {
    return `${distance.toString()} m`
  }
  return `${Math.round(distance / 1000).toString()} km`
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const day = String(date.getDate())
  const month = String(date.getMonth() + 1) // Months are zero-based
  const year = date.getFullYear()

  const formattedDate = `${hours}:${minutes} ${day}.${month}.${year}`
  return formattedDate
}
