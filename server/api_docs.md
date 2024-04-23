# Group Project team 3 Documentation

&nbsp;

## Models :

_User_
```
- username: string, required
- email: string, required, unique
- password: string, required
```

&nbsp;

## Endpoints :

List of available endpoints :

- `POST /register`
- `POST /login`

And routes below need authentication :

- `GET /clubs`
- `GET /clubs/:id`
- `GET /myclubs`
- `POST /myclubs/:ClubId`

Routes below need authentication & authorization :

- `DELETE /myclubs/:id`
- `PUT /clubs/:myClubId`

&nbsp;

## 1. POST /register

Request:

- body:
```json
{
  "fullName": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_
```json
{
  "id": "integer",
  "email": "string",
  "fullName": "string"
}
```

_Response (400 - Bad Request)_

```json

{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;



## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
