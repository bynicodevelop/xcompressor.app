import { Auth } from "firebase/auth";
import { deleteField, doc, DocumentReference, DocumentSnapshot, Firestore, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";


export default class StripeRepository {
    firestore: Firestore;
    auth: Auth;

    constructor(firestore: Firestore, auth: Auth) {
        this.firestore = firestore;
        this.auth = auth;
    }

    async saveSubscription({ subscriptionId }) {
        const { uid } = this.auth.currentUser;

        const subscriptionDocumentRef: DocumentReference = doc(this.firestore, `xcompressor/website/users/${uid}`);

        const subscriptionDocumentSnapshot: DocumentSnapshot = await getDoc(subscriptionDocumentRef);

        if (subscriptionDocumentSnapshot.exists()) {
            await setDoc(subscriptionDocumentRef, {
                subscription: {
                    subscriptionId,
                    createdAt: serverTimestamp(),
                }
            });
        }
    }

    async getSubscription() {
        if (!this.auth.currentUser.uid) {
            return null;
        }

        const { uid } = this.auth.currentUser;

        const subscriptionDocumentRef: DocumentReference = doc(this.firestore, `xcompressor/website/users/${uid}`);

        const subscriptionDocumentSnapshot: DocumentSnapshot = await getDoc(subscriptionDocumentRef);

        if (subscriptionDocumentSnapshot.exists()) {
            return subscriptionDocumentSnapshot.data().subscription;
        }

        return null;
    }

    async removedSubscription() {
        if (!this.auth.currentUser.uid) {
            return null;
        }

        const { uid } = this.auth.currentUser;

        const subscriptionDocumentRef: DocumentReference = doc(this.firestore, `xcompressor/website/users/${uid}`);

        const subscriptionDocumentSnapshot: DocumentSnapshot = await getDoc(subscriptionDocumentRef);

        if (subscriptionDocumentSnapshot.exists()) {
            await updateDoc(subscriptionDocumentRef, {
                subscription: deleteField()
            });
        }
    }
}