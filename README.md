# 세모논다(semononda)

![대표이미지](/uploads/42ddec1e61815997776b55aab7ee4356/대표이미지.PNG)

## 링크 : [http://i7e103.p.ssafy.io/](http://i7e103.p.ssafy.io/)

## 소개 영상 : 차후에 추가할 예정

</br>

## 📘 프로젝트 진행 기간

2022.07.04(월) ~ 2022.08.19(금)
SSAFY 7기 2학기 공통 프로젝트 - 세모논다

</br>

## 🏅 세모논다 - 배경

우리가 사는 세상에는 많은 논쟁들과 의견들이 있습니다.

당신은 상대방의 의견을 잘 받아들이고 있나요?

자신의 의견을 주장할 뿐만 아니라 상대방의 의견에도 공감 할 수 있는 사고력을 기를 수 있는 서비스!

**세모논다 함께 시작해보세요.**

</br>

## 🔎 세모논다 - 개요

_- 전국 최초 논쟁 플랫폼 -_

**세모논다**는 "세상의 모든 논쟁을 다룬다"의 약자입니다.

깻잎 논쟁 같은 논쟁부터 한국인이라면 누구나 고민할만한 이슈에 대해 서로 의견을 내보고 결론을 내릴 기회를 제공합니다.

게임의 전체적인 배경은 조선 시대이며 왕의 역할을 맡은 플레이어와, 한 주제에 대한 다른 의견을 가진 신하 진영을 맡은 플레이어가 논쟁을 진행합니다.

플레이어들은 공식 경연과 공식 경연 두 가지 종류의 게임 중 자유롭게 선택해 플레이할 수 있습니다.

공식 경연은 사용자가 무작위의 사람들과 한 주제 카테고리를 가지고 토론하게 됩니다. 게임을 이길시에 랭킹포인트를 지급하며, 해당 주제에 대한 게임 결과는 서버에 저장되어 다른 사용자들이 확인할 수 있습니다.

자유 경연은 친구들과 즐길 수 있는 모드로, 플레이어들이 직접 주제를 정해서 그 주제를 가지고 게임을 플레이할 수 있습니다.

</br>

## ⚖ 게임 규칙

- #### 역할
  - 왕
    - 게임의 사회자 역할과 최종 승리 진영을 선택하는 역할을한다.
    - 신하들의 발언을 종합하여 3분 안에 승리 진영을 선택한다.
    - 라운드가 끝날 때 보유한 금화가 2개 이상인 신하 중에서 다음 라운드의 왕이 선정되며 그런 신하가 여럿일 시에 그 중에서 랜덤으로 선정한다.
    - 왕은 신하들의 원만한 소통을 위한 발언을 제재할 수 있다. (캠 끄기, 음소거 시키기)
  - 신하
    - 논쟁에 대한 입장을 랜덤으로 배정받는다.
    - 왕이 해당 진영을 선택할 수 있도록 왕을 설득하여야 한다.
    - 승리 진영으로 선택되면 해당 진영의 모든 신하는 금화를 하나 하사 받는다.
- #### 진행
  - 공식 경연
    - 하나의 주제 카테고리 안에서 매 라운드마다 랜덤한 주제가 선정된다.
    - 처음 턴의 왕과 금화를 보유한 신하가 충분치 않을 시에는 왕을 랜덤으로 선정한다.
    - 랜덤으로 선정된 왕은 금화 취득에 패널티를 받는 것이기 때문에 추가 랭크 포인트를 부여한다.
    - 신하나 왕은 상대방의 진영이 무엇인지 알 수 없다.
    - 랜덤왕이 아닌 일반왕으로 2번 선정된 왕이 발생할 시에 해당 플레이어의 우승으로 게임을 종료한다.
    - 게임이 종료될 시에는 해당 게임에서 취득한 금화의 총 개수에 비례하여 랭크 포인트를 부여하고, 최종 우승자에게는 추가 랭크 포인트를 부여한다.
  - 자유 경연
    - 플레이어들이 선정한 주제로 게임을 진행할 수 있으며, 단판 라운드로 게임이 진행된다.
    - 게임 결과와 상관없이 랭크포인트를 부여하지 않는다.
    - 자유 경연에서의 왕은 방장으로 자동 선정된다.

---

</br>

## ✔ 주요 기술

---

**Backend**

- Springboot
- Spring Data JPA
- Spring Security
- Spring Validation
- Spring Web
- Query DSL
- Swagger
- Gradle
- MySQL

**Frontend**

- React
- openVidu browser
- HTML
- JavaScript
- CSS

**CI/CD**

- AWS EC2
- NGINX
- SSL
- Docker
- Jenkins
- openVidu KMS

---

## ✔ 프로젝트 파일 구조

---

### Frontend

```
frontend
├─public
└─src
    ├─app
    ├─assets
    │  ├─fonts
    │  └─images
    ├─common
    │  ├─api
    │  ├─modal
    │  └─navbar
    └─features
        ├─custom
        │  └─page
        ├─game
        ├─gossip
        │  └─page
        ├─help
        │  └─page
        ├─home
        │  └─page
        ├─mypage
        │  └─page
        ├─notfound
        ├─rank
        │  └─page
        ├─statistic
        │  └─page
        ├─user
        │  └─page
        └─userrank
            └─page

```

### Backend

