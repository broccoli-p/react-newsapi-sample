/*
* 컴포넌트에서 API 호출처럼 Promise를 사용해야 하는 경우
* 코드를 더욱 간결하게 작성할 수 있도록 해주는 커스텀 훅
*/

import {useState, useEffect} from 'react'

export default function usePromise(promiseCreator, deps) {
  // 대기 중/완료/실패에 대한 상태 관리
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    process();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  
  return [loading, resolved, error];
}