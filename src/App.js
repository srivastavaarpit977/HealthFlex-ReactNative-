import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import CommentForm from './components/CommentForm';
import CommentList from './components/CommentList';
import store from './store/store';
import { initializeComments } from './store/commentsSlice';

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeComments());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <CommentForm />
      <CommentList />
    </SafeAreaView>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;