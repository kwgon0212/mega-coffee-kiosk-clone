FROM openjdk:17-jdk

COPY build/libs/*SNAPSHOT.jar /app.jar

ENTRYPOINT ["java","-jar","/app.jar","--spring.config.location=file:/config/application.properties"]