import { defineNuxtPlugin } from '#app';
import { useFirebase } from '~~/composables/useFirebase';
import UserRepository from '~~/repositories/UserRepository';

export default defineNuxtPlugin(async (nuxtApp) => {
  const sessionCookie = useCookie<Object>('__session', {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    path: '/',
  });

  if (sessionCookie.value['isAuthenticated'] === undefined) {
    sessionCookie.value = {
      'isAuthenticated': false,
    };
  }

  const { AUTHENTICATED_USER_MAX_UPLOAD_PER_DAY, AUTHENTICATED_USER_MAX_FILE_SIZE } =
    useRuntimeConfig();

  const { auth } = useFirebase();

  const userRepository = new UserRepository(auth);
  useState('userRepository', () => userRepository);

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