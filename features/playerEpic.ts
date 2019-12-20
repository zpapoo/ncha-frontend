import { PayloadAction } from '@reduxjs/toolkit'
import { ActionsObservable, Epic, ofType, StateObservable } from 'redux-observable'
import { timer } from 'rxjs'
import { map, mergeMap, repeat, takeUntil } from 'rxjs/operators'

import { RootState } from '.'
import { playerActionName, playerActions } from './player'

export const playerEpic: Epic = (
  action$: ActionsObservable<PayloadAction<any>>,
  store$: StateObservable<RootState>,
) =>  {
  const playerActionType = playerActions.play().type

  return (
    action$.pipe(
      ofType(`${playerActionName}/${playerActionType}`),
      mergeMap(() => timer(0, 1000)),
      map(() => {
        const currentTime = store$.value.player.currentTime

        return playerActions.updateCurrentTime(currentTime + 1)
      }),
      takeUntil(action$.pipe(
        ofType(`${playerActionName}/pause`),
      )),
      repeat(),
    )
  )
}
