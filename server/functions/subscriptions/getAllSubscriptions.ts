import {
  addDoc,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  updateDoc,
  where,
} from 'firebase/firestore/lite';

import { firestore } from '../../config/firebase';

const getAllSubscriptions = async () => {
  // TODO: Get user id
  const subs = query(collectionGroup(firestore, 'subscriptions'));
  await getDocs(subs).then(
    (querySnapshot) => {
      const tempReports: any[] = [];

      querySnapshot.forEach((subscription: QueryDocumentSnapshot) => {
        tempReports.push({
          id: subscription.id,
          user: subscription.ref.parent.parent?.id,
          ...subscription.data(),
        });
      });
      console.log(tempReports);
    },
    (error) => console.log(error.message),
  );
  /*
  const subsRef = collection(
    firestore,
    `reportSubscriptions/eS7nZDCOlMSJPjQIT3wbcwytiYP2/subscriptions`,
  );
  const q = query(subsRef, where('config.periodicy', '==', 'weekly'));
  await getDocs(q).then(
    (querySnapshot) => {
      const tempReports: any[] = [];

      querySnapshot.forEach((subscription: DocumentData) => {
        tempReports.push({ id: subscription.id, ...subscription.data() });
      });
      console.log(tempReports.length);
    },
    (error) => console.log(error.message),
  );*/
};
export default getAllSubscriptions;
