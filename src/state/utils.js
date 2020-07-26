// @flow

// The offical Redux typedef doesn't include payload concerns
type AnyPayload = *;
export type Action<P> = {| type: string, payload: P |};
export type ActionCreator<P> = P => Action<P>;
type TypedReducer<S, P> = (S, Action<P>) => S;
type Reducer<S> = TypedReducer<S, AnyPayload>;

export function reduceOver<
  +RootState: { +[string]: mixed },
  B: $Keys<RootState>
>(branch: B): (Reducer<$ElementType<RootState, B>>) => Reducer<RootState> {
  return reducer => (state, action) => ({
    ...state,
    [branch]: reducer(state[branch], action),
  });
}
