# Minimal POC

This document defines the most minimal useful POC for `service-lasso-app-electron`.

It must use:
- `service-lasso` as the runtime/API
- `lasso-echoservice` as the first managed service under test
- `lasso-@serviceadmin` as the operator UI

## POC goal

Prove that an Electron desktop shell can host the Service Admin UI while a local Service Lasso runtime manages Echo Service on the same machine.

## Minimal shape

The POC should:
- start or supervise a local `service-lasso` runtime from the Electron app
- provide a `servicesRoot` containing Echo Service
- show host-owned desktop shell output or framing
- render `lasso-@serviceadmin` inside the Electron window
- point Service Admin at the local runtime API
- allow the operator to manage Echo Service from the desktop shell

## Required ingredients

1. Desktop shell:
   - an Electron window
   - minimal host wiring only

2. Runtime:
   - local `service-lasso`
   - explicit `servicesRoot`
   - explicit `workspaceRoot`

3. Service under test:
   - local or released `lasso-echoservice`

4. UI:
   - `lasso-@serviceadmin`
   - pointed at the runtime API

## Minimal user flow

1. Launch the Electron app.
2. The Electron app ensures the runtime is available.
3. The app shows host-owned shell output or framing.
4. The app shows Service Admin in the window.
5. Echo Service appears in the services list.
6. The operator opens Echo Service detail.
7. The operator starts/stops Echo Service and views logs.

## POC deliverables

- one desktop start command
- minimal Electron window wiring
- documented runtime bootstrap behavior
- documented Echo Service inclusion
- documented Service Admin embedding strategy
- documented host-owned shell output
- one short smoke checklist

## Current status

This bounded POC is now implemented in-repo:
- `npm start` boots the published `@service-lasso/service-lasso` runtime
- the host serves its own desktop shell at `/`
- the host embeds the sibling built `lasso-@serviceadmin` app at `/admin/`
- the host prepares a local wrapper `servicesRoot` so `lasso-echoservice` is the discovered service under test
- `src-electron/` now contains the explicit next-step config for wrapping the local host URL in a native shell

## Honest scope limit

This POC does not need:
- auto-update
- signed installers
- tray/process polish
- advanced Rust backend logic

It only needs to prove:

**an Electron shell can host Service Admin against a real local Service Lasso runtime managing Echo Service**
