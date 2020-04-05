import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { FlexWrapper } from 'components/common/FlexWrapper'
import { RootState } from 'features'
import { playerActions, playerSelectors, PlayerTime } from 'features/playerSlice'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// TODO: Move common Component
const hide = keyframes`
  0% {
    max-height: 500px;
  }

  100% {
    max-height: 0;
  }
`

const show = keyframes`
  0% {
    max-height: 0;
  }

  100% {
    max-height: 500px;
  }
`

const HideWrapper = styled<'div', {isVisible: boolean}>('div')`
  animation: ${({ isVisible }) => isVisible ? show : hide} 0.7s ease-in-out forwards 1;
  overflow: hidden;
`

const PlayButton = styled<'div', {isPlaying: boolean}>('div')`
  margin: 0 10px 0 10px;
  width: 24px;
  height: 24px;
  background-size: contain;
  align-self: center;
  background-image: url(${({ isPlaying }) => isPlaying ? '/images/pause.svg' : '/images/play.svg'});
`

const ForwardButton = styled.div`
  width: 30px;
  height: 30px;
  background-size: contain;
  margin-right: auto;
  background-image: url('/images/forward.svg');
`

const BackwardButton = styled.div`
  width: 30px;
  height: 30px;
  background-size: contain;
  margin-left: auto;
  background-image: url('/images/backward.svg');
`

export const PlayerButton = () => {
  const dispatch = useDispatch()
  const isPlaying = useSelector<RootState, boolean>(
    state => state.player.isPlaying,
  )
  const { current } = useSelector<RootState, PlayerTime>(playerSelectors.times)
  const { toggle, requestUpdateCurrentTime } = playerActions
  const [isVisible, setIsVisible] = useState(true)

  // TODO: Move to custom hook
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (e.deltaY > 0 && isVisible) {
        return setIsVisible(false)
      }

      if (e.deltaY < 0 && !isVisible) {
        return setIsVisible(true)
      }
    },
    [isVisible],
  )
  useEffect(() => {
    window.addEventListener('wheel', handleWheel)

    return (() => window.removeEventListener('wheel', handleWheel))
  }, [handleWheel])

  return (
    <HideWrapper isVisible={isVisible}>
      <FlexWrapper>
        <BackwardButton
          onClick={() => dispatch(requestUpdateCurrentTime(current-5))}
        />
        <PlayButton
          isPlaying={isPlaying}
          onClick={() => dispatch(toggle()) }
        />
        <ForwardButton
          onClick={() => dispatch(requestUpdateCurrentTime(current+5))}
        />
      </FlexWrapper>
    </HideWrapper>
  )
}
