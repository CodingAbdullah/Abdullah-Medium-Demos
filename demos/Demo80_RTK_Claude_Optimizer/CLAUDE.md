## RTK (Rust Token Killer)

This project uses RTK (Rust Token Killer) to reduce LLM context token usage by filtering, compacting, and summarizing noisy terminal output before it reaches Claude Code.

### RTK Usage Rules

- Prefer RTK-wrapped commands whenever possible.
- If an RTK equivalent exists, use it instead of the raw command.
- Avoid excessive terminal output that wastes context tokens.
- Prefer focused inspection over dumping entire logs, diffs, or recursive directory trees.
- Use error-focused and summary-focused RTK commands when debugging.

### Preferred Command Patterns

Use RTK for common development workflows:

```bash
rtk pnpm install
rtk pnpm build
rtk pnpm test
rtk npm install
rtk npm test
rtk next build
rtk cargo test
rtk tsc
rtk prisma migrate status

rtk git status
rtk git diff
rtk diff

rtk jest
rtk vitest
rtk lint
rtk prettier
rtk playwright
rtk pytest
rtk mypy
rtk ruff

rtk docker ps
rtk docker logs
rtk kubectl get pods
rtk aws sts get-caller-identity

rtk ls
rtk tree
rtk find . -name "*.ts"
rtk read package.json
rtk deps

rtk err pnpm build
rtk summary pnpm build