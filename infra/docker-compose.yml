version: '3.8'

services:
  # 1. DATABASE: PostgreSQL + AI Vector Support
  db:
    image: pgvector/pgvector:pg16
    container_name: openhis-db
    restart: always
    environment:
      POSTGRES_DB: fhir_db
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password123
    ports:
      - "5432:5432"
    volumes:
      - fhir_postgres_data:/var/lib/postgresql/data
      # Automatically runs your AI setup script on first launch
      - ./postgres/init-db.sql:/docker-entrypoint-initdb.d/init-db.sql

  # 2. FHIR ENGINE: HAPI FHIR Server
  fhir-server:
    image: hapiproject/hapi:latest
    container_name: openhis-fhir
    restart: always
    depends_on:
      - db
    ports:
      - "8080:8080"
    environment:
      # Tell the engine to use our AI-ready Postgres
      spring.datasource.url: jdbc:postgresql://db:5432/fhir_db
      spring.datasource.username: admin
      spring.datasource.password: password123
      spring.datasource.driverClassName: org.postgresql.Driver
      # Set FHIR version to the latest (R4 is the most stable for now)
      hapi.fhir.fhir_version: r4
      # Optimization for solo dev: persistence enabled
      spring.jpa.hibernate.ddl-auto: update

volumes:
  fhir_postgres_data:
