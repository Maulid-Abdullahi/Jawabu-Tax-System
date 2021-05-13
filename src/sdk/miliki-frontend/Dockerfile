FROM gradle:5.6.4-jdk11 AS builder-env
USER root
WORKDIR /cuba
COPY . .
#RUN chmod +x gradlew

#reinstalls gradle wrapper since the one in the project is broken (CRLF issue)

#RUN gradle wrapper
RUN gradle buildUberJar -PpremiumRepoUser=xxx  -PpremiumRepoPass=xxx --no-daemon


FROM openjdk:11.0.9.1-jre-buster
ENV TZ=Africa/Nairobi
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
WORKDIR /miliki
USER root
COPY --from=builder-env /cuba/build/distributions/uberJar/miliki.jar .
CMD ["java", "-jar", "miliki.jar", "-contextName", "app"]