import React, { useEffect } from "react";
import styled from "styled-components";

const { kakao } = window;

function KakaoMap(props) {
  useEffect(() => {
    const container = document.getElementById("myMap");

    console.log("@@@");

    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
  }, []);

  return (
    <div
      id="myMap"
      style={{
        width: "4000px",
        height: "4000px",
      }}
    />
  );
}

export default KakaoMap;

const Map = styled.div`
  width: 5000px;
  height: 4000px;
  margin: 1000px 1000px 0 130%;
`;
