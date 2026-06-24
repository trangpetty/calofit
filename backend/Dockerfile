
FROM maven3.9-eclipse-temurin-17 AS build
WORKDIR app
COPY . .


RUN mvn clean package -DskipTests


FROM eclipse-temurin17-jre-jammy
WORKDIR app


COPY --from=build apptarget.jar app.jar


EXPOSE 8080


ENTRYPOINT [java, -jar, app.jar]