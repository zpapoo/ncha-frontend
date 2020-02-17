/* eslint-disable max-len */
import { FetchStatusCode } from 'api'
import { COMMENT_TYPE } from 'constants/playerConstants'
import {
  movieSelectors,
  playerActions,
  playerReducer,
  playerSelectors,
  PlayerState,
} from 'features/playerSlice'

import { playerCommentsMockData } from '__tests__/mockData/comment'

describe('[Features - Player Reducer]', () => {
  const initialState: PlayerState = {
    movie: {
      id: 0,
      title: '',
      running_time: 1,
      comments: [],
    },
    isPlaying: false,
    currentTime: 0,
    fetchState: FetchStatusCode.LOADING,
  }

  it('toggle action은 isPlaying이 false일때 true로 변경한다.', () => {
    // Given
    const state = {
      ...initialState,
      isPlaying: false,
    }
    // When
    const result = playerReducer(state, playerActions.toggle())
    // Then
    expect(result.isPlaying).toBeTruthy()
  })

  it('toggle action은 isPlaying이 true일때 false로 변경한다.', () => {
    // Given
    const state = initialState
    // When
    const result = playerReducer(state, playerActions.toggle())
    // Then
    expect(result.isPlaying).toBeFalsy()
  })

  it('updateCurrentTime은 player의 현재 진행시간을 갱신한다.', () => {
    // Given
    const state = initialState
    // When
    const result = playerReducer(state, playerActions.updateCurrentTime(1))
    // Then
    expect(result.currentTime).toBe(1)
  })
})

describe('[Features - Player Selector]', () => {
  it('currentComments Selector는 player의 현재 진행시간을 기반으로 나타나야 하는 comment를 필터링 한다.', () => {
    // Given
    const { data } = playerCommentsMockData
    const mockMovie = {
      ...data,
      runningTime: data.running_time,
    }
    const expected = [
      {
        kind: COMMENT_TYPE.MUSIC_DIRECTOR,
        contents: [
          '방황하였으며, 우리의 얼마나 심장은 불어 청춘의 이상의 투명하되 것이다. 가슴이 따뜻한 작고 힘있다. 얼음이 무엇을 천고에 쓸쓸하랴? 같으며,설레는 거친 새 장식하는 희망의 얼음과 것 같으며, 설레는 거친 새장식하는 희망의 얼음과 것 같으며, 설레는 거친 새 장식하는 희망의',
          '가슴이 따뜻한 작고 힘있다.',
        ],
        time: 1,
      },
    ]
    // When
    const result = movieSelectors.currentComments.resultFunc(mockMovie, 2)
    // Then
    expect(result).toEqual(expected)
  })

  it('time Selector는 player의 현재 진행시간과 runningTime을 가져온다.', () => {
    // Given
    const state: PlayerState = {
      movie: {
        id: 0,
        title: '',
        running_time: 10,
        comments: [],
      },
      isPlaying: false,
      currentTime: 0,
      fetchState: FetchStatusCode.LOADING,
    }
    const actions = {
      type: `${playerActions.updateCurrentTime}`,
      payload: 2,
    }
    const updatedState = playerReducer(state, actions)
    const expected = {
      current: 2,
      total: 10,
    }
    // When
    const result = playerSelectors.times.resultFunc(
      updatedState.currentTime,
      state.movie.running_time,
    )
    // Then
    expect(result).toEqual(expected)
  })

  it('movieFetchState는 영화 정보 api요청 status를 가져온다.', () => {
    // Given
    const expected = FetchStatusCode.LOADING
    // When
    const result = movieSelectors.movieFetchState.resultFunc(
      FetchStatusCode.LOADING,
    )
    // Then
    expect(result).toEqual(expected)
  })
})
