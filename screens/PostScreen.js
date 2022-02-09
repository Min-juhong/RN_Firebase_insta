import {useRoute} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import PostCard from '../components/PostCard';

function PostScreen() {
  const route = useRoute();
  const {post} = route.params;
  return (
    <ScrollView contentContainerStyle={styles.contenContainer}>
      <PostCard
        user={post.user}
        photoURL={post.photoURL}
        description={post.description}
        createdAt={post.createdAt}
        id={post.id}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1},
  contenContainer: {
    paddingBottom: 40,
  },
});

export default PostScreen;
