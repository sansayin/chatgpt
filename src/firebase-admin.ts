import admin from "firebase-admin"
import {getApps} from "firebase-admin/app"

const cert_json="./chatgpt-16d23-firebase-adminsdk-1y381-4d409fded9.json"
if(!getApps().length){
    admin.initializeApp({
        credential:admin.credential.cert(cert_json)
    })
}

const adminDb = admin.firestore();

export {adminDb};
