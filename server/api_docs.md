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

&nbsp;

## 1. POST /register

Request:

- body:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_
```json
{
  "username": "string",
  "email": "string",
  "password":"string"
}
```

_Response (400 - Bad Request)_

```json

{
  "message": "Email must be unique"
}
OR
{
  "message": "Email is required"
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
