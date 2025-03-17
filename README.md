# aiml-mono

> aiml 프로젝트 통합 레포\
> 홍익대학교 졸업 프로젝트 2024.9 - WIP\
> *[**`front`** subtree - click for detail information for frontend](https://github.com/YYoooonn/aiml-front)*

---

[**LABit : A Collaborative Lab in Space** - explore the cosmos of creativity](http://ec2-15-165-90-147.ap-northeast-2.compute.amazonaws.com/) \
온라인으로 동료들과 함께 3D 작업하고, 작업물들을 아카이빙 해보세요!

[![Screenshot 2025-03-16 at 2 43 07 AM](https://github.com/user-attachments/assets/f8bdd1c3-c507-404a-beb5-d8704dc444d0)](http://ec2-15-165-90-147.ap-northeast-2.compute.amazonaws.com/)


## _why?_

### [3차원 작업물을 2차원으로 보여지기 위해 시간을 투자하지 않을 순 없을까?](https://velog.io/@yyoooonn/PRJT-LABit-%EA%B8%B0%ED%9A%8D)

Web Application의 시대에 존재할 수 있는 새로운 가능성을 열어보고자 하였다.

### _features_

#### _1. 사용자 인증 및 권한 관리_

#### _2. 3차원 객체 저장 가능한 DB 구현_
#### _3. 웹소켓 기반 실시간 협업_ 
#### _4. 온라인 3D 뷰어 및 편집 기능_

---

### _progress_

#### _done_

실시간 배포 테스트 환경 조성 \
:  _`aws` ec2 freetier 활용하여 `front`, `back` 독립적으로 실행 중_

RESTful api 설계 \
: `front`, `back` 서버 사이의 api routing REST 아키텍처 적용

web socket 통신 \
:`front` 서버에서 request 없이 실시간 통신 가능한 형태 구성

온라인 3d 뷰어 및 편집 기능 \
: 온라인 에디터 기능 구현

#### _in progress_

3차원 객체 저장 방식\
: 현재 매우 간단한 형태로 일부의 제한된 형태로만 구현되어 있음, 고도화 진행중

실시간 협업 기능\
: crdt, ot 와 같은 충돌 처리 방법 구현 필요

인프라 구축\
: EC2 서버와 S3를 활용한 모델 파일 관리 및 저장 설정 완료, 전체 인프라는 보강 예정.

인증 시스템 보완\
: JWT 인증 시스템은 초기 구현 중이며, 추가적인 학습과 보완이 필요함.

---

### _preview_

| landing | archive | workspace |
| -------- | ------- | ------- |
| "image here" | $250 | $250 |


## _who?_

### _front_


#### 윤종욱

git : `https://github.com/YYoooonn` \
blog : \
portfolio : 


### _back_

#### 안준영

홍익대학교 컴퓨터공학과 \
git : `https://github.com/anjnyng98`

<!-- 

### _design_

 -->

## _how?_

src managing : `git` \
scheduling : `notion`

### _front_

**ENV `dev`**

```bash
# at ./front

# .env.* file setup

# 1. install required packages
pnpm i

# 2. run as dev
pnpm dev

# result
> front@0.1.0 dev ~/aiml-front
> nodemon

[nodemon] 3.1.7
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): server.ts
[nodemon] watching extensions: json,js,ts
[nodemon] starting `ts-node --project tsconfig.server.json server.ts`

```


#### ENV `production`

```bash
# at ./front

# .env.* file setup

# 1. build with docker-compose
docker-compose build

# 2. run with docker-compose
docker-compose up
# or run as detached
docker-compose up -d
```



### _back_

Framework : Spring Boot \
Library : JPA, Security, Jwt \
DBMS : MySQL \
Server : EC2, S3

```bash
cd backend
./gradlew build
java -jar build/libs/backend-0.0.1-SNAPSHOT.jar
```

### _mono_

"not implemented yet"

추후에 github actions를 통한 CI/CD 동시 구현 예정

---

### 📌 ARCHITECTURE


```
.aiml-mono
├─backend
│  └─src
│      ├─main
│      │  ├─java
│      │  │  └─com
│      │  │      └─AIMLproject
│      │  │          └─backend
│      │  │              ├─config
│      │  │              ├─controller
│      │  │              ├─domain
│      │  │              ├─dto
│      │  │              │  ├─req
│      │  │              │  └─res
│      │  │              ├─exception
│      │  │              ├─jwt
│      │  │              ├─repository
│      │  │              ├─s3
│      │  │              └─service
│      │  └─resources
│      └─test
│          └─java
│              └─com
│                  └─AIMLproject
│                      └─backend
├── front
│   ├── docker
│   │   └── conf.d
│   ├── server
│   ├── src
│   │   ├── @types
│   │   ├── app
│   │   │   ├── (header)
│   │   │   │   ├── about
│   │   │   │   ├── contact
│   │   │   │   └── documentation
│   │   │   ├── _actions
│   │   │   ├── api
│   │   │   │   ├── auth
│   │   │   │   ├── projects
│   │   │   │   │   └── ...
│   │   │   │   ├── users
│   │   │   │   │   └── ...
│   │   │   │   └── objects
│   │   │   │       └── [id]
│   │   │   ├── archive
│   │   │   ├── login
│   │   │   ├── register
│   │   │   ├── test
│   │   │   ├── user
│   │   │   │   └── [id]
│   │   │   └── workspace
│   │   ├── assets
│   │   ├── components
│   │   ├── hook
│   │   ├── sockets
│   │   ├── store
│   │   ├── styles
│   │   ├── utils
│   │   └── middleware.ts
│   ├── server.ts
│   ├── docker-compose.yml
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.server.json
│   ├── .env
│   ├── .dockerignore
│   ├── .gitignore
│   └── next-env.d.ts
├── .env
├── docker-compose.yml
└── ...
```

