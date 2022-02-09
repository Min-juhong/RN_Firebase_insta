import firestore from '@react-native-firebase/firestore';

const postsCollaction = firestore().collection('posts');

export const PAGE_SIZE = 12;

export function createPost({user, photoURL, description}) {
  return postsCollaction.add({
    user,
    photoURL,
    description,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
}

export async function getPosts(userId) {
  let query = postsCollaction.orderBy('createdAt', 'desc').limit(PAGE_SIZE);
  if (!!userId) {
    query = query.where('user.id', '==', userId);
  }
  const snapshot = await query.get();

  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return posts;
}

export async function getOlderPosts(id, userId) {
  const cursorDoc = await postsCollaction.doc(id).get();
  let query = await postsCollaction
    .orderBy('createdAt', 'desc')
    .startAfter(cursorDoc)
    .limit(PAGE_SIZE);

  if (userId) {
    query = query.where('user.id', '==', userId);
  }
  const snapshot = await query.get();

  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return posts;
}

export async function getNewerPost(id, userId) {
  const cursorDoc = await postsCollaction.doc(id).get();
  let query = await postsCollaction
    .orderBy('createdAt', 'desc')
    .endBefore(cursorDoc)
    .limit(PAGE_SIZE);

  if (userId) {
    query = query.where('user.id', '==', userId);
  }
  const snapshot = await query.get();

  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return posts;
}
