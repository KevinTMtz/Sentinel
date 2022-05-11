import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
} from 'firebase/firestore/lite';

import { firestore } from '../../config/firebase';

export const createReport = async (
  userId: string,
  report: any,
): Promise<DocumentReference<any>> => {
  return await addDoc(collection(firestore, `reports/${userId}/savedReports`), {
    ...report,
  });
};

export const deleteReport = async (
  reportId: string,
  userId: string,
): Promise<void> => {
  return await deleteDoc(
    doc(firestore, `reports/${userId}/savedReports/${reportId}`),
  );
};
