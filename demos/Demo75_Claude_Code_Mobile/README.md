# Mobile-First Agentic Development with Claude Code

This repository accompanies the article:

**Mobile-First Agentic Development: Shipping Production Apps with Claude Code**

It demonstrates a production-grade workflow for building, managing, and deploying applications using AI coding agents entirely from a mobile device.

---

# Overview

Agentic development shifts software engineering from manual coding to agent orchestration.

Instead of writing every line of code yourself, you:

- Define intent
- Generate instructions
- Execute implementation using an agent
- Review changes
- Merge safely into production

This workflow uses:

- Claude Code → Execution agent
- ChatGPT → Architecture and instruction generator
- GitHub → Version control and source of truth
- CLAUDE.md → Persistent agent configuration layer

This creates a repeatable, production-safe engineering system.

---

# Architecture Layers

This workflow operates across six layers:

**Architect Layer**  
You define intent and supervise execution.

**Instruction Layer**  
ChatGPT generates prompts, architecture, and CLAUDE.md configuration.

**Agent Configuration Layer**  
CLAUDE.md defines persistent behavioral and workflow rules.

**Execution Layer**  
Claude Code plans, writes, and modifies code.

**Tool Access Layer**  
Claude Code accesses Git, GitHub, filesystem, and documentation.

**Source of Truth Layer**  
GitHub stores code, tracks changes, and manages deployments.

---

# Branching Strategy

Strict branch isolation ensures safe production development.

Branch hierarchy:

- main → Production branch
- feature/<feature-name> → Feature development branch
- claude/session-<session-id> → Temporary Claude session branch

Merge flow:

1. Claude Code creates a session branch from a feature branch
2. Session branch is merged into the feature branch
3. Feature branch is squash merged into main

Rules:

- Never modify main directly
- Always use feature branches
- Session branches are temporary
- Always squash merge feature branches into main

---

# Development Lifecycle

Feature implementation lifecycle:

1. Define intent
2. Generate instructions using ChatGPT
3. Execute implementation using Claude Code
4. Review changes in GitHub
5. Merge session branch into feature branch
6. Squash merge feature branch into main
7. Deployment triggers automatically

---

# Claude Code Session Model

Each Claude Code session runs in an isolated branch:

claude/session-<session-id>

Benefits:

- Full isolation
- Parallel feature development
- Safe experimentation
- Independent execution

---

# CLAUDE.md Configuration

CLAUDE.md provides persistent rules for agent behavior.

Example:

## Git Workflow Rules
- Never commit without explicit instruction
- Never modify main directly
- Always use feature branches
- Use squash merge workflow

## Behavioral Rules
- Prefer minimal, safe changes
- Maintain code consistency
- Do not introduce unnecessary dependencies

Claude Code reads this file automatically at session start.

---

# Mobile Workflow

This entire workflow can be executed from a mobile device:

1. Create feature branch in GitHub mobile
2. Generate instructions using ChatGPT mobile
3. Start Claude Code session
4. Claude Code creates session branch
5. Claude Code implements feature
6. Review changes in GitHub mobile
7. Merge feature branch into main
8. Deployment triggers automatically

---

# Key Principles

- main is production only
- Never commit directly to main
- Always use feature branches
- Always review agent changes
- Always squash merge into main
- Maintain strict CLAUDE.md rules

---

# Benefits

- Production-grade safety
- Parallel agent execution
- Clean Git history
- Fully auditable workflow
- Mobile-first development capability

---

# License

MIT License