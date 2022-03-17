import { doc, DocumentReference, Firestore, getDoc, increment, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

export default class UploadStatsRepository {
    firestore: Firestore;

    constructor(firestore: Firestore) {
        this.firestore = firestore;
    }

    async updateCompressionStats(filesCompressed: number = 0, co2: number = 0) {
        const globalStatsDocRef: DocumentReference = doc(this.firestore, 'xcompressor/global-stats');

        const globalStatsDoc = await getDoc(globalStatsDocRef);

        if (!globalStatsDoc.exists()) {
            await setDoc(globalStatsDocRef, {
                filesCompressed,
                co2,
                updatedAt: serverTimestamp(),
            });
        } else {
            await updateDoc(globalStatsDocRef, {
                filesCompressed: increment(filesCompressed),
                co2: increment(co2),
                updatedAt: serverTimestamp(),
            });
        }
    }

    async getStats() {
        const globalStatsDocRef: DocumentReference = doc(this.firestore, 'xcompressor/global-stats');

        const globalStatsDoc = await getDoc(globalStatsDocRef);

        if (!globalStatsDoc.exists()) {
            return {
                filesCompressed: 0,
                co2: 0,
            };
        } else {
            return {
                filesCompressed: globalStatsDoc.data().filesCompressed ?? 0,
                co2: globalStatsDoc.data().co2 ?? 0,
            };
        }
    }
}