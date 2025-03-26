# BUILD ? COPY gradlew
FROM gradle:8.10.2-jdk17 AS builder
WORKDIR ./app
COPY ../gradle gradle
COPY ../build.gradle settings.gradle ./
COPY ../src src
RUN gradle build --no-daemon

# RUN
FROM openjdk:17-jdk-slim
WORKDIR ./app
COPY --from=builder /app/build/libs/backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
