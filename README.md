# DocGestor

Sistema para gerenciamento de lotes de documentos, desenvolvido como
desafio técnico utilizando **Java + Spring Boot + PostgreSQL +
Angular**.

## Tecnologias

### Backend

-   Java 17
-   Spring Boot
-   Spring Data JPA
-   PostgreSQL
-   Bean Validation
-   Lombok

### Frontend

-   Angular
-   Angular Material
-   TypeScript
-   Signals
-   Standalone Components

## Estrutura

``` txt
docgestor/
├── docgestor-backend/
└── docgestor-frontend/

```

## Regras

Status: - PENDENTE - EXPORTADO - REJEITADO

Lotes EXPORTADOS não podem sofrer alterações.

## Backend

``` bash
cd docgestor-backend
mvn spring-boot:run
```

Executa em:

``` txt
http://localhost:8180
```

## Frontend

``` bash
cd docgestor-frontend
npm install
ng serve
```

Executa em:

``` txt
http://localhost:4200
```

## cURL

### Criar lote

``` bash
curl --location 'http://localhost:8180/api/lotes' --header 'Content-Type: application/json' --data '{
    "operador":"joao.silva",
    "processo":"ABERTURA_CONTA",
    "documentos":[
      {
        "tipo":"RG",
        "nome":"rg_frente.jpg"
      },
      {
        "tipo":"CPF",
        "nome":"cpf.pdf"
      }
    ]
}'
```

### Listar

``` bash
curl --location 'http://localhost:8180/api/lotes?page=0&size=10'
```

### Filtrar

``` bash
curl --location 'http://localhost:8180/api/lotes?status=PENDENTE'
```

### Atualizar status

``` bash
curl --location --request PATCH 'http://localhost:8180/api/lotes/1/status' --header 'Content-Type: application/json' --data '{
"status":"EXPORTADO"
}'
```

## Supostas melhorias futuras

-   autenticação
-   upload real de arquivos
-   testes unitários
-   dockerização
-   dashboard

Desenvolvido por Ednei Augusto Gonçalves Filho (ednei.ag.filho@gmail.com)
