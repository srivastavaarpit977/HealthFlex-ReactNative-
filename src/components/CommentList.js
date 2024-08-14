import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Comment from './Comment';
import { sortComments } from '../store/commentsSlice';

function CommentList() {
  const comments = useSelector((state) => state.comments.list);
  const dispatch = useDispatch();

  const handleSort = (order) => {
    dispatch(sortComments(order));
  };

  return (
    <View style={styles.container}>
      <View style={styles.sortButtons}>
        <TouchableOpacity 
          style={styles.sortButton} 
          onPress={() => handleSort('asc')}
        >
          <Text style={styles.sortButtonText}>Sort Ascending</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.sortButton} 
          onPress={() => handleSort('desc')}
        >
          <Text style={styles.sortButtonText}>Sort Descending</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={comments}
        renderItem={({ item }) => <Comment comment={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sortButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sortButton: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  sortButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CommentList;