export const addItemToList = (name, list) => {
  const newItem = {
    id: new Date().getTime().toString(),
    title: name.trim().toLowerCase(),
  };
  localStorage.setItem("masterList", JSON.stringify([...list, newItem]));
  return {
    type: "ADD_ITEM_TO_LIST",
    payload: newItem,
  };
};

export const clearItemList = () => {
  localStorage.setItem("masterList", JSON.stringify([]));
  return {
    type: "CLEAR_LIST",
  };
};

export const removeItem = (list) => {
  localStorage.setItem("masterList", JSON.stringify([...list]));
  return {
    type: "REMOVE_ITEM",
    payload: list,
  };
};

export const editListItem = (list, editId, name) => {
  let editedList = list.map((item) => {
    if (item.id === editId) {
      return { ...item, title: name.trim().toLowerCase() };
    }
    return item;
  });
  localStorage.setItem("masterList", JSON.stringify([...editedList]));
  return {
    type: "EDIT_ITEM",
    payload: editedList,
  };
};

export const sortAscList = (list) => {
  return {
    type: "SORT_ASC",
    payload: list.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    }),
  };
};

export const sortDescList = (list) => {
  return {
    type: "SORT_DESC",
    payload: list.sort((b, a) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    }),
  };
};

export const searchItemInList = (searchedValue, list) => {
  let masterList = JSON.parse(localStorage.getItem("masterList"));
  let searchedList = [];
  if (searchedValue === "") {
    searchedList = [...masterList];
  } else {
    searchedList = masterList.filter((item) => {
      if (item.title.startsWith(searchedValue)) {
        return true;
      }
      return false;
    });
  }
  return {
    type: "SEARCH_ITEM",
    payload: searchedList,
  };
};