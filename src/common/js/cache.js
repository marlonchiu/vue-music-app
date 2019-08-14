// 操作与缓存相关的逻辑
import storage from 'good-storage'

const SEARCH_KEY = '__search__'

const SEARCH_MAX_LENGTH = 15

// 封装插入数据的方法
function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

/*
*  业务说明
*  如果没有则插入到最前边，如果有就需要把有的置为最前边
* */
export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}

// 获取本地缓存数据
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

// 删除搜索结果
export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

// 清空搜索结果
export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}
