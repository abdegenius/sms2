import { onMount } from "svelte";

export const __serialize = JSON.stringify;
// export const __deserialize = JSON.parse;

export const __deserialize = (key) => {
  JSON.parse(window.localStorage.getItem(key));
}

let ref = [];

export const useRef = (param) => {
  ref.push(param);
  return ref;
};

export const useState = (defaultValue) => {
  const valueInLocalStorage = window.localStorage.getItem("key");
  if (valueInLocalStorage) {
    return deserialize(valueInLocalStorage);
  }

  return typeof defaultValue === "function" ? defaultValue() : defaultValue;
};

export function useLocalStorageState(
  key,
  defaultValue = "",
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
  console.log("%c Localstorage called", "color: tomato");

  const [state, setState] = useState(defaultValue);

  const prevKeyRef = useRef(key);

  // onMount(() => {
  const prevKey = prevKeyRef[prevKeyRef.length - 1];
  if (prevKey !== key) {
    window.localStorage.removeItem(prevKey);
  }

  prevKeyRef[prevKeyRef.length - 1] = key;
  window.localStorage.setItem(key, serialize(state));
  // }, [key, serialize, state]);

  return [state, setState];
}
