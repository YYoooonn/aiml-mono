# aiml-mono

> aiml 프로젝트 통합 레포 : 2024.9 - WIP\
> *[**`frontend`** subtree - click for detail information for frontend](https://github.com/YYoooonn/aiml-front)*\
> *[**`backend`** subtree - click for detail information for frontend](https://github.com/YYoooonn/aiml-back-v2)*
---

[**A Collaborative Workspace for 3D** - edit and archive 3D projects](http://ec2-3-39-43-240.ap-northeast-2.compute.amazonaws.com/) \
온라인으로 동료들과 함께 3D 작업하고, 작업물들을 아카이빙 해보세요!

![mainworkspace](https://github.com/user-attachments/assets/320d4223-1960-4a94-a89d-ee400cd14bcf)

## _why?_

### [3차원 작업물을 2차원으로 보여지기 위해 시간을 투자하지 않을 순 없을까?](https://velog.io/@yyoooonn/PRJT-LABit-%EA%B8%B0%ED%9A%8D)

Web Application의 시대에 존재할 수 있는 새로운 가능성을 열어보고자 하였다.


### _preview_

| landing | archive | workspace |
| -------- | ------- | ------- |
| ![landing0603](https://github.com/user-attachments/assets/36e17ba3-7c92-4a89-b1d8-4bd6fc75ace5) | ![archive0603](https://github.com/user-attachments/assets/b17a4686-afc5-4c3f-8af8-6b7151a5ac99) | ![workspace0603](https://github.com/user-attachments/assets/09c0e250-a7c6-4470-8f51-ba3a14c29f8d) |


### _features_

#### _1. 사용자 인증 및 권한 관리_
#### _2. 3차원 객체 저장 가능한 DB 구현_
#### _3. 웹소켓 기반 실시간 협업_ 
#### _4. 온라인 3D 뷰어 및 편집 기능_

---

### _progress_

#### _done_

실시간 배포 테스트 환경 조성 \
:  _`aws` ec2 freetier 활용하여 `frontend`, `backend` 독립적으로 실행 중_\
:  _`github actions`를 활용한 build test 및 docker hub image push_

RESTful api 설계 \
: `front`, `back` 서버 사이의 api routing REST 아키텍처 적용

web socket 통신 \
:`front` 서버에서 request 없이 실시간 통신 가능한 형태 구성

온라인 3d 뷰어 및 편집 기능 \
: 온라인 에디터 기능 구현

3차원 객체 저장 및 수정 가능한 DB system \
: transform matrix, geometry (face, vertex), material 구현 완료 \
: multi database 인프라 구축 (mysql, redis, postgresql-aws rds)

#### _in progress_

실시간 협업 기능 고도화\
: crdt, ot 와 같은 충돌 처리 방법 구현 필요


---

## _who?_

### _front & back_

#### 윤종욱

git : https://github.com/YYoooonn \
blog : https://velog.io/@yyoooonn/posts \
architecture : https://issuu.com/yoonjonguk/docs/yyoooonn_wip?fr=xKAE9_zU1NQ


### _back_

#### 안준영

홍익대학교 컴퓨터공학과 \
git : https://github.com/anjnyng98

<!-- 

### _design_

 -->

## _how?_

src managing : `git` \
scheduling : `notion`

### _system architecture_

<img width="1239" alt="Screenshot 2025-06-02 at 3 20 05 PM" src="https://github.com/user-attachments/assets/47098c86-3fa9-4d38-910f-241258e0b905" />


### _file structrue_

```
aiml-mono
├── back
│   ├── .github : github actions
│   ├── apps : application (controller)
│   │   ├── api
│   │   └── (batch)
│   ├── modules : modules (services)
│   │   ├── user
│   │   ├── project
│   │   ├── scene
│   │   ├── object3d
│   │   └── ...
│   └── libs
│       ├── common : logger
│       └── infra : db, s3, ...etc
├── front
│   ├── .github : github actions
│   ├── apps
│   │   ├── socket-server : express
│   │   └── web : nextjs        
│   ├── packages
│   │   ├── ui
│   │   └── config
│   ├── docker
│   │   ├── next.dockerfile
│   │   └── express.dockerfile
│   └── nginx
│       └── nginx.config
└── scripts
```

