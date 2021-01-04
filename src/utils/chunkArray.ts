export const chunkArray = <T>(array: T[], count: number): T[][] => {
  const length = Math.ceil(array.length / count)

  return Array.from({ length }).map((_, index) => {
    return array.slice(index * count, (index + 1) * count)
  })
}
