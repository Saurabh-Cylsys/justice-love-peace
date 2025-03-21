import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EncryptionService {
    constructor() { }
    encrypt(text: any): string {
        return CryptoJS.AES.encrypt(JSON.stringify(text), environment.encryptionKey).toString();
    }

    decrypt(encryptedText: string): string {
        const bytes = CryptoJS.AES.decrypt(encryptedText, environment.encryptionKey);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    }

    encryptData(data: any): string {
        const jsonString = JSON.stringify(data);
        const encrypted = CryptoJS.AES.encrypt(jsonString, environment.encryptionKey).toString();
        return encodeURIComponent(encrypted); // Make it URL-safe
    }

    decryptData(encryptedText: string): any {
        try {
            const decodedText = decodeURIComponent(encryptedText);
            const bytes = CryptoJS.AES.decrypt(decodedText, environment.encryptionKey);
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } catch (error) {
            console.error('Decryption failed:', error);
            return null;
        }
    }
}