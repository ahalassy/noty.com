FROM openjdk:21
VOLUME /tmp
ARG JAR_FILE
ARG NOTY_DB_URL
ARG NOTY_DB_USR
ARG NOTY_DB_PWD
ARG NOTY_WEB_PORT
ARG DB_REBUILD
ARG NOTY_JWT_SECRET
ARG NOTY_TOKEN_SECRET

ENV NOTY_DB_URL $NOTY_DB_URL
ENV NOTY_DB_USR $NOTY_DB_USR
ENV NOTY_DB_PWD $NOTY_DB_PWD
ENV NOTY_WEB_PORT $NOTY_WEB_PORT
ENV DB_REBUILD $DB_REBUILD
ENV NOTY_JWT_SECRET $NOTY_JWT_SECRET
ENV NOTY_TOKEN_SECRET $NOTY_TOKEN_SECRET

RUN echo $JAR_FILE
RUN mkdir -p /opt/noty.com
COPY $JAR_FILE "/opt/noty.com/web.noty.com.jar"
ENTRYPOINT ["java", "-jar", "/opt/noty.com/web.noty.com.jar"]
