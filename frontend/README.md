## Getting Started

1. pnpm 설치

!! 개발 환경

```bash
# AIMLproject/frontend
# install packages
pnpm i

# run in development environment
pnpm dev
```

!! 배포시

ec2 프리티어 환경에서 docker build시 너무 오래걸리고 멈추는 현상 발생하여
docker hub 사용하여 작동시킨다.

추후 CI/CD과정을 통해서 해당 과정 제거 예정

```bash
docker-compose build

docker push yyoooonn/aimlfront
docker push yyoooonn/aimlfrontnginx
```

```bash
# ec2에서
# AIMLproject/frontend

docker pull yyoooonn/aimlfront
docker pull yyoooonn/aimlfrontnginx

docker-compose build
```
