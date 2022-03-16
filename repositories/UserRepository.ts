import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, deleteUser } from "firebase/auth";

export default class UserRepository {
    auth: Auth;

    constructor(auth: Auth) {
        this.auth = auth;
    }

    currentUser(cb) {
        onAuthStateChanged(this.auth, (user) => { cb(user) });
    }

    async getCurrentUser() {
        return new Promise((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(this.auth, (user) => {
                resolve(user);

                unsubscribe();
            }, reject);
        });
    }

    async createAccount({ email, password }) {
        try {
            await createUserWithEmailAndPassword(this.auth, email, password);
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                throw new Error("email-already-in-use");
            }
        }
    }

    async login({ email, password }) {
        try {
            await signInWithEmailAndPassword(this.auth, email, password);
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                throw new Error("user-not-found");
            }
        }
    }

    async logout() {
        await signOut(this.auth);
    }

    async deleteAccount() {
        try {
            await deleteUser(this.auth.currentUser);
        } catch (error) {
            console.log(error);
        }
    }
}