import styled from '@emotion/styled'
import { COMMENT_COLOR, COMMENT_TYPE } from 'constants/playerConstants'
import React from 'react'
import { animated, useSpring } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import { formatTime } from 'utils/timeUtils'

interface Props {
  kind: COMMENT_TYPE
  content: string
  time: number
}

interface BubbleProps {
  color: string
  time: number
}

const Bubble = styled<'div', BubbleProps>('div')`
  display: inline-block;
  position: relative;
  background: ${(props) => props.color};
  color: rgba(255, 255, 255, 0.9);
  border-radius: 5px;
  padding: 9px;
  margin-top: 9px;
  line-height: 15px;

  &:first-of-type {
    &:before {
      content: '';
      position: absolute;
      top: 20%;
      left: -9px;
      width: 0;
      height: 0;
      border-top: 0px solid transparent;
      border-radius: 1px 0 0 0;
      border-bottom: 12px solid transparent;
      border-right: 9px solid ${props => props.color};
    }
  }

  &:last-of-type {
    &:after {
      content: '${props => formatTime(props.time)}';
      position: absolute;
      left: 100%;
      font-size: 10px;
      margin-left: 8px;
      bottom: 3%;
    }
  }
`

export const SpeechBubble = ({ content, time, kind }: Props) => {
  return (
    <Bubble
      color={COMMENT_COLOR[kind]}
      time={time}
    >
      {content}
    </Bubble>
  )
}
