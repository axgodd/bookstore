import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Book {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
}

export interface BookState {
  books: Book[]
}

const initialState: BookState = {
  books: [
    {
      id: Date.now() - 1,
      name: "React",
      price: 10,
      category: "Fiction",
      description: "A great react book."
    },
    {
      id: Date.now(),
      name: "Javascript",
      price: 15,
      category: "Non-fiction",
      description: "An interesting Javascript book."
    }
  ]
}
const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook(state, action: PayloadAction<Book>) {
      state.books.push(action.payload);
    },
    deleteBook(state, action: PayloadAction<number>) {
      state.books = state.books.filter(book => book.id !== action.payload);
    },
    editBook(state, action: PayloadAction<Book>) {
      const index = state.books.findIndex(book => book.id === action.payload.id);
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    }
  }
});

export const { addBook, deleteBook, editBook } = bookSlice.actions
export default bookSlice.reducer
