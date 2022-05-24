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
import { Subscription } from '../../types/types';

export const createSubscription = async (
  userId: string,
  subscription: Subscription,
): Promise<DocumentReference<any>> =>
  await addDoc(
    collection(firestore, `reportSubscriptions/${userId}/subscriptions`),
    subscription,
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
