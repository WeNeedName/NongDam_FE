// 로컬 스토리지 저장
export const localStorageSet = (name, value) => {
  if (typeof Storage !== "undefined") {
    window.localStorage.setItem(name, JSON.stringify(value));
    console.log(name);
    console.log(value);
  }
};

// 로컬 스토리지 해당 key 조회
export const localStorageGet = (name) => {
  return JSON.parse(window.localStorage.getItem(name));
};

// 로컬 스토리지 해당 key 삭제
export const localStorageRemove = (name) => {
  return window.localStorage.removeItem(name);
};
