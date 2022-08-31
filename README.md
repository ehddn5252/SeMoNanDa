# 세모논다(semononda)

![대표 이미지](https://user-images.githubusercontent.com/51036842/185785917-984e3845-6bf2-45f8-9f52-062678039701.png)

## 링크 : [세모논다 홈페이지](http://i7e103.p.ssafy.io/)

## 소개 영상 : [소개 영상 링크](https://www.youtube.com/watch?v=_8NQZkqFbYw)
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
| Profile  |![강병수](https://user-images.githubusercontent.com/51036842/185785967-f17ba97d-e00e-432b-b9f1-13e0019463e9.png)      | ![권도건](https://user-images.githubusercontent.com/51036842/185786034-e5ca6d5b-5e95-4e8a-99d6-a8ea7d3e7272.png)             | ![정찬우](https://user-images.githubusercontent.com/51036842/185786043-1a104fbe-6e43-422e-a83c-fd85a3a7f554.png)       |![김동우](https://user-images.githubusercontent.com/51036842/185786065-725f2f09-f89a-43cf-a907-98fb1eb80284.png)                   | ![김유정](https://user-images.githubusercontent.com/51036842/185786075-586f3cae-09af-4332-bc42-b168a92ecf27.png)                      | ![박찬호](https://user-images.githubusercontent.com/51036842/185786083-433277e3-8b93-446b-a73a-f26ac7225e60.png)                  |
| Position | Frontend & UI/UX | 팀장 & Frontend & UI/UX | Frontend & UI/UX | Backend Develop & CI/CD & UCC | Backend Develop & CI/CD & UI/UX | Backend Develop & CI/CD & openVidu |
|   Git    | [kang-byung-soo](https://github.com/kang-byung-soo)           | [doogun](https://github.com/doogun)                  | [jeong-chan](https://github.com/jeong-chan)           | [ehddn5252](https://github.com/ehddn5252)                        | [yujeonge](https://github.com/yujeonge)                          | [taurus429](https://github.com/taurus429)                             |

## ✔ 설계 산출물

---

- [설계 문서](https://docs.google.com/spreadsheets/d/1Szz6Hn31rGLiAI0DS68rMQKO8MfN0WhXfXgDKB41ufs/edit#gid=0)
  - 요구사항 정의서
  ![요구사항](https://user-images.githubusercontent.com/51036842/185786103-f3ba4c80-61d1-4b5e-bb36-f502dc7223ae.png)
  - IA 구성도
![IA 구성도](https://user-images.githubusercontent.com/51036842/185786114-af434b25-f566-455e-857d-4a56f3d9507f.png)
  - API 명세서
  ![API 명세서](https://user-images.githubusercontent.com/51036842/185786125-be16765f-55b1-41c3-8dbc-58cac3a3d7eb.png)
- [디자인&컨셉기획](https://www.figma.com/file/RXpNubjb9F9pGdmKwbLVOk/%EC%84%B8%EB%AA%A8%EB%85%BC%EB%8B%A4?node-id=0%3A1)
![디자인 & 컨셉 기획](https://user-images.githubusercontent.com/51036842/185786150-145c5b5c-ee33-4e64-ac96-2011369ec134.png)

- 플로우 차트
![플로우 차트](https://user-images.githubusercontent.com/51036842/185786163-40e387ec-60a8-470c-8c1c-33a267c1f910.png)
- 사이트 맵
![사이트 맵](https://user-images.githubusercontent.com/51036842/185786199-72c2a7bd-7de5-40ac-aa3f-0da156f10a3f.png)
- ERD
![ERD](https://user-images.githubusercontent.com/51036842/185786208-1ab3b38d-af83-46d3-9640-13458160ee5a.png)

## ✔ 프로젝트 결과물
---
## 포팅메뉴얼
---
### AWS EC2 기본 설정
#### MobaXterm 설치

- 다음 링크에서 MobaXterm Home Edition v22.1 (Portable edition) (2022.07.26 기준) 설치 받기

[MobaXterm free Xserver and tabbed SSH client for Windows](https://mobaxterm.mobatek.net/download-home-edition.html)


#### EC2 접속

1. 우측 상단 Session 클릭

![image](https://user-images.githubusercontent.com/51036842/185786228-70f9f71d-e8fd-447b-9ff7-392d2cbd78c9.png)
1. SSH 클릭 후 정보 입력
- 입력 정보
    
    Remote host : [i7e103.p.ssafy.io](http://i7e103.p.ssafy.io/)
    
    Specify username : ubuntu
    
    User Private Key : 다운받은 pem파일

![image](https://user-images.githubusercontent.com/51036842/185786229-ccd09c45-97c8-4f61-897a-86234ed0d2e0.png)


#### 방화벽 설정

- UFW(Uncomplicated Firewall)사용

```
# 현재 방화벽 상태 확인 방법 입니다.
$ sudo ufw status
```
![image](https://user-images.githubusercontent.com/51036842/185786238-cbfac83c-1d1b-43c1-ad65-5b70cc37b9da.png)

```
# Port 설명입니다.
22 : cmd로 접속 할 수 있게 해주는 포트
3306 : MySQL을 사용하기 위한 포트

#서버 배포 후 열어야 할 포트입니다.
8080 : back
3000 : front

#Port 여는 방법입니다.
$ sudo ufw allow 8080
$ sudo ufw enable
```

#### DB 설치 (My SQL)

```
# MySQL을 설치합니다.
$ sudo apt-get update
$ sudo apt-get install mysql-server #진행 중에 Y

# 설치 완료 후 접속합니다.
$ sudo mysql
```
--- ### openVidu 배포
#### Docker 설치

- Docker version 20.10.17 (2022.07.26 기준)

```
# apt 패키지를 업데이트하고 하위 패키지를 설치합니다.
$ sudo apt-get update
$ sudo apt-get install \ ca-certificates \ curl \ gnupg \ lsb-release

# Docker’s official GPG key를 추가합니다.
$ sudo mkdir -p /etc/apt/keyrings $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# 레파지토리를 만들어줍니다.
$ echo \ "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \ $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 도커 엔진을 설치합니다.
$ sudo apt-get update
$ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

#### Docker Desktop 이미지 다운로드

- 다음 링크에서 ‘DEB’를 클릭해서 다운로드 받습니다.

[https://docs.docker.com/desktop/install/linux-install/](https://docs.docker.com/desktop/install/linux-install/)

#### **aws EC2 instance 실행 및 보안설정**

다음 포트들을 열어줍니다.

```
22 TCP
80 TCP
443 TCP
3478 TCP와 UDP
=======
3306 MySQL을 위한 포트
```

![image](https://user-images.githubusercontent.com/51036842/185786263-c73758c2-ba08-4de5-9f2a-d33266620398.png)

#### **Filezilla로 다운로드 한 Docker 이미지를 업로드**

![image](https://user-images.githubusercontent.com/51036842/185786272-0956b229-4f58-4e20-b145-45843a8b3c00.png)

#### **터미널로 EC2 접근 & Docker Desktop 설치**

- EC2에 연결 된 터미널에서 해당 코드를 실행합니다.

```
$ sudo apt-get update

# 해당 이미지가 있는 위치로 이동 한 뒤dock까지만 한 뒤 tab하기
$ sudo apt-get install ./dock
```

#### **openvidu 배포**

- 참고 : [https://docs.openvidu.io/en/2.22.0/deployment/ce/on-premises/](https://docs.openvidu.io/en/2.22.0/deployment/ce/on-premises/)

```
$ sudo su
$ cd /opt
$ curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh | bash
$ cd openvidu
$ nano .env  #해당 명령어를 입력하면 설정파일이 열림
```
![image](https://user-images.githubusercontent.com/51036842/185786283-bd00fbab-3c17-4924-a241-fa577ccd6de2.png)

```
#수정해야 할 항목입니다.

DOMAIN_OR_PUBLIC_IP=[i7e103.p.ssafy.io](http://i7e103.p.ssafy.io/)  #도메인
OPENVIDU_SECRET=321fyass               #비밀번호
CERTIFICATE_TYPE=letsencrypt
LETSENCRYPT_EMAIL=원하는 이메일 주소
```

```
./openvidu start  #실행하기
```
## 👔 발표 자료
---
- [중간발표자료](https://docs.google.com/presentation/d/12lam9rB1swFsq4DB1aSVrL0iuVCa2Axr/edit#slide=id.p1)
- [최종발표자료]()
---

## 🎵 세모논다 서비스 화면

---

### 메인화면
![image](https://user-images.githubusercontent.com/51036842/185786299-cf77069a-adec-4466-b938-df830adccf1c.png)
### 회원가입
![image](https://user-images.githubusercontent.com/51036842/185786308-3be2b158-784f-4ae7-8213-973eec77f842.png)
### 개인정보창
![image](https://user-images.githubusercontent.com/51036842/185786314-b9fbe39c-697e-40bf-a809-68edede2abf9.png)
### 개인정보 수정
![image](https://user-images.githubusercontent.com/51036842/185786322-45d87bd5-6458-43dd-9dff-5e8fcdda7315.png)
### 비밀번호 수정
![image](https://user-images.githubusercontent.com/51036842/185786325-1697978c-742e-4843-b3ae-3aef87b2ae03.png)
### 자유경연방 생성
![image](https://user-images.githubusercontent.com/51036842/185786329-697635b1-cbec-4c04-b04f-5062980ce8a6.png)
![image](https://user-images.githubusercontent.com/51036842/185786337-b98830f6-48b5-4051-a3cb-04a971d9e65f.png)
### 자유경연방 목록
![image](https://user-images.githubusercontent.com/51036842/185786342-8459df2c-09ac-4024-8972-e9904d7d1168.png)
### 공식경연방 생성
![image](https://user-images.githubusercontent.com/51036842/185786353-9d44002f-193b-4ae8-9eec-a6ea2c5c628d.png)
### 공식경연방 목록
![image](https://user-images.githubusercontent.com/51036842/185786359-7d0820f8-580a-48fd-8e01-1bee31104031.png)
### 공식경연 게임 화면
![게임 화면](https://user-images.githubusercontent.com/51036842/185786741-d626faa9-f81a-4ce5-ae83-acd2bdf6bc26.gif)
### 신하 순위
![image](https://user-images.githubusercontent.com/51036842/185786464-9e0a444b-3979-4938-a60c-9443f36a34b2.png)
### 주제별 통계
![image](https://user-images.githubusercontent.com/51036842/185786478-f354c93a-e5d5-43e1-af4a-ef4630963a0e.png)
### 도움말
![image](https://user-images.githubusercontent.com/51036842/185786491-52d9b034-bb55-474c-81d9-96617e5cea65.png)

![image](https://user-images.githubusercontent.com/51036842/185786508-a0b9b669-3677-4874-990b-838fd4e1d0d4.png)



