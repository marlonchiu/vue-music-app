/*
 *  Created by : ZhaoJiandong
 *  Modified time: 2018/11/3 11:57
 */
/*
* 更新选中操作
* */

import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch, deleteSearch, clearSearch, savePlay} from 'common/js/cache'

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }

  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function ({commit, state}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

// 插入一首歌
export const insertSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice()  // 记录当前歌曲列表（不能直接修改state的数据，其实修改的是副本）
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex   // 记录当前播放的index

  // 记录当前歌曲
  let currentSong = playlist[currentIndex]
  // 查找当前列表中是否有待插入的歌曲并返回其索引
  let fpIndex = findIndex(playlist, song)
  // 因为是插入歌曲，所以索引+1
  currentIndex++

  // 插入这首歌到当前索引位置
  playlist.splice(currentIndex, 0, song)

  // 如果已经包含了这首歌（删除该歌曲）
  if (fpIndex > -1) {
    // 如果当前插入的序号大于列表中的序号
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }

  let currentSIndex = findIndex(sequenceList, currentSong) + 1
  let fsIndex = findIndex(sequenceList, song)
  sequenceList.splice(currentSIndex, 0, song)

  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  // 修改state数据
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

// 保存搜索历史结果本地化缓存
export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}
export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}
export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

// 删除一首歌曲
export const deleteSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice()  // 记录当前歌曲列表（不能直接修改state的数据，其实修改的是副本）
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex   // 记录当前播放的index

  // 找到playlist的索引
  let pIndex = findIndex(playlist, song)
  playlist.splice(pIndex, 1)
  // 找到sequenceList的索引
  let sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)

  // 如果当前播放的歌曲在删除的歌曲之后  或者  当前歌曲是最后一首（删除的是最后一首歌）
  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }

  // 修改state数据
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  // if (!playlist.length) { // 如果没有歌曲哈
  //   commit(types.SET_PLAYING_STATE, false)
  // } else {
  //   commit(types.SET_PLAYING_STATE, true)
  // }
  // 代码优化
  const playState = playlist.length > 0
  commit(types.SET_PLAYING_STATE, playState)
}

// 删除歌曲列表
export const deleteSongList = function ({commit}) {
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYING_STATE, false)
}

// 保存歌曲
export const savePlayHistory = function ({commit}, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}
