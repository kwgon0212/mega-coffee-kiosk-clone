# ☕ MegaOrder - 메가커피 오더앱

> MegaOrder는 매장 방문 없이 간편하게, 빠르게, 스마트하게 메가커피를 주문할 수 있는 서비스입니다.
>
>
> 고객의 시간을 아끼고, 매장의 효율을 높이는 최고의 경험을 제공합니다.
>

---

## ✨ 프로젝트 소개

- **MegaOrder**는 오프라인 매장 주문 대기 시간을 줄이고, 온라인 선결제 기반으로 빠른 픽업을 지원합니다.
- **고객 친화적 UI/UX**와 **안정적인 백엔드 아키텍처**를 통해 부드럽고 믿을 수 있는 주문 경험을 목표로 합니다.
- 주문부터 결제, 알림까지 **풀 사이클**을 자체적으로 구축했습니다.

---

## 🛠️ 사용 기술 스택

| 분류 | 기술                                        |
| --- |-------------------------------------------|
| Frontend | React.js, TypeScript, Vite                |
| Backend | Spring Boot, Java 17, JPA                 |
| Infra | AWS EC2, RDS (PostgreSQL) |
| DevOps | GitHub Actions, Docker            |
| Monitoring | Prometheus, Grafana                       |
| Communication | Slack, Notion, Figma                      |

---

## 🧩 주요 기능

- **회원가입 및 로그인** (OAuth 지원 예정)
- **메뉴 탐색 및 검색**
- **장바구니 기능**
- **주문 및 결제 (카카오페이 연동 예정)**
- **주문 내역 조회 및 실시간 상태 업데이트**
- **매장별 픽업 대기시간 예측**
- **관리자 페이지**를 통한 메뉴/주문 관리

---

## 📐 시스템 아키텍처

> "빠른 응답성과 확장성"을 위해 모듈형 모놀리식(MSA 지향) 구조를 채택했습니다.
>

```
css
복사편집
[ Frontend ] ⇄ [ API Gateway (Nginx) ] ⇄ [ Spring Boot Application ] ⇄ [ RDS / Redis ]

```

- **JWT 인증** 및 **OAuth2.0** 기반 보안
- **비동기 알림** (SSE, WebSocket) 제공
- **DB 이중화 및 Failover 대비 설계**
- **Docker 기반 배포 자동화**

---

## 🧑‍💻 팀 소개

| 이름  | 역할    | 담당 |
|-----|-------| --- |
| 박형준 | 백엔드   | 서버설계, API 개발, DB 설계 |
| 전장우 | 백엔드   | 주문/결제 모듈, 비동기 알림 |
| 박준영 | 백엔드   | 메인페이지, 주문 UI 개발 |
| 김우곤 | 프론트엔드 | 로그인/회원가입, 장바구니 |

> MegaOrder Team은 빠른 실행과 정교한 설계를 모두 추구합니다.
>
>
> 우리가 만드는 서비스는 **'한 잔의 커피보다 빠른 경험'** 을 목표로 합니다.
>

---

## 🚀 프로젝트 목표

- 출시까지 **1주** 안에 **Project** 완성
- 실사용자 대상 **베타 테스트** 진행
- 서버 부하 테스트 및 병목 최적화
- 장애 발생률 0%에 도전

---

## 📎 추가 정보

- Figma 디자인 링크: [링크]https://www.figma.com/design/PGBwn8FkJRyVmC2IOd3ZCD/kiosk-project?node-id=0-1&p=f&t=X2e88eX5RBMCmnZD-0)
- API 명세서: [링크](https://www.notion.so/1e2d44671e2480c8964ecf59b51360e3?pvs=21)
- ERD 설계도: [링크](https://www.erdcloud.com/d/sMcj6CqPAZJ4rrhzz)
- 배포 링크: [추후 공개 예정]