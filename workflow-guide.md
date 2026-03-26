# Portlink Multi-Developer Git Workflow

To maintain a clean and conflict-free repository, especially while developing the **Acenta** and **Taşeron** modules concurrently, all developers must adhere to the following Git workflow.

## 1. Branch Strategy
- **`main`**: Production-ready code. Stable.
- **`develop`**: The primary integration branch. All features merge here first.
- **Feature Branches**: `feature/<developer-name>/<module-name>`

## 2. Working on Your Module
- All Acenta development must be restricted to `src/modules/acentas/`.
- All Taşeron development must be restricted to `src/modules/tasarons/`.
- Avoid touching core files (like `App.tsx`, `Welcome.tsx`, `Login.tsx`) unless strictly necessary and approved by a lead developer.

### Creating a Feature Branch
```bash
git checkout develop
git pull origin develop
git checkout -b feature/john/tasaron-dashboard-update
```

## 3. Standardized Commit Messages
Prefix your commits to clarify intent. We use the following prefixes:
- `feat:` for new features (e.g., `feat: add subcontractor wallet view`)
- `fix:` for bug fixes (e.g., `fix: resolve crash on acenta login`)
- `refactor:` for code restructuring without changing behavior

*Tip: Squash minor or "wip" (work in progress) commits before creating a Pull Request.*

## 4. Keeping Your Branch Updated (Rebase)
To avoid messy merge commits and conflicts, regularly pull changes from `develop` by rebasing:
```bash
git fetch origin
git rebase origin/develop
```
If you encounter conflicts, resolve them locally, `git add` the resolved files, and run `git rebase --continue`.

## 5. Merging to Develop and Main
1. Push your branch: `git push origin feature/john/tasaron-dashboard-update`
2. Open a **Pull Request (PR)** targeting the `develop` branch.
3. Keep the PR focused entirely on your module to guarantee 0 conflicts.
4. Once reviewed and approved, squash and merge into `develop`.
5. Periodic releases from `develop` to `main` will be handled by the repository maintainer.

## 6. Modifying Core Routes
If you need to add a completely new module or change global routes, contact a lead developer. Do not delete any existing files; instead, follow the modular pattern used in `AcentaRoutes.tsx` and `TasaronRoutes.tsx`.
