import {
  collection,
  addDoc,
  getDoc,
  doc,
  serverTimestamp,
  DocumentSnapshot,
  DocumentData,
} from 'firebase/firestore'
import { db } from '~/firebase'

export const addRecord = async (
  data: any,
): Promise<DocumentSnapshot<DocumentData, DocumentData> | null> => {
  try {
    const enrichedData = {
      ...data,
      createdAt: serverTimestamp(),
    }
    const docRef = await addDoc(collection(db, 'tarot_records'), enrichedData)

    // 保存が成功したかどうか確認
    const savedDoc = await getDoc(doc(db, 'tarot_records', docRef.id))
    console.log(savedDoc)
    if (savedDoc.exists()) {
      console.log('Document successfully written:', savedDoc.data())
      return savedDoc
    } else {
      new Error('Document write failed: No data found.')
      return null
    }
  } catch (e) {
    console.error('Error adding document: ', e)
    return null
  }
}

import { getDocs } from 'firebase/firestore'

export const getAllRecords = async () => {
  try {
    // コレクション参照を作成
    const recordsCollection = collection(db, 'tarot_records')

    // コレクション内のすべてのドキュメントを取得
    const querySnapshot = await getDocs(recordsCollection)
    console.log('querySnapshot:', querySnapshot)

    // 取得したデータを配列に変換
    const records = querySnapshot.docs.map((doc) => ({
      id: doc.id, // ドキュメントIDを含める
      ...doc.data(), // ドキュメントデータを展開
    }))

    console.log('All records:', records)
    return records
  } catch (e) {
    console.error('Error getting documents: ', e)
    throw e // エラーを呼び出し元に伝える
  }
}
