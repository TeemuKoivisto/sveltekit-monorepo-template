import { derived, get, writable } from 'svelte/store'
import { v4 as uuidv4 } from 'uuid'

import { persistedWritable } from './persist'

import type { ICategory, ICategoryEvent } from '$types/event'

const EXAMPLE_CATEGORIES: ICategory[] = [
  {
    id: uuidv4(),
    name: 'TODO',
    x: 0,
    y: 0,
    items: [
      { id: uuidv4(), position: 0, name: 'item21' },
      { id: uuidv4(), position: 1, name: 'item22' },
      { id: uuidv4(), position: 2, name: 'item23' },
      { id: uuidv4(), position: 3, name: 'item24' },
      { id: uuidv4(), position: 4, name: 'item25' },
      { id: uuidv4(), position: 5, name: 'item26' },
      { id: uuidv4(), position: 6, name: 'item27' },
      { id: uuidv4(), position: 7, name: 'item28' },
      { id: uuidv4(), position: 8, name: 'item29' }
    ]
  },
  {
    id: uuidv4(),
    name: 'DOING',
    x: 0,
    y: 1,
    items: []
  },
  {
    id: uuidv4(),
    name: 'DONE',
    x: 0,
    y: 2,
    items: []
  },
  {
    id: uuidv4(),
    name: 'Errands',
    x: 1,
    y: 0,
    items: [
      { id: uuidv4(), position: 0, name: 'item41' },
      { id: uuidv4(), position: 1, name: 'item42' },
      { id: uuidv4(), position: 2, name: 'item43' },
      { id: uuidv4(), position: 3, name: 'item44' },
      { id: uuidv4(), position: 4, name: 'item45' },
      { id: uuidv4(), position: 5, name: 'item46' },
      { id: uuidv4(), position: 6, name: 'item47' },
      { id: uuidv4(), position: 7, name: 'item48' },
      { id: uuidv4(), position: 8, name: 'item49' }
    ]
  },
  {
    id: uuidv4(),
    name: 'Check out',
    x: 1,
    y: 1,
    items: []
  },
  {
    id: uuidv4(),
    name: 'Chores',
    x: 1,
    y: 2,
    items: []
  },
  {
    id: uuidv4(),
    name: 'Hobbies',
    x: 1,
    y: 3,
    items: []
  }
]

export const categoryMap = persistedWritable<Map<string, ICategory>>(new Map<string, ICategory>(), {
  key: 'category-map'
})
export const categories = derived(categoryMap, map =>
  Array.from(map.entries())
    .map(([_id, event]) => event)
    .sort((a, b) => a.y - b.y)
)
export const leftCategories = derived(categories, cat => cat.filter(c => c.x === 0))
export const rightCategories = derived(categories, cat => cat.filter(c => c.x === 1))
export const selectedCategoryEvent = writable<ICategoryEvent | null>(null)

export const categoryActions = {
  generateExampleCategories() {
    categoryMap.update(map => {
      Array.from(map.entries()).map(([_id, event]) => event)
      return new Map([
        ...Array.from(map.entries()),
        ...EXAMPLE_CATEGORIES.map(e => [e.id, e] as [string, ICategory])
      ])
    })
  },
  createCategory: (name: string, x: number, y: number) => {
    const newCategory: ICategory = {
      id: uuidv4(),
      name,
      x,
      y,
      items: []
    }
    categoryMap.update(m => {
      m.forEach((val, key) => {
        if (val.x === x && val.y >= y) {
          m = m.set(key, { ...val, y: val.y + 1 })
        }
      })
      return m.set(newCategory.id, newCategory)
    })
    return newCategory
  },
  deleteCategory: (id: string) => {
    categoryMap.update(m => {
      m.delete(id)
      return new Map(m)
    })
  },
  updateCategory: (id: string, updated: Partial<ICategory>) => {
    categoryMap.update(m => {
      const cat = m.get(id)
      if (cat) {
        return m.set(id, { ...cat, ...updated })
      }
      return m
    })
  },
  updateCategoryUnsynced: (id: string, updated: Partial<ICategory>) => {
    categoryMap.updateWithNoSync(m => {
      const cat = m.get(id)
      if (cat) {
        return m.set(id, { ...cat, ...updated })
      }
      return m
    })
  },
  updateCategoryOrder: (x: number, updated: ICategory[]) => {
    categoryMap.update(m => {
      let newMap = new Map(m)
      updated.forEach((c, idx) => {
        newMap = newMap.set(c.id, { ...c, x, y: idx })
      })
      return newMap
    })
  },
  updateCategoryOrderUnsynced: (x: number, updated: ICategory[]) => {
    categoryMap.updateWithNoSync(m => {
      let newMap = new Map(m)
      updated.forEach((c, idx) => {
        newMap = newMap.set(c.id, { ...c, x, y: idx })
      })
      return newMap
    })
  },
  createCategoryEvent: (categoryId: string) => {
    categoryMap.update(m => {
      const cat = m.get(categoryId)
      if (cat) {
        const newEvent: ICategoryEvent = {
          id: uuidv4(),
          position: 0,
          name: 'untitled'
        }
        return m.set(categoryId, {
          ...cat,
          items: [newEvent, ...cat.items].map((c, idx) => ({ ...c, position: idx }))
        })
      }
      return m
    })
  },
  updateCategoryEvent: (categoryId: string, id: string, updated: Partial<ICategoryEvent>) => {
    categoryMap.update(m => {
      const cat = m.get(categoryId)
      if (cat) {
        const newEvents = cat.items.map(e => (e.id === id ? { ...e, ...updated } : e))
        return m.set(categoryId, {
          ...cat,
          items: newEvents
        })
      }
      return m
    })
  },
  deleteCategoryEvent: (categoryId: string, id: string) => {
    categoryMap.update(m => {
      const cat = m.get(categoryId)
      if (cat) {
        return m.set(categoryId, {
          ...cat,
          items: cat.items.filter(e => e.id !== id).map((c, idx) => ({ ...c, position: idx }))
        })
      }
      return m
    })
  },
  setSelectedCategoryEvent: (e?: ICategoryEvent) => {
    if (e) {
      selectedCategoryEvent.set(e)
    } else {
      selectedCategoryEvent.set(null)
    }
  },
  reset: () => {
    categoryMap.set(new Map())
  }
}
