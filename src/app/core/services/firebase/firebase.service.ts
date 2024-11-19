import { inject, Injectable } from '@angular/core';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  // Inject
  private _storage = inject(Storage);

  async uploadImage(blob: Blob) {
    const fileType = blob.type.split('/')[1];
    const storageRef = ref(
      this._storage,
      'gs://upload-photo-4f5db.appspot.com/' + new Date().getTime() + '.' + fileType
    );
    const uploadTask = await uploadBytes(storageRef, blob);
    const downloadUrl = await getDownloadURL(uploadTask.ref);
    return downloadUrl;
  }
}
