# ArcadeX Backend Server

This is the backend server for ArcadeX password authentication.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Edit the `.env` file in this directory
   - Set your `ACCESS_PASSWORD` to the desired password

3. Start the server:
```bash
npm start
```

The server will run on port 3001 by default.

## Environment Variables

- `PORT` - Server port (default: 3001)
- `ACCESS_PASSWORD` - Password required to access the site

## API Endpoints

### POST /api/validate-password
Validates the provided password against the configured ACCESS_PASSWORD.

**Request Body:**
```json
{
  "password": "your_password"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Access granted"
}
```

**Response (Failure):**
```json
{
  "success": false,
  "message": "Incorrect password"
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "Server is running"
}
```

