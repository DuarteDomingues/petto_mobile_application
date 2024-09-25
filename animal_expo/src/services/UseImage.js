import { getStorage, ref, getDownloadURL } from 'firebase/storage';

class UseImage {
  constructor() {}

  fetchImageUrl = async (path) => {
    try {

      let storage = getStorage();
      let storageRef = ref(storage, path);

      let url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {

      console.error('Error getting download URL: ', error);
      return null;
    }
  };
}

export default UseImage;
