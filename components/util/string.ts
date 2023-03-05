export const getRandomInitials = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const firstInitial = letters.charAt(
    Math.floor(Math.random() * letters.length)
  )
  const lastInitial = letters.charAt(Math.floor(Math.random() * letters.length))
  return `${firstInitial} ${lastInitial}`
}
