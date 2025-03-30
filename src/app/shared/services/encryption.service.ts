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
    decrypt1(encryptedText: string): string {
        try {
            if (!encryptedText) {
                throw new Error("❌ Encrypted text is empty or undefined");
            }
    
            console.log("🔹 Encrypted Text (Before Decoding):", encryptedText);
    
            // 🔹 Ensure proper URL decoding (convert %2F, %20, etc.)
            let decodedText = decodeURIComponent(encryptedText).replace(/ /g, '+');
            console.log("🔹 Decoded Encrypted Text:", decodedText);
    
            // 🔹 Ensure key is correctly formatted
            let encryptionKey = CryptoJS.enc.Hex.parse('6b5872594167471930cfe5c0b99cb6bfafd7b1601ee9f439359a7dde010a5ce9');
    
            // 🔹 Ensure the encrypted text is Base64-encoded before decryption
            let encryptedBytes = CryptoJS.enc.Base64.parse(decodedText);
            let cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext: encryptedBytes });
    
            // 🔹 Ensure IV is set correctly
            let iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000'); // Adjust if encryption used a different IV
    
            // 🔹 Perform AES decryption
            let decrypted = CryptoJS.AES.decrypt(cipherParams, encryptionKey, {
                iv: iv,
                mode: CryptoJS.mode.CBC, // Ensure mode matches encryption
                padding: CryptoJS.pad.Pkcs7 // Ensure padding matches encryption
            });
    
            let decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
    
            if (!decryptedString) {
                throw new Error("❌ Decryption failed: Output is empty");
            }
    
            console.log("✅ Decrypted String:", decryptedString); // Debugging
    
            return decryptedString; // ✅ Return as a normal string
        } catch (error) {
            console.error('❌ Decryption error:', error);
            return ''; // Prevent further errors by returning an empty string
        }
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