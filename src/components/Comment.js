import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { editComment, deleteComment, addReply, deleteReply } from '../store/commentsSlice';
import ReplyForm from './ReplyForm';
import { formatDate } from '../utils/dateUtils';

function Comment({ comment, parentId = null, depth = 0 }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    if (editedText.trim()) {
      dispatch(editComment({ id: comment.id, text: editedText }));
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (parentId) {
      dispatch(deleteReply({ commentId: parentId, replyId: comment.id }));
    } else {
      dispatch(deleteComment(comment.id));
    }
  };

  return (
    <View style={[styles.container, { marginLeft: depth * 20 }]}>
      <View style={styles.header}>
        <Text style={styles.name}>{comment.name}</Text>
        <Text style={styles.date}>{formatDate(comment.date)}</Text>
      </View>
      {isEditing ? (
        <View>
          <TextInput
            style={styles.input}
            value={editedText}
            onChangeText={setEditedText}
            multiline
          />
          <TouchableOpacity style={styles.button} onPress={handleEdit}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setIsEditing(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.commentText}>{comment.text}</Text>
      )}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setShowReplyForm(!showReplyForm)}>
          <Text style={styles.buttonText}>Reply</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>X</Text>
        </TouchableOpacity>
      </View>
      {showReplyForm && (
        <ReplyForm
          parentId={comment.id}
          onReply={() => setShowReplyForm(false)}
        />
      )}
      {comment.replies && comment.replies.map((reply) => (
        <Comment key={reply.id} comment={reply} parentId={comment.id} depth={depth + 1} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  name: {
    fontWeight: 'bold',
  },
  date: {
    color: '#888',
  },
  commentText: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
    marginBottom: 5,
    borderRadius: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  buttonText: {
    color: '#fff',
  },
});

export default Comment;