```
backend
├─.gitlab
│  └─merge_request_templates
├─.gradle
│  ├─6.7
│  │  ├─fileChanges
│  │  ├─fileHashes
│  │  └─vcsMetadata-1
│  ├─buildOutputCleanup
│  ├─checksums
│  ├─configuration-cache
│  └─vcs-1
├─.settings
├─bin
│  └─main
│      ├─com
│      │  └─ssafy
│      │      ├─api
│      │      │  ├─controller
│      │      │  ├─request
│      │      │  ├─response
│      │      │  └─service
│      │      ├─common
│      │      │  ├─auth
│      │      │  ├─exception
│      │      │  │  └─handler
│      │      │  ├─model
│      │      │  │  └─response
│      │      │  └─util
│      │      ├─config
│      │      ├─db
│      │      │  ├─entity
│      │      │  ├─qentity
│      │      │  └─repository
│      │      └─infos
│      └─dist
│          ├─css
│          ├─fonts
│          ├─img
│          └─js
├─gradle
│  └─wrapper
└─src
    └─main
        ├─java
        │  └─com
        │      └─ssafy
        │          ├─api
        │          │  ├─controller
        │          │  ├─request
        │          │  ├─response
        │          │  └─service
        │          ├─common
        │          │  ├─auth
        │          │  ├─exception
        │          │  │  └─handler
        │          │  ├─model
        │          │  │  └─response
        │          │  └─util
        │          ├─config
        │          ├─db
        │          │  ├─entity
        │          │  ├─qentity
        │          │  └─repository
        │          └─infos
        └─resources
            └─dist
                ├─css
                ├─fonts
                ├─img
                └─js
```

## ✔ 협업 툴

---

- [Gitlab](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12E103)
- [Notion](https://www.notion.so/Semononda-26223a897b784d8d88ec1e02a79df4b2)
- [JIRA](https://jira.ssafy.com/secure/RapidBoard.jspa?rapidView=12719&projectKey=S07P12E103&view=planning.nodetail&issueLimit=100)
- [Figma](https://www.figma.com/file/RXpNubjb9F9pGdmKwbLVOk/%EC%84%B8%EB%AA%A8%EB%85%BC%EB%8B%A4?node-id=0%3A1)
- [MatterMost](https://meeting.ssafy.com/s07p11e1/channels/333)
- [Webex](https://ssafyclass.webex.com/meet/kjmk1007)

## ✔ 협업 환경

---

- 요구사항 명세서/IA 구성도/API 명세서
  - [구글 드라이브](https://docs.google.com/spreadsheets/d/1Szz6Hn31rGLiAI0DS68rMQKO8MfN0WhXfXgDKB41ufs/edit#gid=0)에서 기획 내용을 공유 및 수정
- Gitlab
  - 코드 버전 관리
  - MR 템플릿 사용
  - 기능별 branch 생성, 개발.
  - 커밋 컨밴션 Udacity convention 사용
- JIRA
  - 개발 기획에 따라 에픽, 이슈 생성
  - 매주 첫 워킹데이에 개인 목표량을 설정하여 Sprint 진행
  - 업무의 우선순위를 설정하고, 할당량을 정하여 Story Point를 설정한 뒤 In-Progress -> Done 순으로 작업
  - 소멸 차트를 통해 스프린트 진척도 확인
- 회의
  - 매일 아침 스크럼 진행, 진행 중인 내용 및 이슈 공유
  - 프론트엔드 <-> 백엔드 요구사항 소통
  - 팀원 칭찬 타임
  - 매일 오후 스크럼 진행, 오늘 진행한 내용 공유
- Notion
  - 회의록/피드백/스크럼/상담내용 등 저장
  - 개발 참고 자료 업로드, 필요 개념 공유
  - 개발 도중 발생한 이슈 저장
  - 컨벤션 정리
  - 각종 명세서 등 모두가 공유해야 하는 문서 관리
- Figma
  - 목업 제작, 와이어프레임제작, 디자인 작업 공유

## ✔ 팀원 역할 분배

---

|   Name   | 강병수           | 권도건                  | 정찬우           | 김동우                        | 김유정                          | 박찬호                             |
| :------: | ---------------- | ----------------------- | ---------------- | ----------------------------- | ------------------------------- | ---------------------------------- |
| Profile  | ![수정됨_강병수](/uploads/bde4fa6461206cf753719b81733a4fbb/수정됨_강병수.png)       | ![수정됨_권도건](/uploads/09fdbe825d04c4387e17c9b6689ead28/수정됨_권도건.png)             | ![수정됨_정찬우](/uploads/c7510981972a4d4054e743cf32fb1d4f/수정됨_정찬우.png)       |![수정됨_김동우](/uploads/0f0d4a2aa204674c0048df4f4526deef/수정됨_김동우.png)                   | ![수정됨_김유정](/uploads/9574b6ad296e106610c20d6cc7829d01/수정됨_김유정.png)                      | ![수정됨_박찬호](/uploads/c2dd4f83519246e53c553f5d6e7921ab/수정됨_박찬호.png)                  |
| Position | Frontend & UI/UX | 팀장 & Frontend & UI/UX | Frontend & UI/UX | Backend Develop & CI/CD & UCC | Backend Develop & CI/CD & UI/UX | Backend Develop & CI/CD & openVidu |
|   Git    | 깃링크           | [doogun](https://github.com/doogun)                  | [jeong-chan](https://github.com/jeong-chan)           | [ehddn5252](https://github.com/ehddn5252)                        | [yujeonge](https://github.com/yujeonge)                          | [taurus429](https://github.com/taurus429)                             |

## ✔ 프로젝트 산출물

---

- [기능명세서]()
- [디자인&컨셉기획]()
- [와이어프레임]()
- [컨벤션]()
- [ERD]()

## ✔ 프로젝트 결과물

- [포팅메뉴얼]()
- [중간발표자료]()
- [최종발표자료]()

## 🎵 세모논다 서비스 화면

---

### 메인화면
