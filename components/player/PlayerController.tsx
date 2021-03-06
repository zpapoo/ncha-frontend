import styled from '@emotion/styled'
import React from 'react'

import { PlayerButton } from './PlayerButton'
import { PlayerTimeLine } from './PlayerTimeLine'

interface Props {
  children: React.ReactElement
}

const PlayerTop = styled.div`
  position: relative;
  margin-bottom: 16px;
  padding: 24px 0;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 0px 0px 25px 25px;
`

const CloseButton = styled.span`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 16px;
  height: 16px;
  background-image: url('/images/cancel_icon.png');
  background-size: cover;
  opacity: 0.3;
`

export const PlayerController = ({ children }: Props) => {
  return (
    <PlayerTop>
      {children}
      <CloseButton />
      <PlayerTimeLine />
      <PlayerButton />
    </PlayerTop>
  )
}
