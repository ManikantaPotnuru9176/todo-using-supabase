import create from "zustand";

interface TodoStore {
  theme: string;
  input: string;
  updateInput: string;
  isEditMode: boolean;
  editId: number;
  loading: boolean;

  setTheme: (theme: string) => void;
  setInput: (input: string) => void;
  setUpdateInput: (updateInput: string) => void;
  setIsEditMode: (isEditMode: boolean) => void;
  setEditId: (editId: number) => void;
  setLoading: (loading: boolean) => void;
}

const useTodoStore = create<TodoStore>((set) => ({
  theme: "light",
  input: "",
  updateInput: "",
  isEditMode: false,
  editId: -1,
  loading: false,

  setTheme: (theme) => set({ theme }),
  setInput: (input) => set({ input }),
  setUpdateInput: (updateInput) => set({ updateInput }),
  setIsEditMode: (isEditMode) => set({ isEditMode }),
  setEditId: (editId) => set({ editId }),
  setLoading: (loading) => set({ loading }),
}));

export default useTodoStore;
