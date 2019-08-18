// 操作与缓存相关的逻辑
import storage from 'good-storage'
// 缓存搜索历史
const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15
// 缓存播放历史
const PLAY_KEY = '__play__'
const PLAY_MAX_LENGTH = 200
// 缓存收藏历史
const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH = 200

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

// 获取本地缓存数据
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

// 缓存播放
export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, PLAY_MAX_LENGTH)
  storage.set(PLAY_KEY, songs)
  return songs
}

// 读取播放列表
export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

// 收藏列表
export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return item.id === song.id
  }, FAVORITE_MAX_LENGTH)
  storage.set(FAVORITE_KEY, songs)
  return songs
}
export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}
// 读取播放列表
export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}
