import { ADD_TOAST, REMOVE_TOAST } from "../actions";

export default function toasts(state = [], action) {
  switch (action.type) {
    case ADD_TOAST:
      return [action.text, ...state];

    case REMOVE_TOAST:
      return state.filter((toast) => toast.id !== action.id);

    default:
      return state;
  }
}
