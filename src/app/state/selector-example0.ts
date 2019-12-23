import { createSelector } from '@ngrx/store';

// Using a selector for one piece of state
export interface FeatureState {
  counter: number;
}
 
export interface AppState {
  feature: FeatureState;
}
 
export const selectFeature = (state: AppState) => state.feature;
 
export const selectFeatureCount = createSelector(
  selectFeature,
  (state: FeatureState) => state.counter * 2
);

// Using selectors for multiple pieces of state
export interface User {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  userId: number;
  name: string;
}

export interface AppState {
  selectedUser: User;
  allBooks: Book[];
}

export const selectUser = (state: AppState) => state.selectedUser;
export const selectAllBooks = (state: AppState) => state.allBooks;

export const selectVisibleBooks = createSelector(
  selectUser, // S1
  selectAllBooks, // S2

  // projector function
  (selectedUser: User, allBooks: Book[]) => {
    if (selectedUser && allBooks) {
      return allBooks.filter((book: Book) => book.userId === selectedUser.id);
    } else {
      return allBooks;
    }
  }
);

