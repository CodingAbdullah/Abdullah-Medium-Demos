# RTK Demo – Claude Code Token Optimization

**Rust Token Killer: Save Claude Code Tokens with This Rust Binary**

It demonstrates how to integrate **RTK (Rust Token Killer)** into a Claude Code development workflow to reduce unnecessary token consumption caused by verbose terminal output.

## What is RTK?

RTK (Rust Token Killer) is a high-performance Rust CLI binary that sits between Claude Code’s shell execution layer and the LLM context, filtering noisy command output before it reaches the model.

This helps reduce token waste from:

- verbose test output
- Large Git diffs
- Recursive file listings
- Docker logs
- TypeScript compiler output
- Build logs
- Infrastructure tooling output

Instead of spending tokens parsing noise, Claude Code can focus on:

- Coding
- debugging
- Reasoning
- Architecture
- Implementation

---

## Tech Stack

This demo uses:

- Rust
- Cargo
- Claude Code
- Cursor IDE
- RTK

---

## Installation

### Install Rust + Cargo

For Windows:

```bash
winget install Rustlang.Rustup
```

Verify installation:

```bash
rustc --version
cargo --version
```

### Install RTK

```bash
cargo install --git https://github.com/rtk-ai/rtk
```

Verify installation:

```bash
rtk --version
rtk --help
```

---

## Claude Code Integration

Initialize RTK inside the project:

```bash
rtk init
```

For Cursor IDE users:

```bash
rtk init -g --agent cursor
```

This creates:

```text
.rtk/
```

which contains RTK filtering configuration for Claude Code workflows.

---

## Recommended CLAUDE.md Configuration

Add RTK guidance to your `CLAUDE.md` file so Claude consistently prefers optimized terminal commands:

```markdown
## RTK (Rust Token Killer)

This project uses RTK (Rust Token Killer) to reduce LLM context token usage by filtering, compacting, and summarizing noisy terminal output before it reaches Claude Code.

### RTK Usage Rules

- Prefer RTK-wrapped commands whenever possible
- If an RTK equivalent exists, use it instead of the raw command
- Avoid excessive terminal output that wastes context tokens
- Prefer focused inspection over dumping entire logs, diffs, or recursive directory trees
- Use error-focused and summary-focused RTK commands when debugging

### Preferred Commands

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

### Fallback Commands

rtk proxy <command>

or

rtk run "<command>"

### Claude Code Expectations

Claude Code should:

- Prefer RTK commands for noisy terminal operations
- Avoid raw docker logs, full git diff, massive test output, or recursive scans unless explicitly required
- Use rtk err for debugging failures
- Use rtk summary when concise command output is sufficient
- Use rtk gain periodically to inspect token savings
```

---

## Token Usage Analytics

RTK includes token optimization analytics:

```bash
rtk gain
```

This can help you inspect:

- Estimated token savings
- Optimization coverage
- Command usage
- Efficiency improvements

---

## Project Purpose

This repository exists for educational purposes and demonstrates how to optimize AI-assisted development workflows using Claude Code and RTK.

---

## Useful Resources

- [RTK GitHub Repository](https://medium.com/r/?url=https%3A%2F%2Fgithub.com%2Frtk-ai%2Frtk)
- [Rust Documentation](https://medium.com/r/?url=https%3A%2F%2Fdoc.rust-lang.org%2Fstable%2F)
- [Cargo Documentation](https://medium.com/r/?url=https%3A%2F%2Fdoc.rust-lang.org%2Fcargo%2Fcommands%2Fcargo-doc.html)

---

## License

MIT