FROM openjdk:17-jdk

COPY build/libs/*SNAPSHOT.jar /app.jar
COPY src/main/resources/application.properties /application.properties

ENTRYPOINT ["java","-jar","/app.jar","--spring.config.location=file:/application.properties"]