import type { VideoData } from "@/types/video"

const DB_NAME = "videostream_db"
const DB_VERSION = 1
const VIDEOS_STORE = "videos"

const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error("Your browser doesn't support IndexedDB"))
      return
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = (event) => {
      reject(new Error("Error opening IndexedDB"))
    }

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      resolve(db)
    }

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result

      if (!db.objectStoreNames.contains(VIDEOS_STORE)) {
        const store = db.createObjectStore(VIDEOS_STORE, { keyPath: "id" })

        store.createIndex("title", "title", { unique: false })
        store.createIndex("platform", "platform", { unique: false })
      }
    }
  })
}

export const addVideo = async (video: VideoData): Promise<void> => {
  try {
    const db = await initDB()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([VIDEOS_STORE], "readwrite")
      const store = transaction.objectStore(VIDEOS_STORE)

      const request = store.add(video)

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = () => {
        reject(new Error("Error adding video to IndexedDB"))
      }

      transaction.oncomplete = () => {
        db.close()
      }
    })
  } catch (error) {
    console.error("IndexedDB error:", error)
    throw error
  }
}

export const getAllVideos = async (): Promise<VideoData[]> => {
  try {
    const db = await initDB()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([VIDEOS_STORE], "readonly")
      const store = transaction.objectStore(VIDEOS_STORE)

      const request = store.getAll()

      request.onsuccess = () => {
        resolve(request.result)
      }

      request.onerror = () => {
        reject(new Error("Error getting videos from IndexedDB"))
      }

      transaction.oncomplete = () => {
        db.close()
      }
    })
  } catch (error) {
    console.error("IndexedDB error:", error)
    return []
  }
}

export const deleteVideo = async (id: string): Promise<void> => {
  try {
    const db = await initDB()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([VIDEOS_STORE], "readwrite")
      const store = transaction.objectStore(VIDEOS_STORE)

      const request = store.delete(id)

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = () => {
        reject(new Error("Error deleting video from IndexedDB"))
      }

      transaction.oncomplete = () => {
        db.close()
      }
    })
  } catch (error) {
    console.error("IndexedDB error:", error)
    throw error
  }
}

export const updateVideo = async (video: VideoData): Promise<void> => {
  try {
    const db = await initDB()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([VIDEOS_STORE], "readwrite")
      const store = transaction.objectStore(VIDEOS_STORE)

      const request = store.put(video)

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = () => {
        reject(new Error("Error updating video in IndexedDB"))
      }

      transaction.oncomplete = () => {
        db.close()
      }
    })
  } catch (error) {
    console.error("IndexedDB error:", error)
    throw error
  }
}
