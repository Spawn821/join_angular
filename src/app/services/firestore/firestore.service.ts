import { inject, Injectable } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from '@angular/fire/firestore';
import { UserData } from '../../interfaces/user-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  firestore = inject(Firestore);

  constructor() {}

  // unsubscribe: any;

  getCollection(collectionName: string) {
    return collection(this.firestore, collectionName);
  }

  async addUserToCollection(userData: UserData) {
    await setDoc(doc(this.getCollection('users'), userData.uid), {
      name: userData.name,
      email: userData.email,
      uid: userData.uid,
    });
  }

  private createContactsQuery() {
    return query(
      collection(
        this.firestore,
        `contacts/DO7MD4HsU3RzCGbZyQDReZLrQFn2/contacts`,
      ),
      orderBy('name'),
    );
  }

  private markFirstContactPerLetter(docs: any[]) {
    const seenLetters = new Set<string>();
    return docs.map((doc) => {
      const name = doc.data()['name'];
      const firstLetter = name[0].toUpperCase();
      const firstContactperLetter = !seenLetters.has(firstLetter);
      seenLetters.add(firstLetter);

      return {
        name,
        email: doc.data()['email'],
        firstContactperLetter,
      };
    });
  }

  getContacts(): Observable<any[]> {
    const q = this.createContactsQuery();

    return new Observable((observer) => {
      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const contacts = this.markFirstContactPerLetter(querySnapshot.docs);
          observer.next(contacts);
        },
        (error) => observer.error(error),
      );
      observer.add(() => unsubscribe())
      // return { unsubscribe };
    });
  }
}
