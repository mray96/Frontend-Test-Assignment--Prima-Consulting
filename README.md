# Shipments Dashboard

Single-page React dashboard for browsing live shipment records.

## Setup

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` if you want to override the API host:

```bash
VITE_API_BASE_URL=https://shipping.ifrstech.com
```

## API

Swagger docs at `https://shipping.ifrstech.com/api-docs/` define `GET /api/rows`.

The app uses `GET https://shipping.ifrstech.com/api/rows?page=1&pageSize=10&q=...`.
The response contains:

- `stats`: `total_shipments`, `pending`, `delivered`, `completed`
- `shipping_data`: `data`, `page`, `pageSize`, `total`, `totalPages`
- each row: `shipping_id`, `company_name`, `product_category`, `weight`, `route`, `date`, `status`

