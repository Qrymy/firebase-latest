import { useState } from 'react'
import { firestore } from '@/lib/firebase'

export const useFirestore = <T>() => {
  const [items, setItems] = useState<T[]>([])

  const setDocument = (collection: string, data: Partial<T>) => {
    const ref = firestore.collection(collection).doc()
    const paylaod = {
      ...data,
      id: ref.id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    return ref.set(paylaod)
  }

  const getItems = async (path: string): Promise<T[]> => {
    const result = await firestore
      .collection(path)
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get()
    const data = result.docs.map((doc) => doc.data() as T)
    setItems(data)
    return data
  }

  return { items, setDocument, getItems }
}