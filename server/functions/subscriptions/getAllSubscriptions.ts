import {
  collectionGroup,
  getDocs,
  query,
  where,
} from 'firebase/firestore/lite';

import { firestore } from '../../config/firebase';
import addSubscriptionReport from './addSubscriptionReport';

const isPending = (
  periodicy: 'weekly' | 'monthly' | 'daily',
  startDate: Date,
): Boolean => {
  if (periodicy == 'daily') return true;

  const today = new Date();

  return periodicy == 'weekly'
    ? startDate.getDay() == today.getDay()
    : startDate.getDate() == today.getDate();
};

const getAllSubscriptions = async () => {
  const conditions = [
    where('config.isActive', '==', true),
    where(
      'config.startDate',
      '<=',
      new Date(new Date().setHours(23, 59, 59, 999)),
    ),
  ];

  const validSubsQuery = query(
    collectionGroup(firestore, 'subscriptions'),
    ...conditions,
  );

  await getDocs(validSubsQuery).then(
    (querySnapshot) => {
      const pendingSubs = querySnapshot.docs

        .map((subscription) => {
          return {
            id: subscription.id,
            user: subscription.ref.parent.parent!!.id,
            config: subscription.get('config'),
            query: subscription.get('query'),
          };
        })

        .filter((subscription) =>
          isPending(
            subscription.config.periodicy,
            subscription.config.startDate.toDate(),
          ),
        );

      pendingSubs.forEach((subscription) => {
        addSubscriptionReport(subscription);
      });

      console.log('Generated all pending subscription reports...');
    },
    (error) => console.log(error.message),
  );
};
export default getAllSubscriptions;
