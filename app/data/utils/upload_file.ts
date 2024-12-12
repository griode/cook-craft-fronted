/* eslint-disable @typescript-eslint/no-explicit-any */
import {storage} from "@/app/firebase";
import {deleteObject, getDownloadURL, ref, StringFormat, uploadBytesResumable, uploadString} from "firebase/storage";
import {v1} from "uuid";
import imageCompression from "browser-image-compression";
import axios from "axios";

export async function uploadB64Image(b64: string, storagePath: string): Promise<string> {
    try {
        // Créer une référence pour le fichier dans Firebase Storage
        const fileRef = ref(storage, `${storagePath}/${v1()}`);

        // Uploader le Base64 compressé dans Firebase Storage
        await uploadString(fileRef, b64, StringFormat.BASE64URL);

        // Obtenir et retourner l'URL de téléchargement
        return await getDownloadURL(fileRef);
    } catch (error) {
        console.error("Error uploading compressed Base64 file:", error);
        throw new Error("Failed to upload compressed Base64 file.");
    }
}

export async function uploadBase64ImageCompress(
    base64String: string,
    storagePath: string
): Promise<string> {
    // Convertir Base64 en Blob
    const base64ToBlob = (base64: string): Blob => {
        const byteString = atob(base64.split(",")[1]);
        const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const intArray = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            intArray[i] = byteString.charCodeAt(i);
        }
        return new Blob([arrayBuffer], {type: mimeString});
    };

    const fileBlob: any = base64ToBlob(base64String);

    // Options de compression
    const options = {
        maxSizeMB: 0.8, // Taille maximale de l'image compressée en MB
        maxWidthOrHeight: 1920, // Dimension maximale (largeur ou hauteur)
        useWebWorker: true,
    };

    try {
        // Compresser l'image
        const compressedFile = await imageCompression(fileBlob, options);

        // Convertir Blob compressé en Base64
        const compressedBase64 = await imageCompression.getDataUrlFromFile(
            compressedFile
        );

        // Créer une référence pour le fichier dans Firebase Storage
        const fileRef = ref(storage, `${storagePath}/${v1()}`);

        // Uploader le Base64 compressé dans Firebase Storage
        await uploadString(fileRef, compressedBase64, StringFormat.DATA_URL);

        // Obtenir et retourner l'URL de téléchargement
        return await getDownloadURL(fileRef);
    } catch (error) {
        throw new Error("Failed to upload compressed Base64 file." + error);
    }
}

export async function uploadImageFromUrl(imageUrl: string, filePath: string): Promise<string> {
    try {
        // Télécharger l'image en tant que Blob
        const response = await axios.get(imageUrl, {
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const blob = await response.data;

        // Référence vers Firebase Storage
        const storageRef = ref(storage, `${filePath}/${v1()}`);

        // Uploader l'image dans Firebase Storage
        const uploadTask = await uploadBytesResumable(storageRef, blob);

        // Récupérer l'URL publique de l'image
        const downloadURL = await getDownloadURL(uploadTask.ref);
        console.log("Image URL dans Firebase Storage: ", downloadURL);

        return downloadURL;
    } catch (error) {
        console.error("Erreur dans uploadImageFromUrl : ", error);
        throw error;
    }
}

export async function deleteFileByUrl(fileUrl: string): Promise<void> {
    if (!fileUrl.includes("https://lh3.googleusercontent.com")) {
        // Crée une référence de fichier à partir de l'URL fournie
        const fileRef = ref(storage, fileUrl);
        deleteObject(fileRef)
            .then(() => console.log("File deleted successfully"))
            .catch((error) => {
                console.log("Erreur lors de la suppression du fichier:", error);
            });
    }
}


export async function compressImageToBase64(
    base64String: string
): Promise<string> {
    // Convertir Base64 en Blob
    const base64ToBlob = (base64: string): Blob => {
        const byteString = atob(base64.split(",")[1]);
        const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const intArray = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            intArray[i] = byteString.charCodeAt(i);
        }
        return new Blob([arrayBuffer], { type: mimeString });
    };

    const fileBlob: any = base64ToBlob(base64String);

    // Définir les options initiales de compression
    const options = {
        maxSizeMB: 2.9, // Légèrement inférieur à 3 MB
        maxWidthOrHeight: 1920, // Dimensions maximales
        useWebWorker: true,
    };

    try {
        let compressedFile = await imageCompression(fileBlob, options);

        // Vérifier la taille de l'image compressée
        while (compressedFile.size > 3 * 1024 * 1024) {
            // Réduire la taille maximale pour compresser davantage
            options.maxSizeMB /= 2;

            // Compresser de nouveau
            compressedFile = await imageCompression(fileBlob, options);

            // Si les options atteignent une limite trop basse
            if (options.maxSizeMB < 0.1) {
                throw new Error("Impossible de compresser l'image sous 3 MB.");
            }
        }

        // Convertir Blob compressé en Base64
        return await imageCompression.getDataUrlFromFile(compressedFile);
    } catch (error) {
        throw new Error("Failed to compress image below 3 MB: " + error);
    }
}