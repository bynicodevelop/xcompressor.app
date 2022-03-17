import { defineNuxtPlugin } from '#app';
import { useFirebase } from '~~/composables/useFirebase';
import UserRepository from '~~/repositories/UserRepository';
import UploadStatsRepository from '~~/repositories/UploadStatsRepository';

export default defineNuxtPlugin(async (nuxtApp) => {
  console.log("Plugin: Firebase");

  const sessionCookie = useCookie<Object>('__session');

  const { auth, firestore } = useFirebase();

  const userRepository = new UserRepository(auth);
  useState('userRepository', () => userRepository);

  const uploadStatsRepository = new UploadStatsRepository(firestore);
  useState('uploadStatsRepository', () => uploadStatsRepository);

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