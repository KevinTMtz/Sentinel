import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
} from 'firebase/firestore/lite';

import { firestore } from '../../config/firebase';

export const createReport = async (
  userId: string,
  report: any,
): Promise<DocumentReference<any>> =>
  await addDoc(collection(firestore, `reports/${userId}/savedReports`), report);

export const deleteReport = async (
  userId: string,
  reportId: string,
): Promise<void> =>
  await deleteDoc(doc(firestore, `reports/${userId}/savedReports/${reportId}`));

export const getReport = async (
  userId: string,
  reportId: string,
): Promise<DocumentData> =>
  await getDoc(doc(firestore, `reports/${userId}/savedReports/${reportId}`));

export const getReports = async (userId: string): Promise<DocumentData> =>
  await getDocs(collection(firestore, `reports/${userId}/savedReports`));

export const deleteReports = async (userId: string): Promise<void> =>
  await getReports(userId).then(
    async (reportsSnapshot) =>
      await reportsSnapshot.forEach(
        async (report: DocumentData) => await deleteReport(userId, report.id),
      ),
    (err) => console.log(err.message),
  );
