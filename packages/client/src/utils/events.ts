import type { DateTime } from 'luxon'

const HOUR_INTERVALS = Array.from(Array(24).keys())
export const HOUR_HEIGHT = 48 // TODO allow decreasing/increasing of this
const intervalByFours = (h: number) => [
  h * HOUR_HEIGHT,
  (h + 0.25) * HOUR_HEIGHT,
  (h + 0.5) * HOUR_HEIGHT,
  (h + 0.75) * HOUR_HEIGHT
]
const GRID_EVENT_POSITIONS = HOUR_INTERVALS.map(h => intervalByFours(h))
  .reduce((acc, val) => acc.concat(val), []) // Flatten the list
  .sort((a, b) => a - b)

export const randomHours = () => {
  const val: number[] = []
  HOUR_INTERVALS.forEach(h => {
    if (Math.random() > 0.75) {
      val.push(h)
    }
  })
  return val
}
export function calculateClosestGridPos(pos: number) {
  let closest = GRID_EVENT_POSITIONS[0]
  GRID_EVENT_POSITIONS.some(v => {
    if (Math.abs(v - pos) <= Math.abs(closest - pos)) {
      closest = v
      return false
    } else {
      return true
    }
  })
  return closest
}
export function calculateEventTop(startDate: DateTime) {
  const hour = startDate.hour
  const minutes = startDate.minute
  return `${(hour + minutes / 60) * HOUR_HEIGHT}px`
}
export function calculateEventHeight(startDate: DateTime, endDate: DateTime) {
  const dur = endDate.diff(startDate).as('minutes')
  const hours = Math.floor(dur / 60)
  const minutes = dur % 60
  const margins = 0 // hours * 2
  // 5 hours = 238px
  return roundTo2Decimals(hours * HOUR_HEIGHT + minutes * (HOUR_HEIGHT / 60) + margins)
}
export function getTimeAtPos(pos: number) {
  const hour = Math.floor(pos / HOUR_HEIGHT)
  const minutes = 60 * (pos / HOUR_HEIGHT - hour)
  return [hour, minutes] as [number, number]
}
export function roundTo2Decimals(num: number) {
  return Math.round((num + Number.EPSILON) * 100) / 100
}
