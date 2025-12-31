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
