import { defineNuxtPlugin } from '#app';
import { useFirebase } from '~~/composables/useFirebase';
import UserRepository from '~~/repositories/UserRepository';
import UploadStatsRepository from '~~/repositories/UploadStatsRepository';
import StripeRepository from '~~/repositories/StripeRepository';

export default defineNuxtPlugin(async (nuxtApp) => {
  console.log("Plugin: Firebase");

  const { STRIPE_PUBLISHABLE_KEY } = useRuntimeConfig()

  const sessionCookie = useCookie<Object>('__session');

  const { auth, firestore } = useFirebase();

  const userRepository = new UserRepository(auth);
  useState('userRepository', () => userRepository);

  const uploadStatsRepository = new UploadStatsRepository(firestore);
  useState('uploadStatsRepository', () => uploadStatsRepository);

  const stripeRepository = new StripeRepository(firestore, auth);
  useState('stripeRepository', () => stripeRepository);

  const user = await userRepository.getCurrentUser();
  const userState = useState('user', () => user);

  userRepository.currentUser(user => {
    sessionCookie.value = {
      ...sessionCookie.value, ...{
        isAuthenticated: user !== null
      }
    };

    userState.value = user;
  })

  console.log("firebase plugin loaded");
})