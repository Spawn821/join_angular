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

  private markFirstContactPerLetter(docs: any[]): boolean[] {
    const seenLetters = new Set<string>();
    return docs.map((doc) => {
      const name = doc.data()['name'] ?? '';
      const firstLetter = name[0]?.toUpperCase() ?? '';
      const firstContactPerLetter = !seenLetters.has(firstLetter);
      seenLetters.add(firstLetter);
      return firstContactPerLetter;
    });
  }

 getContacts(): Observable<any[]> {
    const q = this.createContactsQuery();

    return new Observable((observer) => {
      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const firstContactPerLetter = this.markFirstContactPerLetter(querySnapshot.docs);
          const contacts = querySnapshot.docs.map((doc, i) =>
            this.getContactData(doc, firstContactPerLetter[i]),
          );
          observer.next(contacts);
        },
        (error) => observer.error(error),
      );
      observer.add(() => unsubscribe());
    });
  }


  getContactData(doc: any, firstContactperLetter: boolean) {
    return {
      name: doc.data()['name'],
      email: doc.data()['email'],
      color: doc.data()['color'],
      firstContactperLetter,
    };
  }
}
