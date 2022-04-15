import React, { useEffect } from 'react';

const { kakao } = window;

function KakaoMap() {
  useEffect(() => {
    const container = document.getElementById('myMap');

    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    /* eslint-disable-line no-unused-vars */
    const map = new kakao.maps.Map(
      /* eslint-disable-line no-unused-vars */ container,
      options,
    ); /* eslint-disable-line no-unused-vars */
  }, []);

  useEffect(() => {
    // RN에서 웹으로 데이터를 전송했을때 message이벤트가 실행됩니다.
    window.addEventListener('message', (e) => {
      console.log('e>>', e);
    });
  }, []);

  return (
    <div
      id="myMap"
      style={{
        width: '4000px',
        height: '4000px',
      }}
    />
  );
}

export default KakaoMap;
