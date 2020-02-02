import styled from '@emotion/styled'
import { RootState } from 'features'
import { playerSelectors, PlayerTime } from 'features/player'
import React, { useRef } from 'react'
import { useSelector } from 'react-redux'

interface Props {
  width: number;
}

const Slide = styled<'div', Props>('div')`
  background: linear-gradient(to right, #EF4D88 0%, #4E51FF 100%);
  height: 100%;
  width: ${(props) => `${props.width}%`};
  position: relative;
  display: flex;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    right: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #4E51FF;
  }
`

const TimeLine = styled.div`
  display: flex;
  margin: 0 12px;
  width: 100%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.5);
`

export const PlayerSlide = ({ width }: Props) => {
  const time = useSelector<RootState, PlayerTime>(state =>
    playerSelectors.times(state.player),
  )
  const sliderRef = useRef<HTMLDivElement>(null)

  const onMouseUp = () => {
    console.log('onMouseUp')
  }
  const onMouseDown = () => {
    console.log('onMouseDown')
  }

  const onMouseMove = () => {
    console.log('onMouseMove')
  }

  const onClick = (e: React.MouseEvent) => {
    const { total } = time
    console.log(e.clientX)
    console.log(e.currentTarget)
  }

  return (
    <TimeLine
      ref={sliderRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onClick={onClick}
    >
      <Slide width={width} />
    </TimeLine>
  )
}
