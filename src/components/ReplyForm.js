import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addReply } from '../store/commentsSlice';

function ReplyForm({ parentId, onReply }) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (name.trim() && text.trim()) {
      dispatch(addReply({ parentId, name, text }));
      setName('');
      setText('');
      onReply();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, styles.replyInput]}
        placeholder="Your Reply"
        value={text}
        onChangeText={setText}
        multiline
      />
      <TouchableOpacity style={styles.postButton} onPress={handleSubmit}>
        <Text style={styles.postButtonText}>POST REPLY</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5, 
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  replyInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  postButton: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ReplyForm;