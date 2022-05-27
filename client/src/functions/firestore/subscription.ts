import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore/lite';

import { firestore } from '../../config/firebase';
import { objectWithKeyStr, Subscription } from '../../types/types';

export const createSubscription = async (
  userId: string,
  subscription: Subscription,
): Promise<DocumentReference<any>> =>
  await addDoc(
    collection(firestore, `reportSubscriptions/${userId}/subscriptions`),
    subscription,
  );

export const updateSubscription = async (
  userId: string,
  subscriptionId: string,
  subscription: Subscription,
): Promise<void> =>
  await updateDoc(
    doc(
      firestore,
      `reportSubscriptions/${userId}/subscriptions/${subscriptionId}`,
    ),
    subscription as objectWithKeyStr,
  );

export const deleteSubscription = async (
  userId: string,
  subscriptionId: any,
): Promise<void> =>
  await deleteDoc(
    doc(
      firestore,
      `reportSubscriptions/${userId}/subscriptions/${subscriptionId}`,
    ),
  );

export const getSubscriptions = async (userId: string): Promise<DocumentData> =>
  await getDocs(
    collection(firestore, `reportSubscriptions/${userId}/subscriptions`),
  );

export const getSubscription = async (
  userId: string,
  subscriptionId: string,
): Promise<DocumentData> =>
  await getDoc(
    doc(
      firestore,
      `reportSubscriptions/${userId}/subscriptions/${subscriptionId}`,
    ),
  );

export const getSubscriptionReports = async (
  userId: string,
  subscriptionId: string,
): Promise<DocumentData> =>
  await getDocs(
    collection(
      firestore,
      `reports/${userId}/subscriptions/${subscriptionId}/reports`,
    ),
  );

export const getSubscriptionReport = async (
  userId: string,
  subscriptionId: string,
  reportId: string,
): Promise<DocumentData> =>
  await getDoc(
    doc(
      firestore,
      `reports/${userId}/subscriptions/${subscriptionId}/reports/${reportId}`,
    ),
  );

export const deleteSubscriptionReport = async (
  userId: string,
  subscriptionId: string,
  reportId: string,
): Promise<void> => {
  await deleteDoc(
    doc(
      firestore,
      `reports/${userId}/subscriptions/${subscriptionId}/reports/${reportId}`,
    ),
  );
};

export const deleteSubscriptionAndReports = async (
  userId: string,
  subscriptionId: any,
): Promise<void> =>
  await deleteSubscription(userId, subscriptionId).then(
    async (_) =>
      await getSubscriptionReports(userId, subscriptionId).then(
        async (reportsSnapshot) =>
          await reportsSnapshot.forEach(
            async (report: DocumentData) =>
              await deleteSubscriptionReport(
                userId,
                subscriptionId,
                report.id,
              ).catch((err) => console.log(err.message)),
          ),
        (err) => console.log(err.message),
      ),
    (err) => console.log(err.message),
  );

export const deleteSubscriptionsAndReports = async (
  userId: string,
): Promise<void> =>
  await getSubscriptions(userId).then(
    async (subscriptionsSnapshot) =>
      await subscriptionsSnapshot.forEach(
        async (subscription: DocumentData) =>
          await deleteSubscriptionAndReports(userId, subscription.id).catch(
            (err) => console.log(err.message),
          ),
      ),
    (err) => console.log(err.message),
  );
