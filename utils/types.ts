export interface Collection {
  id: string;
  collectionName: string;
  collectionColor: string;
  todos: Todo[];
  createdAt: string;
  updatedAt?: string;
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
  collectionId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface NewCollection {
  collectionName: string;
  collectionColor: string;
}
