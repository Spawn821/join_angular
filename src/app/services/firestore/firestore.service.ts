import { inject, Injectable } from '@angular/core';
import { collection, doc, Firestore, onSnapshot, orderBy, query, setDoc } from '@angular/fire/firestore';
import { UserData } from '../../interfaces/user-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  firestore = inject(Firestore);

  constructor() { }

  unsubscribe:any;

  getCollection(collectionName:string) {
    return collection(this.firestore, collectionName);
  }

  async addUserToCollection(userData: UserData) {
    await setDoc(doc(this.getCollection('users'), userData.uid), {
      name: userData.name,
      email: userData.email,
      uid: userData.uid
    });
  }

  // getData() {
  //   const q = query(collection(this.firestore, `contacts/${'DO7MD4HsU3RzCGbZyQDReZLrQFn2'}/contacts`));
  //   this.unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     let cities:any = [];
  //     querySnapshot.forEach((doc) => {
  //         cities.push(doc.data()['name']);
  //     });
  //     console.log("Current cities in CA: ", cities.join(", "));
  //   });
  // }

  getContacts(): Observable<any[]> {
    const q = query(collection(this.firestore, `contacts/DO7MD4HsU3RzCGbZyQDReZLrQFn2/contacts`), orderBy('name'));

    return new Observable((observer) => {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const contacts = querySnapshot.docs.map((doc) => ({
          name: doc.data()['name'],
          email: doc.data()['email'],
        }));

        observer.next(contacts);
      }, (error) => observer.error(error));

      return { unsubscribe };
    });
  }
}
