import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  async register(email: string, password: string) {
    try {
      // Crear usuario con Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        // Obtener nombre a partir del email
        const name = email.split('@')[0];

        // Crear el objeto para guardar en Firestore
        const userData = {
          email: user.email,
          name: name,
          role: 'author',
          created_at: new Date(),
        };

        // Guardar los datos en Firestore usando el UID como ID del documento
        await setDoc(doc(this.firestore, 'users', user.uid), userData);

        console.log('Usuario registrado y guardado en Firestore:', userData);
      }

      return userCredential;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }
}
