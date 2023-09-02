import { atom } from 'recoil';

export const queryState = atom({
  key: 'queryState', // unique ID (with respect to other atoms/selectors)
  default: {
    query: '',
    isTyping: false,
    isInitialRender: true,
  }, // default value (aka initial value)
});
