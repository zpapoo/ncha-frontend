import styled from '@emotion/styled'
import { RootState } from 'features'
import { playerSelectors, PlayerTime } from 'features/playerSlice'
import React from 'react'
import { useSelector } from 'react-redux'
import { formatTime } from 'utils/timeUtils'

import { PlayerSlide } from './PlayerSlide'

const TimeLineContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px;
`

const FormattedTime = styled.span`
  display: inline-block;
  font-size: 10px;
  line-height: 14px;
  color: #ffffff;
`

export const PlayerTimeLine = () => {
  const { current, total } = useSelector<RootState, PlayerTime>(playerSelectors.times)

  return (
    <TimeLineContainer>
      <FormattedTime>{formatTime(current)}</FormattedTime>
      <PlayerSlide />
      <FormattedTime>{formatTime(total)}</FormattedTime>
    </TimeLineContainer>
  )
}
