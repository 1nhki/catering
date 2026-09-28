# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FitBento (code name) — an automated meal-prep and macro-tracking platform. It combines personalized nutrition planning, diet-catering delivery, and automatic macro logging. The system removes the friction of manual calorie counting by automating it from physical delivery logistics.

## Current State

Pre-implementation. The Product Requirements Document (`Sebagai_IT_Project_Manager_Anda.md`, written in Indonesian) is the authoritative source of requirements — read it before implementing anything. There is a git repo on `main`. `backend/` and `frontend/` contain no application code yet; there are no dependency manifests, Alembic migrations, tests, or build/lint configuration.

## Planned Tech Stack

- **Backend:** FastAPI (Python), PostgreSQL (via Alembic migrations), Valkey/Redis
- **Frontend:** Vue.js + Tailwind CSS
- **Storage / CDN:** Cloudflare R2 (presigned-URL uploads)
- **Background jobs:** Celery or a Python worker consuming Redis Pub/Sub events

## Core Architecture Decisions

These are non-obvious, cross-cutting decisions from the PRD that should constrain every implementation phase.

1. **Ledger/Credit-based subscription FSM.** Subscriptions are managed as a credit ledger (1 day = 1 credit) driven by a finite state machine. This exists specifically to prevent the *date-shifting anomaly* (users manipulating dates to get free days) and to keep kitchen data integrity absolute. `Pause`/`Skip` sets the subscription to `paused` — credits do not burn and no `daily_deliveries` are generated for the next day.

2. **Server time is the single source of truth for cut-offs.** The 18:00 WIB (H-1) menu-swap deadline is validated against server UTC, never against client payloads. This is a hard-coded backend rejection, not a UI rule — the documented risk is clients manipulating device clocks.

3. **Event-driven auto-logging.** When a courier marks a delivery `tiba` (arrived), the API must *not* write to `daily_logs` in the request thread. Instead it publishes a `DELIVERY_COMPLETED` event to Redis; a background worker consumes it and asynchronously writes the bento calories to `daily_logs` (and triggers a push notification). This prevents blocking the courier's status-update API.

4. **Role-based access (JWT) with three strict roles:** `Customer` (read / swap own menu), `Admin Dapur` (read aggregated kitchen manifest), `Kurir` (update logistics status). Permissions are deliberately narrow per role.

5. **Delivery status FSM:** `diproses_dapur` → `dalam_pengantaran` → `tiba`. Photo proof-of-receipt is uploaded to R2 via presigned URLs.

## Risk-Driven Constraints (PRD §3)

- **Courier photo upload latency** (poor signal in basements/lobbies): use background sync via a Service Worker in the courier app — cache photos in local storage and upload when the signal recovers.
- **Redis over-consumption:** menu cache carries a TTL (PRD suggests 24h); Pub/Sub uses acknowledgement so queued events are not silently lost under memory pressure.

## Development Methodology

Vertical slicing across four sequential phases (Foundation → Core Business Logic → Logistics/Automation → Frontend Polish). A phase may not begin until the previous phase's acceptance criteria pass. The PRD §2 lists each phase's features and acceptance criteria; use those as the definition of done.

### Phase notes relevant to implementation

- **Phase 1** defines the core data layer: tables `users`, `user_metrics`, `subscriptions`, `menus`, `daily_deliveries`, `daily_logs` (six tables — PRD §1.1 says "5" but lists 6), plus JWT auth and the TDEE engine. TDEE uses the **Mifflin-St Jeor** equation; fat-loss target = TDEE − 500 kcal, muscle-gain = TDEE + 300 kcal. Calorie output must match the medical formula with 0% deviation.
- **Phase 2** adds the credit ledger, weekly menu caching in Redis (24h TTL), and the time-locked swap with kitchen-manifest generation at 18:05 WIB.
- **Phase 3** adds the logistics FSM, R2 presigned uploads, and the Redis Pub/Sub auto-logger (push notification: "Makan siangmu sudah di lobi!").
- **Phase 4** (Frontend): 3-step onboarding form, weekly menu cards with macro badges (Protein/Karbo/Lemak), a delivery-tracking stepper, an SVG calorie ring updated via WebSocket or optimistic UI, and a "Quick Add" form for off-catering items (snacks/coffee).
