import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loadComments = async () => {
  try {
    const savedComments = await AsyncStorage.getItem('comments');
    return savedComments ? JSON.parse(savedComments) : [];
  } catch (e) {
    console.error('Failed to load comments', e);
    return [];
  }
};

const saveComments = async (comments) => {
  try {
    await AsyncStorage.setItem('comments', JSON.stringify(comments));
  } catch (e) {
    console.error('Failed to save comments', e);
  }
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    list: [],
  },
  reducers: {
    setComments: (state, action) => {
      state.list = action.payload;
    },
    addComment: (state, action) => {
      const newComment = {
        id: Date.now(),
        name: action.payload.name,
        text: action.payload.text,
        date: new Date().toISOString(),
        replies: [],
      };
      state.list.unshift(newComment);
      saveComments(state.list);
    },
    editComment: (state, action) => {
      const { id, text } = action.payload;
      const comment = state.list.find(c => c.id === id);
      if (comment) {
        comment.text = text;
        saveComments(state.list);
      }
    },
    deleteComment: (state, action) => {
      state.list = state.list.filter(c => c.id !== action.payload);
      saveComments(state.list);
    },
    addReply: (state, action) => {
      const { parentId, name, text } = action.payload;
      const parent = state.list.find(c => c.id === parentId);
      if (parent) {
        const newReply = {
          id: Date.now(),
          name,
          text,
          date: new Date().toISOString(),
          replies: [],
        };
        parent.replies.unshift(newReply);
        saveComments(state.list);
      }
    },
    deleteReply: (state, action) => {
      const { commentId, replyId } = action.payload;
      const comment = state.list.find(c => c.id === commentId);
      if (comment) {
        comment.replies = comment.replies.filter(r => r.id !== replyId);
        saveComments(state.list);
      }
    },
    sortComments: (state, action) => {
      state.list.sort((a, b) => {
        if (action.payload === 'asc') {
          return new Date(a.date) - new Date(b.date);
        } else {
          return new Date(b.date) - new Date(a.date);
        }
      });
    },
  },
});

export const { 
  setComments, 
  addComment, 
  editComment, 
  deleteComment, 
  addReply, 
  deleteReply, 
  sortComments 
} = commentsSlice.actions;

export const initializeComments = () => async (dispatch) => {
  const comments = await loadComments();
  dispatch(setComments(comments));
};

export default commentsSlice.reducer;