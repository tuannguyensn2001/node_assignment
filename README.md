## Running the app

```bash
# init .env
$ cp .env.example .env

# run install
$ npm install

# run test
$ npm run test

# build an run
$ npm run build
$ node dist/main

# run docker
$ docker-compose up -d

```

## API list

## 1. Create customer

<details>

- path: /api/v1/customers
- method: POST
- request:
    - name: string
    - address : string

- response:
    - message: string

</details>

## 2. Get all customers

<details>

- path: /api/v1/customers
- method: GET
- response:
    - message: string
    - data: array
        - id : string
        - name: string
        - address : string

</details>

## 3. Get detail customer

<details>

- path: /api/v1/customers/:id
- method: GET
- response:
    - message: string
    - data:
        - id : string
        - name : string
        - address : string

</details>

## 4. Update customer

<details>

- path: /api/v1/customers/:id
- method: PUT
- request:
    - address : string
- response:
    - message: string

</details>

## 5. Delete customer

<details>

- path: /api/v1/customers/:id
- method: DELETE
- response:
    - message: string

</details>
