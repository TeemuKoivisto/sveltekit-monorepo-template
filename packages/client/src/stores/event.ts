import { derived, get, writable } from 'svelte/store'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

import { persistedWritable } from './persist'

import { randomHours } from '$utils/events'

import type { ICategoryEvent, IEvent, IEventJSON } from '../types/event'
import { eventToJSON, eventFromJSON } from '$types/event'

export const eventMap = persistedWritable<Map<string, IEvent>>(new Map<string, IEvent>(), {
  key: 'event-map',
  onHydrate: (data: Map<string, IEventJSON>) => {
    const m = new Map<string, IEvent>()
    data?.forEach((val: IEventJSON, key: string) => {
      m.set(key, {
        ...val,
        start_date: DateTime.fromISO(val.start_date),
        end_date: DateTime.fromISO(val.end_date)
      })
    })
    return m
  }
})
export const events = derived(eventMap, map =>
  Array.from(map.entries()).map(([_id, event]) => event)
)

export const eventActions = {
  generateRandomHours() {
    const hours = randomHours()
    const generated: IEvent[] = hours.map((hour, idx) => ({
      id: uuidv4(),
      start_date: DateTime.now().plus({ days: 1 }).set({ hour, minute: 0, second: 0 }),
      end_date: DateTime.now()
        .plus({ days: 1 })
        .set({ hour: hour + 1, minute: 0, second: 0 }),
      body: `Event ${idx}`,
      position: idx
    }))
    eventMap.update(map => {
      Array.from(map.entries()).map(([_id, event]) => event)
      return new Map([
        ...Array.from(map.entries()),
        ...generated.map(e => [e.id, e] as [string, IEvent])
      ])
    })
  },
  createEvent: (time: [number, number]) => {
    const hour = time[0]
    const minute = time[1]
    const start_date = DateTime.now()
      .plus({ days: 1 })
      .set({ hour, minute, second: 0, millisecond: 0 })
    const newEvent: IEvent = {
      id: uuidv4(),
      start_date,
      end_date: start_date.set({ hour: hour + 1 }),
      body: 'New event',
      position: 0
    }
    eventMap.update(m => m.set(newEvent.id, newEvent))
    return newEvent
  },
  createEventFromCategoryEvent: (e: ICategoryEvent) => {
    const start_date = DateTime.now()
      .plus({ days: 1 })
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    const newEvent: IEvent = {
      id: uuidv4(),
      start_date,
      end_date: start_date.set({ hour: 1 }),
      body: e.name,
      position: 0
    }
    eventMap.update(m => m.set(newEvent.id, newEvent))
    return newEvent
  },
  deleteEvent: (eventId: string) => {
    eventMap.update(m => {
      m.delete(eventId)
      return new Map(m)
    })
  },
  updateEvent: (eventId: string, updated: Partial<IEvent>) => {
    eventMap.update(m => {
      const event = m.get(eventId)
      if (event) {
        const ev = { ...event, ...updated } as IEvent
        return m.set(eventId, ev)
      }
      return m
    })
  },
  reset: () => {
    eventMap.set(new Map())
  }
}
