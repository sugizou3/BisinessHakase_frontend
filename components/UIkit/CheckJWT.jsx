import { useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  isLoggedInOff,
  selectIsLoggedIn,
  fetchAsynkVerify,
  fetchAsynkRefresh,
  selectVerifyState,
} from "src/reducks/auth/authSlice";

export default function CheckJWT() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const verifyStates = useSelector(selectVerifyState);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    // console.log('pass');
    if (isLoggedIn) {
      var existJWT = true //checkExist();
      // isLoggedInがTrueで JWTがある
      if (existJWT) {
        dispatch(fetchAsynkVerify());

        if (!verifyStates) {
          dispatch(fetchAsynkRefresh());
        }
      }
      // isLoggedInはTrueだが JWTがない
      else {
        // ログインページへ遷移
        // isLoggedInをfalseに
        dispatch(isLoggedInOff());
      }
    }
  }, []);
  return null
}
