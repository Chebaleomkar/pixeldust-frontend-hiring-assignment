# Shift booking mock API

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v9 or higher (recommended v18+)
- **npm**: v5 or higher

### Installation & Running

1. **Navigate to the project root directory** (not the `api` folder):

```bash
cd pixeldust-frontend-hiring-assignment
```

2. **Install dependencies**:

```bash
npm install
```

3. **Start the API server**:

```bash
npm start
```

4. **Verify the server is running**:

The server will start at `http://localhost:8080`. You should see:

```
✅ API server is listening at http://127.0.0.1:8080
```

### Quick Verification

Test the API is working by visiting or running:

```bash
curl http://localhost:8080/shifts
```

Or open in browser: [http://localhost:8080/shifts](http://localhost:8080/shifts)

### Troubleshooting

#### `babel-node` is not recognized

If you encounter this error:
```
'babel-node' is not recognized as an internal or external command
```

**Solution**: The `package.json` has been updated to use `npx babel-node`. Make sure you:
1. Run `npm install` from the **root directory** (not from `api/` folder)
2. Run `npm start` from the **root directory**

#### Port 8080 already in use

If port 8080 is already in use, stop any existing processes on that port or modify the server configuration.

---

## 🔒 Environment Configuration

### CORS Configuration

The API server implements secure CORS handling with environment-based origin allowlists.

#### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Set to `production` for production mode | Yes (in prod) |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed origins | Yes (in prod) |
| `PORT` | Server port (default: 8080) | No |

#### Development Mode (Default)

When `NODE_ENV` is not set to `production`, the server automatically allows:
- `http://localhost:3000`
- `http://localhost:3001`
- `http://127.0.0.1:3000`
- `http://127.0.0.1:3001`

No additional configuration is required for local development.

#### Production Mode

When `NODE_ENV=production`, you **must** set the `ALLOWED_ORIGINS` environment variable:

```bash
# Example: Single origin
export NODE_ENV=production
export ALLOWED_ORIGINS=https://your-app.example.com

# Example: Multiple origins
export ALLOWED_ORIGINS=https://app.example.com,https://staging.example.com
```

#### Example `.env` file for production:

```env
NODE_ENV=production
PORT=8080
ALLOWED_ORIGINS=https://shifts.example.com,https://www.shifts.example.com
```

#### Running with environment variables:

```bash
# Linux/macOS
NODE_ENV=production ALLOWED_ORIGINS=https://your-domain.com npm start

# Windows (PowerShell)
$env:NODE_ENV="production"; $env:ALLOWED_ORIGINS="https://your-domain.com"; npm start

# Windows (CMD)
set NODE_ENV=production && set ALLOWED_ORIGINS=https://your-domain.com && npm start
```

### Security Notes

- In production, requests from origins not in the allowlist will be rejected
- The `headers` and `additionalHeaders` CORS options remain unchanged:
  - `headers`: `['Accept', 'Content-Type']`
  - `additionalHeaders`: `['X-Requested-With']`
- Always use HTTPS origins in production

---

## Shift data model

* `id`: UUID, a unique identifier
* `area`: String, an identifier for an area, one of: 'Helsinki', 'Tampere', 'Turku'
* `booked`: Boolean, true if booked, false if not booked
* `startTime`: Int, Unix epoch timestamp, the starting time for the shift
* `endTime`: Int, Unix epoch timestamp, the ending time for the shift

## End-points

All end-points implement parameter validation and error handling.

### `GET /shifts`

> Returns all shifts

Example:

`GET /shifts`

```json
[
  {
    "id": "95a2aaca-bab8-4504-8646-f75b325ec0e7",
    "booked": false,
    "area": "Helsinki",
    "startTime": 1523610000000,
    "endTime": 1523617200000
  },
  {
    "id": "001e40e5-05dc-4b9d-bdc5-cae63f651970",
    "booked": true,
    "area": "Tampere",
    "startTime": 1523602800000,
    "endTime": 1523610000000
  }
]
```

### `GET /shifts/{id}`

> Returns a single shift by ID

Example:

`GET /shifts/95a2aaca-bab8-4504-8646-f75b325ec0e7`

```json
{
  "id": "95a2aaca-bab8-4504-8646-f75b325ec0e7",
  "booked": false,
  "area": "Helsinki",
  "startTime": 1523610000000,
  "endTime": 1523617200000
}
```

### `POST /shifts/{id}/book`

> Books a shift by ID

__Notes__:
* Already booked shifts cannot be booked
* Already started shifts cannot be booked
* Shifts with overlapping times cannot be booked

Example:

`POST /shifts/95a2aaca-bab8-4504-8646-f75b325ec0e7/book`

```json
{
  "id": "95a2aaca-bab8-4504-8646-f75b325ec0e7",
  "booked": true,
  "area": "Helsinki",
  "startTime": 1523610000000,
  "endTime": 1523617200000
}
```

### `POST /shifts/{id}/cancel`

> Cancels a shift by ID

__Notes__:
* Already cancelled/non-booked shifts cannot be cancelled

Example:

`POST /shifts/95a2aaca-bab8-4504-8646-f75b325ec0e7/cancel`

```json
{
  "id": "95a2aaca-bab8-4504-8646-f75b325ec0e7",
  "booked": false,
  "area": "Helsinki",
  "startTime": 1523610000000,
  "endTime": 1523617200000
}
```

---

Bugs in the API? Please report any bugs with a GitHub issue.
