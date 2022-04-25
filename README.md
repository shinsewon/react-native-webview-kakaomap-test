



# smartbattery rest api
## 목차
### [authentication](#authentication)
* [access token](#access-token)
* [refresh token](#refresh-token)

### [ChargingStation](#chargingStation)
* [충전 스테이션 목록 조회](#충전-스테이션-목록-조회)

### [Bikes](#bikes)
* [바이크 목록 조회](#바이크-목록-조회)
* [바이크 상세 조회](#바이크-상세-조회)
* [바이크 정보 수정](#바이크-정보-수정)


### [Rider](#rider)
* [Rider 전체 목록 조회](#rider-전체-목록-조회)
* [Rider 상세 조회](#rider-상세-조회)
* [내 모터사이클의 연결 권한을 이미 갖고 있는 기존의 라이더 목록 조회](#내-모터사이클의-연결-권한을-이미-갖고-있는-기존의-라이더-목록-조회)
* [라이더 연결 권한 요청 개수 조회](#라이더-연결-권한-요청-개수-조회)
* [라이더 검색(바이크 부여)](#라이더-검색바이크-부여)
* [Rider 주소 수정](#rider-주소-수정)

* [Rider 약관동의여부, sms, email, push 발송여부](#Rider 약관동의여부,-sms,-email,-push-발송여부-변경)
* [동의여부 조회](#동의여부-조회)
* [동의여부 변경](#동의여부-변경)

### [간편인증](#간편인증otp)
* [간편인증 요청](#간편인증-요청)
* [간편인증 인증처리](#간편인증-인증처리)

### [회원](#회원)
* [이메일(ID) 중복 체크](#이메일id-중복-체크)
* [휴대폰 번호 중복 체크](#휴대폰-번호-중복-체크)
* [회원가입](#회원가입)
* [회원탈퇴](#회원탈퇴)
* [비밀번호 재설정](#비밀번호-재설정)
* [비밀번호 일치 여부 검사](#비밀번호-일치-여부-검사)

### [home](#home)
* [둘러보기](#둘러보기)
* [로그인](#로그인)
* [아이디 찾기](#아이디-찾기)
* [비밀번호 변경](#비밀번호-변경)

### [Menu](#menuhome)

### [플레이스](#플레이스)
* [플레이스 조회](#플레이스-조회)


## authentication
### access token
#### request
 POST {endpoint}/oauth/token

##### header
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | Authorization | string | Base64 {clientid}:{clientsecret}|
 |  2 | Content-Type  | string | application/x-www-form-urlencoded |

##### body
 | no | name   | type          | 비고     |
 |:--:|:------:|:-------------:|:--------|
 |  1 | grant_type | string | password |
 |  2 | username   | string | owner id |
 |  3 | password   | string | owner password |

#### response
 | no | name   | type          | 비고    |
 |:--:|:------:|:-------------:|:--------|
 |  1 | access_token  | string |  |
 |  2 | token_type    | string | bearer |
 |  3 | refresh_token | string |  |
 |  4 | expires_in    | int    | sec |
 |  5 | scope         | string |  |

##### example
 ```curl
 curl -X POST '{endpoint}/oauth/token' \
 -H 'Authorization: Basic {basic_token}' \
 -H 'Content-Type: application/x-www-form-urlencoded' \
 --data-urlencode 'username={id}' \
 --data-urlencode 'password={pwd}' \
 --data-urlencode 'grant_type=password'

 # 200 ok
 {
    "access_token": "f006c2f8-2d9e-44ac-9b99-0cc9dda056bc",
    "token_type": "bearer",
    "refresh_token": "82cafc59-b895-4284-acb7-7dadef51f314",
    "expires_in": 599,
    "scope": "read write"
 }
 ```

### refresh token
#### request
 POST {endpoint}/oauth/token

##### header
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | Authorization | string | Base64 {clientid}:{clientsecret}|
 |  2 | Content-Type | string | application/x-www-form-urlencoded |

##### body
 | no | name   | type          | 비고     |
 |:--:|:------:|:-------------:|:--------|
 |  1 | grant_type | string | refresh_token |
 |  2 | refresh_token   | string |  |

#### response
 | no | name   | type          | 비고     |
 |:--:|:------:|:-------------:|:--------|
 |  1 | access_token | string |  |
 |  2 | token_type   | string | bearer |
 |  3 | refresh_token | string | |
 |  4 | expires_in | int  | sec |
 |  5 | scope | string  | |

##### example
 ```curl
 curl -X POST '{endpoint}/oauth/token' \
 -H 'Authorization: Basic {basic_token}' \
 -H 'Content-Type: application/x-www-form-urlencoded' \
 --data-urlencode 'grant_type=refresh_token' \
 --data-urlencode 'refresh_token=82cafc59-b895-4284-acb7-7dadef51f314'

 # 200 OK
 {
    "access_token": "f006c2f8-2d9e-44ac-9b99-0cc9dda056bc",
    "token_type": "bearer",
    "refresh_token": "82cafc59-b895-4284-acb7-7dadef51f314",
    "
    expires_in": 599,
    "scope": "read write"
 }
 ```

## ChargingStation
### Domain
#### Chrstn
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | goodsType | string | 상품 타입(충전소:C, 바이크:B) |
 |  2 | maker | string | 제조사 |
 |  3 | reservable | enum(string) | * y : 예약 가능한 스테이션<br> * n : 예약 불가능한 스테이션 |
 |  4 | myResveYn | string | * y (본인이 연결한 바이크로 예약한 건이 존재하는 스테이션) <br> * n (본인이 연결한 바이크로 예약한 건이 존재하지 않는 스테이션) |
 |  5 | exSerialNo | string | 충전 스테이션 시리얼번호 (해당 필드는 myResveYn == y일때만 존재) |
 |  6 | biSerialNo | string | 바이크 시리얼번호 (해당 필드는 myResveYn == y일때만 존재) |
 |  5 | chrstnSn | string | 충전 스테이션 번호|
 |  6 | chrstnNm | string | 충전 스테이션 이름 |
 |  7 | bsnHour | string | 영업시간 |
 |  8 | serialNo | string | 충전 스테이션 시리얼번호 |
 |  9 | addr | string | 주소 |
 | 10 | addrDetail | string | 상세 주소 |
 | 11 | latitude | Double | 위도 |
 | 12 | longitude | Double | 경도 |
 | 13 | distance | Double | 현재위치와 충전소와의 거리 |
 | 14 | maxSoc | double | 예약 가능한 배터리 중 제일 높은 잔량 |
 | 15 | resveSoc | double | 예약된 배터리의 잔량 |
 | 16 | usableSlotCnt | Integer | 배터리 예약 가능 개수 |
 | 17 | chrstnSlotList | List<[ChrstnSlot](#ChrstnSlot)> | List of chrstn slots | 

#### ChrstnSlot
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | upperSerialNo | string | 충전 스테이션 시리얼번호 |
 |  2 | soc | double | 배터리 잔량 |
 |  3 | reservable | string | * y :예약 가능 <br> * n : 예약 불가능 |
 |  4 | drivingDistance | double | 주행 거리(km) |

### 충전 스테이션 목록 조회
#### request
 GET {endpoint}/api/v1/chrstn?lat={lat}&lng={lng}&option={option}&maker={maker}

##### header
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | Authorization | string | Bearer {access_token}|
 |  2 | Content-Type | string | application/json |

##### param
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | lat | string | 위도 |
 |  2 | lng | string | 경도 |
 |  3 | option | string | nullable <br> * soc (예약 가능 배터리 잔량이 80% 이상인 목록) <br> * dist (유저 위치로부터 3km 이내인 목록) |
 |  4 | maker | string | nullable <br> 제조사 |

#### response
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | status | string | ok, nok |
 |  2 | data | [Chrstn](#chrstn) | lists of Chrstn |
 |  3 | errorCode | string | nok 일 경우 출력 |
 |  4 | errorMessage | string | nok 일 경우 출력 |

 ```curl

 # 200 ok - 전체 목록 조회
 curl -X GET '{endpoint}/api/v1/chrstn?lat=37.5&lng=126.8' \
 -H 'Authorization: Bearer {access_token}' \
 -H 'Content-Type: application/json'

 {
    "status": "ok",
    "data": [
        {
            "goodsType": "C",
            "maker": "korea",
            "reservable": "y",
            "myResveYn": "n",
            "chrstnSn": "23",
            "chrstnNm": "sim_station_019",
            "bsnHour": null,
            "chrstnTel": null,
            "serialNo": "S2102T0019",
            "addr": null,
            "addrDetail": null,
            "latitude": 37.50551049,
            "longitude": 127.0283454,
            "distance": 24.8,
            "maxSoc": 100.0,
            "resveSoc": 0.0,
            "usableSlotCnt": 3,
            "chrstnSlotList": [
                {
                    "upperSerialNo": "S2102T0019",
                    "soc": 100.0,
                    "reservable": "y",
                    "drivingDistance": 72.0
                },
                {
                    "upperSerialNo": "S2102T0019",
                    "soc": 100.0,
                    "reservable": "y",
                    "drivingDistance": 72.0
                },
                {
                    "upperSerialNo": "S2102T0019",
                    "soc": 100.0,
                    "reservable": "y",
                    "drivingDistance": 72.0
                }
            ]
        },
        {
            "goodsType": "C",
            "maker": "zentropy",
            "reservable": "y",
            "myResveYn": "y",
            "exSerialNo": "SAA00002",   // myResveYn이 y인 경우 존재
            "biSerialNo": "MAA00002",   // myResveYn이 y인 경우 존재
            "chrstnSn": "2",
            "chrstnNm": "Station2",
            "bsnHour": "10:00~19:00",
            "chrstnTel": null,
            "serialNo": "SAA00002",
            "addr": "대한민국 경기도 수원시 권선구 탑동 호매실로",
            "addrDetail": "서수원 우체국",
            "latitude": 37.257681,
            "longitude": 126.969893,
            "distance": 30.8,
            "maxSoc": 75.0,
            "resveSoc": 75.0,
            "usableSlotCnt": 4,
            "chrstnSlotList": [
                {
                    "upperSerialNo": "SAA00002",
                    "soc": 75.0,
                    "reservable": "n",
                    "drivingDistance": 108.0
                },
                {
                    "upperSerialNo": "SAA00002",
                    "soc": 55.0,
                    "reservable": "y",
                    "drivingDistance": 79.0
                },
                {
                    "upperSerialNo": "SAA00002",
                    "soc": 30.0,
                    "reservable": "y",
                    "drivingDistance": 43.0
                },
                {
                    "upperSerialNo": "SAA00002",
                    "soc": 23.0,
                    "reservable": "y",
                    "drivingDistance": 33.0
                }
            ]
        },
        {
            "goodsType": "C",
            "maker": "korea",
            "reservable": "n",
            "myResveYn": "n",
            "chrstnSn": "25",
            "chrstnNm": "sim_station_021",
            "bsnHour": null,
            "chrstnTel": null,
            "serialNo": "S2102T0021",
            "addr": null,
            "addrDetail": null,
            "latitude": 37.51096504,
            "longitude": 127.0398924,
            "distance": 24.1,
            "maxSoc": 0.0,
            "resveSoc": 0.0,
            "usableSlotCnt": 0,
            "chrstnSlotList": []
        },
    ],
    "errorMessage": null,
    "errorCode": null
 }
     
 # 200 ok - 유저 위치로부터 3km 이내인 목록
 curl -X GET '{endpoint}/api/v1/chrstn?lat=37.5&lng=126.8&option=dist' \
 -H 'Authorization: Bearer {access_token}' \
 -H 'Content-Type: application/json'

 {
    "status": "ok",
    "data": [
        {
            "goodsType": "C",
            "reservable": "n",
            "myResveYn": "n",
            "chrstnSn": "3",
            "chrstnNm": "Station3",
            "bsnHour": "09:30~18:30",
            "serialNo": "SAA00003",
            "addr": "대한민국 경기도 부천시 원미구 춘의동 산21-2",
            "addrDetail": "종합운동장인라인트랙 옆",
            "latitude": 37.500722,
            "longitude": 126.801612,
            "distance": 0.2,
            "maxSoc": 0.0,
            "resveSoc": 0.0,
            "usableSlotCnt": 0,
            "chrstnSlotList": [
                {
                    "upperSerialNo": "SAA00003",
                    "soc": 100.0,
                    "reservable": "n",
                    "drivingDistance": 144.0
                },
                {
                    "upperSerialNo": "SAA00003",
                    "soc": 95.0,
                    "reservable": "n",
                    "drivingDistance": 136.0
                },
                {
                    "upperSerialNo": "SAA00003",
                    "soc": 89.0,
                    "reservable": "n",
                    "drivingDistance": 128.0
                },
                {
                    "upperSerialNo": "SAA00003",
                    "soc": 67.0,
                    "reservable": "n",
                    "drivingDistance": 96.0
                }
            ]
        }
    ],
    "errorMessage": null,
    "errorCode": null
 }
       
 # 200 ok - 예약 가능 배터리 잔량이 80% 이상인 목록
 curl -X GET '{endpoint}/api/v1/chrstn?lat=37.5&lng=0&option=soc' \
 -H 'Authorization: Bearer {access_token}' \
 -H 'Content-Type: application/json'

 {
    "status": "ok",
    "data": [
        {
            "goodsType": "C",
            "reservable": "y",
            "myResveYn": "n",
            "chrstnSn": "1",
            "chrstnNm": "Station1",
            "bsnHour": "09:00~18:00",
            "serialNo": "SAA00001",
            "addr": "경기도 안양시 동안구 호계동",
            "addrDetail": "대명공업사",
            "latitude": 37.357549,
            "longitude": 126.961594,
            "distance": 21.3,
            "maxSoc": 80.0,
            "resveSoc": 0.0,
            "usableSlotCnt": 4,
            "chrstnSlotList": [
                {
                    "upperSerialNo": "SAA00001",
                    "soc": 80.0,
                    "reservable": "y",
                    "drivingDistance": 115.0
                },
                {
                    "upperSerialNo": "SAA00001",
                    "soc": 70.0,
                    "reservable": "y",
                    "drivingDistance": 100.0
                },
                {
                    "upperSerialNo": "SAA00001",
                    "soc": 65.0,
                    "reservable": "y",
                    "drivingDistance": 93.0
                },
                {
                    "upperSerialNo": "SAA00001",
                    "soc": 0.0,
                    "reservable": "y",
                    "drivingDistance": 0.0
                }
            ]
        }
    ],
    "errorMessage": null,
    "errorCode": null
 }      

 # 200 ok - 특정 배터리 제조원만 조회
 curl -X GET '{endpoint}/api/v1/chrstn?lat=37.7273164&lng=127.0575589&maker=zentropy' \
 -H 'Authorization: Bearer {access_token}' \
 -H 'Content-Type: application/json'
 
 {
    "status": "ok",
    "data": [
        {
            "goodsType": "C",
            "maker": "zentropy",
            "reservable": "n",
            "myResveYn": "n",
            "chrstnSn": "3",
            "chrstnNm": "군포교환소 1",
            "bsnHour": null,
            "chrstnTel": null,
            "serialNo": "S2117D0001",
            "addr": "경기 군포시 공단로140번길 46",
            "addrDetail": "609호",
            "latitude": 37.35711040835654,
            "longitude": 126.95410325454,
            "distance": 42.2,
            "maxSoc": 0.0,
            "resveSoc": 0.0,
            "usableSlotCnt": 0,
            "chrstnSlotList": []
        },
        {
            "goodsType": "C",
            "maker": "zentropy",
            "reservable": "n",
            "myResveYn": "n",
            "chrstnSn": "4",
            "chrstnNm": "군포 교환소",
            "bsnHour": null,
            "chrstnTel": null,
            "serialNo": "S2112T0002",
            "addr": "경기 군포시 공단로140번길 46",
            "addrDetail": "609호",
            "latitude": 37.35711040835654,
            "longitude": 126.95410325454,
            "distance": 42.2,
            "maxSoc": 0.0,
            "resveSoc": 0.0,
            "usableSlotCnt": 0,
            "chrstnSlotList": []
        }
    ]
 }

 # 200 ok but no data
 {
    "status": "ok",
    "data": [],
    "errorMessage": null,
    "errorCode": null
 }

 ```




## Bikes
### Domain
#### Bike
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 | 1 | goodsType | string | 상품 타입 <br> (충전소:C, 바이크:B) |
 | 2 | bikeType | string | 바이크 타입 <br> (C:연결된 바이크, O:소유한 바이크, A:부여받은 바이크)
 | 3 | maker | string | 제조사 |
 | 4 | serialNo | string | 바이크 시리얼 번호 |
 | 5 | vehicleId | string | 차대번호 |
 | 6 | goodsAliasNm | string | 바이크 닉네임(미지정시 차대번호) |
 | 7 | vinNo | string | 번호판 |
 | 8 | purchaserSn | string | 바이크 소유자 순번 |
 | 9 | purchaserNm | string | 바이크 소유자 이름 |
 | 10 | oprat | string | 운행 상태 <br> (0:미운행, 1:운행) |
 | 11 | bt1Soc | string | 배터리 잔량 |
 | 12 | lat | Double | 바이크의 현재 위치-위도 |
 | 13 | lng | Double | 바이크의 현재 위치-경도 |
 | 14 | riderCnt | Integer | 해당 바이크에 연결 권한을 부여받은 라이더 수 |
 | 15 | status | String | 바이크 상태(정상,점검 필요 등 ..) |
 | 16 | version | String | 앱 버전 |
 | 17 | connectTime | String | 해당 바이크를 마지막으로 연결한 시간 |

#### Bikes
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 | 1 | rider | [Rider](#rider) | 라이더 정보 |
 | 2 | bikeList | List<[Bike](#bike)> | 바이크 정보들 |

### 바이크 목록 조회
#### request
 GET {endpoint}/api/v1/bikes
 
##### header
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | Authorization | string | Bearer {access_token}|
 |  2 | Content-Type | string | application/json |

##### path variable
 N/A
  
#### response 
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | status | string | ok, nok |
 |  2 | data | [Bikes](#bikes) |  |
 |  3 | errorCode | string | nok 일 경우 출력 |
 |  4 | errorMessage | string | nok 일 경우 출력 |

 ```curl
 curl -X GET '{endpoint}/api/v1/bikes' \
 -H 'Authorization: Bearer {access_token}' \
 -H 'Content-Type: application/json'

 # 200 ok 
 {
    "status": "ok",
    "data": {
        "rider": {
            "riderSn": "6fbcf2af-ec13-42b3-9736-850a7280bfcc",
            "email": "yjlee@zentropy.co.kr",
            "riderNm": "이예준",
            "phone": "01049106091",
            "zipCode": "15847",
            "addr": "경기 군포시 공단로140번길 46 ",
            "addrDetail": "609호",
            "cnncBikeSn": "M2117D0010",
            "withDrawalYn": "n",
            "creationDt": "2021-04-22 14:37:10",
            "updateDt": "2021-09-06 12:57:34",
            "authorities": [
                {
                    "authority": "ROLE_RIDER"
                }
            ],
            "accountNonLocked": true,
            "accountNonExpired": true,
            "credentialsNonExpired": true,
            "enabled": true,
            "username": "yjlee@zentropy.co.kr"
        },
        "bikeList": [
            {
                "goodsType": "B",
                "bikeType": "O",
                "maker": "zentropy",
                "serialNo": "M2117D0010",
                "vehicleId": "KR90P1Z4EMKXCZ007",
                "goodsAliasNm": "KRA0P1Z4E0K000010",
                "nickName": "KRA0P1Z4E0K000010",
                "vinNo": null,
                "purchaserSn": "6",
                "purchaserNm": "이예준",
                "oprat": "0",
                "bt1Soc": "34",
                "lat": 37.357381833333335,
                "lng": 126.95564166666666,
                "riderCnt": 2,
                "status": "ok",
                "version": "1.0",
                "connectTime": "2021-09-06 12:57:34"
            },
            {
                "goodsType": "B",
                "bikeType": "O",
                "maker": "zentropy",
                "serialNo": "M2117D0006",
                "vehicleId": "KR90P1Z4EMKXCZ003",
                "goodsAliasNm": "m2117d0006",
                "nickName": "m2117d0006",
                "vinNo": null,
                "purchaserSn": "6",
                "purchaserNm": "이예준",
                "oprat": "0",
                "bt1Soc": "0",
                "lat": 37.35892416666666,
                "lng": 126.96578149999999,
                "riderCnt": 2,
                "status": "ok",
                "version": "1.0",
                "connectTime": "2021-09-03 13:09:35"
            }
        ]
    },
    "errorMessage": null,
    "errorCode": null
 }
 ```




### 바이크 상세 조회
#### request
 GET {endpoint}/api/v1/bikes/:serialNo
 
##### header
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | Authorization | string | Bearer {access_token}|
 |  2 | Content-Type | string | application/json |

##### path variable
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | serialNo | string | 바이크 시리얼 번호 |
  
#### response
 - 200 OK

 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | status | string | ok, nok |
 |  2 | data | [Bike](#bike) |  |
 |  3 | errorCode | string | nok 일 경우 출력 |
 |  4 | errorMessage | string | nok 일 경우 출력 |

 ```curl
 curl -X GET '{endpoint}/api/v1/bikes/MAA54321' \
 -H 'Authorization: Bearer {access_token}' \
 -H 'Content-Type: application/json'

 # 200 ok
  {
    "status": "ok",
    "data": {
        "goodsType": "B",
        "bikeType": null,
        "maker": "zentropy",
        "serialNo": "M2117D0010",
        "vehicleId": "KR90P1Z4EMKXCZ007",
        "goodsAliasNm": "KRA0P1Z4E0K000010",
        "nickName": "KRA0P1Z4E0K000010",
        "vinNo": null,
        "purchaserSn": "6",
        "purchaserNm": "이예준",
        "oprat": "0",
        "bt1Soc": "34",
        "lat": 37.357381833333335,
        "lng": 126.95564166666666,
        "riderCnt": null,
        "status": "ok",
        "version": "1.0",
        "connectTime": null
    },
    "errorMessage": null,
    "errorCode": null
 }

 ```

### 바이크 정보 수정
#### request
 PUT {endpoint}/api/v1/bikes/:serialNo
 
##### header
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | Authorization | string | Bearer {access_token}|
 |  2 | Content-Type | string | application/json |

##### path variable
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | serialNo | string | 바이크 시리얼 번호 |
 
##### body
###### 별칭 수정
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | goodsAliasNm | string | 별칭 |

###### 번호판 수정
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | vinNo | string | 번호판 |
 
#### response 
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | status | string | ok, nok |
 |  2 | data | string | serialNo |
 |  3 | errorCode | string | nok 일 경우 출력 |
 |  4 | errorMessage | string | nok 일 경우 출력 |

 ```curl
 curl -X PUT '{endpoint}/api/v1/bikes/MAA00003' \
 -H 'Authorization: Bearer {access_token}' \
 -H 'Content-Type: application/json' \
 -H 'Content-Type: text/plain' \
 (별칭 수정시)
 --data-raw '{
    "goodsAliasNm": "TEST"
 }'

 (번호판 수정시)
 --data-raw '{
    "vinNo": "3413"
 }'

 # 200 ok
 {
    "status": "ok",
    "data": "MAA00003",
    "errorMessage": null,
    "errorCode": null
 }
 ```




### Rider 주소 수정
#### request
 PUT {endpoint}/api/v1/rider

##### header
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | Authorization | string | Bearer {access_token}|
 |  2 | Content-Type | string | application/json |

##### body
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 | 1 | zipCode | string | 우편번호 |
 | 2 | addr | string | 주소 |
 | 3 | addrDetail | string | 상세주소 |
 | 4 | riderSn | string | 주소변경하려는 라이더의 고유번호 |
 ```json
 {
    "zipCode" : "11111",
    "addr": "testAddr",
    "addrDetail" : "testAddrDetail",
    "riderSn" : "f3517a01-ad82-4e5a-b808-342131931683"
 }
 ```

#### response
 - 200 OK
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | status | string | ok, nok |
 |  2 | data | string |  |
 |  3 | errorCode | string | nok 일 경우 출력 |
 |  4 | errorMessage | string | nok 일 경우 출력 |

 ```curl
 curl -X PUT '{endpoint}/api/v1/rider' \
 -H 'Authorization: Bearer {access_token}
 -H 'Content-Type: application/json' \
 --data-raw '{
    "zipCode" : "11111",
    "addr": "testAddr",
    "addrDetail" : "testAddrDetail",
    "riderSn" : "f3517a01-ad82-4e5a-b808-342131931683"
 }'

 # 200 ok
 {
    "status": "ok",
    "data": "success",
    "errorMessage": null,
    "errorCode": null
 }

 # 200 nok
 {
    "status": "nok",
    "data": null,
    "errorMessage": "rider info update fail",
    "errorCode": "CODE_024"
 }

 ```

## 약관동의여부, sms, email, push 발송여부
### 동의여부 조회
#### request
  GET {endpoint}/api/v1/rider/stplat
##### header
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | Authorization | string | Bearer {access_token}|
 |  2 | Content-Type | string | application/json |

#### response
 - 200 OK

 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | status | string | ok, nok |
 |  2 | data | string |  |
 |  3 | errorCode | string | nok 일 경우 출력 |
 |  4 | errorMessage | string | nok 일 경우 출력 |

 ```curl
 curl -X GET '{endpoint}/api/v1/rider/stplat' \
 -H 'Authorization: Bearer {access_token}'

 # 200 ok
 {
    "status": "ok",
    "data": {
        "stplatSn": "25",
        "riderSn": "6fbcf2af-ec13-42b3-9736-850a7280bfcc",
        "st1": "y",
        "pushSt": "n",
        "smsSt": "n",
        "emailSt": "n",
        "creationDt": "2021-04-22 14:37:10",
        "updateDt": "2021-04-22 14:37:10"
    },
    "errorMessage": null,
    "errorCode": null
 }
 ```

### 동의여부 변경
#### request
 PUT {endpoint}/api/v1/rider/stplat

##### header
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | Authorization | string | Bearer {access_token}|
 |  2 | Content-Type | string | application/json |

##### body
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 | 1 | st1 | string | 1번약관 동의여부 y/n |
 | 2 | pushSt | string | push알림 수신 동의여부 y/n |
 | 3 | emailSt | string | email 수신 동의여부 y/n |
 | 4 | smsSt | string | sms알림 수신 동의여부 y/n |

 ```json
 {
    "st1": "y",
    "pushSt" : "y",
    "emailSt": "y",
    "smsSt": "y"
 }
 ```

#### response
 - 200 OK

 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | status | string | ok, nok |
 |  2 | data | string |  |
 |  3 | errorCode | string | nok 일 경우 출력 |
 |  4 | errorMessage | string | nok 일 경우 출력 |

 ```curl
 curl -X PUT '{endpoint}/api/v1/rider/stplat' \
 -H 'Authorization: Bearer {access_token}' \
 -H 'Content-Type: application/json' \
 --data-raw '{
    "st1": "y",
    "pushSt" : "y",
    "emailSt": "y",
    "smsSt": "y"
 }'

 # 200 ok
 {
    "status": "ok",
    "data": "success",
    "errorMessage": null,
    "errorCode": null
 }

 # 200 nok
 {
    "status": "nok",
    "data": null,
    "errorMessage": "fail",
    "errorCode": "CODE_026"
 }

 ```


## 간편인증(otp)
### 간편인증 요청
#### request
 GET {endpoint}/api/v1/otp
 
##### header
 N/A

##### param
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | phone | string | 인증 요청 휴대폰 번호 |

#### response
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | status | string | ok, nok |
 |  2 | data | string | messageId(uuid)/certificate number(6) |
 |  3 | errorCode | string | nok 일 경우 출력 |
 |  4 | errorMessage | string | nok 일 경우 출력 |

 ```curl
 curl -X GET '{endpoint}/api/v1/otp?phone={phone}' \
 -H 'Content-Type: application/json' 

 {
    "status": "ok",
    "data": "26015ec3-0dcb-4ae2-8a2d-1937ab33ecad/632216",
    "errorMessage": null,
    "errorCode": null
 }

 ```

### 간편인증 인증처리
#### Domain
##### Otp
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 | 1 | messageId | string | otp 식별자(uuid) |
 | 2 | otpNo | string | otp번호|
 | 3 | phone | string | 인증 요청 휴대폰 번호|

#### request
 POST {endpoint}/api/v1/otp
 
##### header
 N/A

##### body
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 | 1 | otp | Otp | domain |

#### response
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | status | string | ok, nok |
 |  2 | data | string | messageId(uuid) otp 식별자 |
 |  3 | errorCode | string | nok 일 경우 출력 |
 |  4 | errorMessage | string | nok 일 경우 출력 |

 ```curl
 curl -X POST '{endpoint}/api/v1/otp' \
 -H 'Content-Type: application/json' \
 --data-raw '{
    "messageId" : "26015ec3-0dcb-4ae2-8a2d-1937ab33ecad",
    "otpNo" : "632216",
    "phone" : "01045467589"
 }'

 # 200 ok
 {
    "status": "ok",
    "data": "01045467589",
    "errorMessage": null,
    "errorCode": null
 }

 # 200 NOK
 {
    "status": "nok",
    "data": null,
    "errorMessage": "OTP 만료",
    "errorCode": null
 }

 # 400 NOK
 {
    "status": "nok",
    "data": null,
    "errorMessage": "입력값이 잘못되었거나 이미 인증된 OTP번호입니다.",
    "errorCode": "400"
 }
 ```


## 회원
### 이메일(ID) 중복 체크
#### request
 GET {endpoint}/api/v1/join/duplicate?email={email}

##### header
 N/A

##### param
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | email | string | 이메일(Id) |

#### response
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | status | string | ok, nok |
 |  2 | data | string | email(id) |
 |  3 | errorCode | string | nok 일 경우 출력 |
 |  4 | errorMessage | string | nok 일 경우 출력 |

 ```curl
 curl -X GET '{endpoint}/api/v1/join/duplicate?email=aromit@aromdit.com' \
 -H 'Content-Type: application/json' 

 # 200 ok 사용 가능 이메일
 {
    "status": "ok",
    "data": "usable_aromit@aromdit.com",
    "errorMessage": null,
    "errorCode": null
 }

 # 200 nok 중복된 이메일
 {
    "status": "nok",
    "data": null,
    "errorMessage": "중복된 이메일",
    "errorCode": "CODE_016"
 }

 ```

### 휴대폰 번호 중복 체크
#### request
 GET {endpoint}/api/v1/join/duplicate?phone={phone}

##### header
 N/A

##### param
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | phone | string | 휴대폰 번호 |

#### response
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | status | string | ok, nok |
 |  2 | data | string |  |
 |  3 | errorCode | string | nok 일 경우 출력 |
 |  4 | errorMessage | string | nok 일 경우 출력 |

 ```curl
 curl -X GET '{endpoint}/api/v1/join/duplicate?phone=01045458989' \
 -H 'Content-Type: application/json' 

 # 200 ok 사용 가능 폰번호
 {
    "status": "ok",
    "data": "usable_01045458989",
    "errorMessage": null,
    "errorCode": null
 }

 # 200 nok 중복된 폰번호
 {
    "status": "nok",
    "data": null,
    "errorMessage": "중복된 폰번호",
    "errorCode": "CODE_021"
 }

 ```


### 가입
### Domain
#### Join
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 | 1 | riderSn | string | 라이더 번호 |
 | 2 | email | string | 라이더 이메일(라이더 ID) |
 | 3 | secret | string | 비밀번호 |
 | 4 | phone | string | 휴대폰 번호 |
 | 5 | zipCode | string | 우편번호 |
 | 6 | addr | string | 주소 |
 | 7 | addrDetail | string | 상세주소 |
 | 8 | st1 | string | 선택약관1번 동의여부(y,n) |
 | 9 | pushSt | string | push알림 수신 동의여부(y,n) |
 | 10 | smsSt | string | sms알림 수신 동의여부(y,n) |
 | 11 | emailSt | string | email 수신 동의여부(y,n) |

#### Posesn
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 | 1 | riderSn | string | 라이더 번호 |
 | 2 | posSttus | string | 바이크 소유 또는 할당 여부 <br> * owner  (구매한 바이크가 있음) <br> * allowance (부여받은 바이크만 있음) <br> * nothing (바이크를 구매하지도 부여받지도 않음) |
 | 3 | ownCnt | integer | 소유한 바이크 수량 |
 | 4 | posCnt | integer | 부여받은 바이크 수량 |

#### request
 POST {endpoint}/api/v1/join
 
##### header
 N/A

##### body
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 | 1 | email | string | 라이더 이메일(라이더 ID) |
 | 2 | secret | string | 비밀번호 |
 | 3 | riderNm | string | 라이더 이름 |
 | 4 | phone | string | 휴대폰 번호 |
 | 5 | zipCode | string | 우편번호 |
 | 6 | addr | string | 주소 |
 | 7 | addrDetail | string | 상세주소 |
 | 8 | st1 | string | 선택약관1번 동의여부(y,n) |
 | 9 | pushSt | string | push알림 수신 동의여부(y,n) |
 | 10 | smsSt | string | sms알림 수신 동의여부(y,n) |
 | 11 | emailSt | string | email 수신 동의여부(y,n) |

 ```json
 {
    "email": "oioi@ioio.io"
    ,"secret": "0101"
    ,"riderNm": "오아이오"
    ,"phone": "0107989"
    ,"zipCode" : "54321"
    ,"addr": "서울시"
    ,"addrDetail": "마포구"
    ,"st1": "y"
    ,"pushSt": "y"
    ,"smsSt": "y"
    ,"emailSt": "y"
 }
 ```

#### response
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | status | string | ok, nok |
 |  2 | data | Posesn | domain |
 |  3 | errorCode | string | nok 일 경우 출력 |
 |  4 | errorMessage | string | nok 일 경우 출력 |

 ```curl
 curl -X POST '{endpoint}/api/v1/join' \
 -H 'Content-Type: application/json' \
 --data-raw '{
    "email": "oioi@ioio.io"
    ,"secret": "0101"
    ,"riderNm": "오아이오"
    ,"phone": "0107989"
    ,"zipCode" : "54321"
    ,"addr": "서울시"
    ,"addrDetail": "마포구"
    ,"st1": "y"
    ,"pushSt": "y"
    ,"smsSt": "y"
    ,"emailSt": "y"
 }'

 # 200 ok
  {
    "status": "ok",
    "data": {
        "riderSn": "23282c20-0458-4fb1-bbf2-6612818bcd77",
        "posSttus": "nothing",
        "ownCnt": 0,
        "posCnt": 0
    },
    "errorMessage": null,
    "errorCode": null
 }

 ```

### 회원탈퇴
#### request
 PUT {endpoint}/api/v1/rider/withdrawal

##### header
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | Authorization | string | Bearer {access_token}|
 |  2 | Content-Type | string | application/json |

##### path variable
 N/A

###### param
 N/A

#### response
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | status | string | ok, nok |
 |  2 | data | string |   |
 |  3 | errorCode | string | nok 일 경우 출력 |
 |  4 | errorMessage | string | nok 일 경우 출력 |

 ``` curl
 curl -X PUT '{endpoint}/api/v1/rider/withdrawal' \
 -H 'Content-Type: application/json' \
 -H 'Authorization: Bearer {access_token}'

 # 200 ok
 {
    "status": "ok",
    "data": "success",
    "errorMessage": null,
    "errorCode": null
 }

 ```

### 비밀번호 재설정
#### request
 PUT {endpoint}/api/v1/rider/secret/reset

##### header
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | Authorization | string | Bearer {access_token}|
 |  2 | Content-Type | string | application/json |

###### body
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | riderNm | string | 라이더 이름 |
 |  2 | phone | string | 라이더 휴대폰 번호 |
 |  3 | secret | string | 변경할 비밀번호 |
 
 ```json
 {
    "riderNm" : "민주희",
    "phone" : "01045467589",
    "secret": "test"
 }
 ```

#### response
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | status | string | ok, nok |
 |  2 | data | string |   |
 |  3 | errorCode | string | nok 일 경우 출력 |
 |  4 | errorMessage | string | nok 일 경우 출력 |

 ```curl
 curl -X PUT '{endpoint}/api/v1/rider/secret/reset' \
 -H 'Authorization: Bearer {access_token}' \
 -H 'Content-Type: application/json' \
 --data-raw '{
    "riderNm" : "민주희",
    "phone" : "01045467589",
    "secret": "test"
 }'

 # 200 ok
 {
    "status": "ok",
    "data": "success",
    "errorMessage": null,
    "errorCode": null
}

```

### 비밀번호 일치 여부 검사
#### request
 POST {endpoint}/api/v1/rider/secret/check

##### header
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | Authorization | string | Bearer {access_token}|
 |  2 | Content-Type | string | application/json |

###### body
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 | 1  | secret | string | 변경할 비밀번호 |
 ```json
 {
    "secret": "test"
 }
 ```

#### response
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | status | string | ok, nok |
 |  2 | data | string |   |
 |  3 | errorCode | string | nok 일 경우 출력 |
 |  4 | errorMessage | string | nok 일 경우 출력 |

 ```curl
 curl -X POST '{endpoint}/api/v1/rider/secret/check' \
 -H 'Authorization: Bearer {access_token}' \
 -H 'Content-Type: application/json' \
 --data-raw '{
    "secret": "test"
 }'

 # 200 ok
 {
    "status": "ok",
    "data": "correct",
    "errorMessage": null,
    "errorCode": null
 }

 ```




## home
### 둘러보기
#### request
 GET {endpoint}/api/v1/home/preview

##### header
 N/A

##### param
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | lat | string | 위도 |
 |  2 | lng | string | 경도 |
 |  3 | zoom | string | 배율 |
 | 4 | maker | string | nullable <br> 제조사 |

#### response
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | status | string | ok, nok |
 |  2 | data | [Chrstn](#chrstn) | 충전소 |
 |  3 | errorCode | string | nok 일 경우 출력 |
 |  4 | errorMessage | string | nok 일 경우 출력 |

 ```curl
 curl -X GET '{endpoint}/api/v1/home/preview?lat={lat}&lng={lng}&zoom={zoom}&maker={maker}' \
 -H 'Content-Type: application/json' 

 # 200 ok
 {
    "status": "ok",
    "data": [
         {
            "goodsType": "C",
            "maker": "zentropy",
            "reservable": null,
            "myResveYn": null,
            "chrstnSn": "3",
            "chrstnNm": "군포교환소 1",
            "bsnHour": null,
            "chrstnTel": null,
            "serialNo": "S2117D0001",
            "addr": "경기 군포시 공단로140번길 46",
            "addrDetail": "609호",
            "latitude": 37.35711040835654,
            "longitude": 126.95410325454,
            "distance": 42.2,
            "maxSoc": 0.0,
            "resveSoc": 0.0,
            "usableSlotCnt": null,
            "chrstnSlotList": null
        },
        {
            "goodsType": "C",
            "maker": "zentropy",
            "reservable": null,
            "myResveYn": null,
            "chrstnSn": "4",
            "chrstnNm": "군포 교환소",
            "bsnHour": null,
            "chrstnTel": null,
            "serialNo": "S2112T0002",
            "addr": "경기 군포시 공단로140번길 46",
            "addrDetail": "609호",
            "latitude": 37.35711040835654,
            "longitude": 126.95410325454,
            "distance": 42.2,
            "maxSoc": 0.0,
            "resveSoc": 0.0,
            "usableSlotCnt": null,
            "chrstnSlotList": null
        },
       ...
    ],
    "errorMessage": null,
    "errorCode": null
 }

 ```

### 로그인
#### request
 POST {endpoint}/api/v1/home/login

##### header
 N/A

##### body
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 | 1 | email | string | id |
 | 2 | secret| string | pw |

 ```json
 {
    "email" : "aromit@aromit.com",
    "secret" : "test"
 }
 ```

#### response
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | status | string | ok, nok |
 |  2 | data | [Posesn](#posesn) |   |
 |  3 | errorCode | string | nok 일 경우 출력 |
 |  4 | errorMessage | string | nok 일 경우 출력 |

 ```curl
 curl -X POST '{endpoint}/api/v1/home/login' \
 -H 'Content-Type: application/json' \
 --data-raw '{
    "email" : "aromit@aromit.com",
    "secret" : "test"
 }'

 # 200 ok 바이크 구매자
 {
    "status": "ok",
    "data": {
        "riderSn": "bc0823a4-9330-11ea-bb37-0242ac130002",
        "posSttus": "owner",
        "ownCnt": 3,        // 소유한 바이크 수량
        "posCnt": 1         // 부여받은 바이크 수량
    },
    "errorMessage": null,
    "errorCode": null
 }

 # 200 ok 부여받은 바이크만 있는 라이더
 {
    "status": "ok",
    "data": {
        "riderSn": "bc0823a4-9330-11ea-bb37-0242ac130002",
        "posSttus": "allowance",    
        "ownCnt": 0,
        "posCnt": 2
    },
    "errorMessage": null,
    "errorCode": null
 }

 # 200 ok 바이크를 구매하지 않았고 부여받지도 않은 라이더
 {
    "status": "ok",
    "data": {
        "riderSn": "2c54be4d-09cb-40d6-986b-8b9c01d898ce",
        "posSttus": "nothing",     
        "ownCnt": 0,
        "posCnt": 0
    },
    "errorMessage": null,
    "errorCode": null
 }

 # 존재하지 않는 회원이거나 비밀번호가 틀렸을 경우
 {
    "status": "nok",
    "data": null,
    "errorMessage": "존재하지 않는 회원이거나 비밀번호가 일치하지 않습니다.",
    "errorCode": null
 }

 ```

### 아이디 찾기
#### request
 POST {endpoint}/api/v1/home/find/user

##### header
 N/A

##### body
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 | 1 | riderNm | string | 이름 |
 | 2 | phone | string | 핸드폰 번호 |

 ```curl
 curl -X POST '{endpoint}/api/v1/home/find/user' \
 -H 'Content-Type: application/json' \
 --data-raw '{
    "riderNm" : "라이더",
    "phone" : "01012345678"
 }'

 # 200 ok
 {
    "status": "ok",
    "data": {
        "email": "test@test.com",
        "secret": null,
        "riderNm": "라이더",
        "phone": "01012345678"
    },
    "errorMessage": null,
    "errorCode": null
 }

 # 200 nok
 {
    "status": "nok",
    "data": null,
    "errorMessage": "유저 정보가 존재하지 않습니다.",
    "errorCode": "CODE_019"
 }

 ```

### 비밀번호 변경
#### request
 POST {endpoint}/api/v1/home/find/secret

##### header
 N/A

##### body
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 | 1 | riderNm | string | 이름 |
 | 2 | phone | string | 핸드폰 번호 |
 | 3 | secret | string | 변경할 비밀번호 |

 ```curl
 curl -X POST '{endpoint}/api/v1/home/find/secret' \
 -H 'Content-Type: application/json' \
 --data-raw '{
    "riderNm" : "라이더",
    "phone" : "01012345678",
    "secret": "test"
 }'

 # 200 ok
 {
    "status": "ok",
    "data": "success",
    "errorMessage": null,
    "errorCode": null
 }

 # 200 nok
 {
    "status": "nok",
    "data": null,
    "errorMessage": "비밀번호 변경 실패",
    "errorCode": "CODE_020"
 }

 ```


## Menu
### 메뉴홈
#### MenuHome
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | rider | Rider | 라이더 정보 |
 |  2 | nickname | string | 바이크 닉네임 |
 |  3 | vinNo | string | 바이크 번호판 |

#### request
 GET {endpoint}/api/v1/menus

##### header
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | Authorization | string | Bearer {access_token}|
 |  2 | Content-Type | string | application/json |

 * 비로그인 사용자는 Authorization header N/A

##### path variable
 N/A

###### param
 N/A

#### response
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | status | string | ok, nok |
 |  2 | data | lists of [MenuHome](#menuhome) |   |
 |  3 | errorCode | string | nok 일 경우 출력 |
 |  4 | errorMessage | string | nok 일 경우 출력 |

 ```curl
 curl -X GET '{endpoint}/api/v1/menus' \
 -H 'Authorization: Bearer {access_token}' \
 -H 'Content-Type: application/json'

 # 200 ok - 비로그인 (비로그인의 경우 Authorization header 없음)
 {
    "status": "ok",
    "data": null,
    "errorMessage": "Not logged in",
    "errorCode": "CODE_013"
 }

 # 200 ok - 로그인되어 있고 연결된 바이크 있을 경우
 {
    "status": "ok",
    "data": {
        "rider": {
            "riderSn": "537c487e-36eb-4140-9287-53e5f8f020ff",
            "email": "owner3@rider.com",
            "riderNm": "오너삼",
            "phone": "01033330000",
            "zipCode": "02842",
            "addr": "서울 성북구 개운사길 2",
            "addrDetail": "삼",
            "cnncBikeSn": "MAA3333",
            "creationDt": "2021-02-28 19:23:10",
            "updateDt": "2021-02-28 23:09:48",
            "enabled": true,
            "username": "owner3@rider.com",
            "authorities": [
                {
                    "authority": "ROLE_RIDER"
                }
            ],
            "accountNonLocked": true,
            "credentialsNonExpired": true,
            "accountNonExpired": true
        },
        "nickName": "오삼이",
        "vinNo": "서울성북3333"
    },
    "errorMessage": null,
    "errorCode": null
 }

 # 200 ok - 로그인되어 있고 연결된 바이크 없을 경우
 {
    "status": "ok",
    "data": {
        "rider": {
            "riderSn": "537c487e-36eb-4140-9287-53e5f8f020ff",
            "email": "owner3@rider.com",
            "riderNm": "오너삼",
            "phone": "01033330000",
            "zipCode": "02842",
            "addr": "서울 성북구 개운사길 2",
            "addrDetail": "삼",
            "cnncBikeSn": null,
            "creationDt": "2021-02-28 19:23:10",
            "updateDt": "2021-02-28 23:09:48",
            "enabled": true,
            "username": "owner3@rider.com",
            "authorities": [
                {
                    "authority": "ROLE_RIDER"
                }
            ],
            "accountNonLocked": true,
            "credentialsNonExpired": true,
            "accountNonExpired": true
        },
        "nickName": null,
        "vinNo": null
    },
    "errorMessage": null,
    "errorCode": null
 }


 ```
## 플레이스
## 플레이스 조회
### domain
#### Place
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | placeSn | int | 플레이스 순번 |
 |  2 | placeTy | string | 플레이스 유형 |
 |  3 | placeNm | string | 플레이스 이름 |
 |  4 | placeTel | string | 플레이스 전화번호 |
 |  5 | addr | string | 주소 |
 |  6 | addrDetail | string | 상세주소 |
 |  7 | latitude | string | 위도 |
 |  8 | longitude | string | 경도 |
 |  9 | bsnHour | string | 운영시간 |
 | 10 | restSpcify | string | 특정휴무일 |
 | 11 | restDay | string | 휴무일 |
 | 12 | distance | string | 내 주소와의 거리 |
 | 13 | serviceNm | string | 서비스 항목 리스트 (서비스 번호,서비스 이름) |

### request
  GET {endpoint}/api/v1/place?locale={locale}&type={type}&lat={lat}&lng={lng}
#### header
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | Authorization | string | Bearer {access_token}|
 |  2 | Content-Type | string | application/json |

##### path variable
 N/A

###### param
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | locale | int | 지역순번 |
 | 2 | type | int | 유형순번 |
 | 3 | lat | double | 위도 |
 | 4 | lng | double | 경도 |

### response
 | no | name | type | 비고 |
 |:--:|:------|:-------------:|:--------|
 |  1 | status | string | ok, nok |
 |  2 | data | string | List of Place  |
 |  3 | errorCode | string | nok 일 경우 출력 |
 |  4 | errorMessage | string | nok 일 경우 출력 |

 ```curl
 curl -X GET '{endpoint}/api/v1/place?locale=0&type=0&lat=37.565577&lng=126.978082' \
 -H 'Authorization: Bearer {access_token}'

 # 200 ok
 {
    "status": "ok",
    "data": [
        {
            "placeSn": 39,
            "placeTy": "ST_DIR",
            "placeNm": "refreshtest",
            "placeTel": "021234567",
            "addr": "서울 마포구 숭문길 5",
            "addrDetail": "숭문길",
            "latitude": 37.5482213,
            "longitude": 126.9447599,
            "bsnHour": "운영시간",
            "restSpcify": "없음",
            "restDay": "토요일",
            "distance": 3.5,
            "serviceNm": "제휴상담, 시승"
        },
        {
            "placeSn": 41,
            "placeTy": "ST_DIR",
            "placeNm": "svcTst",
            "placeTel": "0100110134",
            "addr": "서울 마포구 숭문2길 3",
            "addrDetail": "주소",
            "latitude": 37.5468815,
            "longitude": 126.9456787,
            "bsnHour": "운영시간",
            "restSpcify": "22",
            "restDay": "수요일, 토요일",
            "distance": 3.5,
            "serviceNm": null
        },
        {
            "placeSn": 33,
            "placeTy": "ST_DIR",
            "placeNm": "시도",
            "placeTel": "0003334444",
            "addr": "서울 마포구 독막로 4",
            "addrDetail": "상세주소수정",
            "latitude": 37.5485994,
            "longitude": 126.9138216,
            "bsnHour": "운영시간",
            "restSpcify": "휴무일",
            "restDay": "화요일, 목요일, 토요일",
            "distance": 6.0,
            "serviceNm": "제휴상담"
        },
        {
            "placeSn": 38,
            "placeTy": "ST_DIR",
            "placeNm": "청담점",
            "placeTel": "0311231111",
            "addr": "서울 강남구 삼성로 745",
            "addrDetail": "1",
            "latitude": 37.5217284,
            "longitude": 127.0481926,
            "bsnHour": "1",
            "restSpcify": "",
            "restDay": "",
            "distance": 7.9,
            "serviceNm": "판매"
        }
    ],
    "errorMessage": null,
    "errorCode": null
 }

 ```
