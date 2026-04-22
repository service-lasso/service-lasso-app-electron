# src-electron

This directory now documents the next bounded native-wrapper step for `service-lasso-app-electron`.

Current honest status:
- the repo is executable today through the local Node desktop host in `src/`
- Electron packaging/build tooling is not installed in this environment, so the native shell is not compiled in this slice
- the next Electron wrapper should open the local host URL exposed by the current starter

Expected local host URL:
- `http://127.0.0.1:19160`

Key current host behavior:
- boots published `@service-lasso/service-lasso`
- prepares a local wrapper `servicesRoot` for sibling `lasso-echoservice`
- mounts sibling built `lasso-@serviceadmin` at `/admin/`

Related config:
- `electron.config.json`
