# The Official Rust Guide

***Link to published Medium article can be found [here](https://medium.com/@abdullah_95/learn-rust-and-start-building-real-developer-tools-ddc198cd844f)***

Rust rewards the developers who push past the initial learning curve. Mastering its fundamentals deepens your understanding of software in general, while opening the door to building everything from CLI tools and AI infrastructure to high-performance systems. The path that works best: start with the fundamentals, lean on solid resources, and turn what you learn into real projects. That is what builds lasting understanding and reinforces core concepts.

---

## Essential Cargo Commands

Cargo is Rust's build tool and package manager, and it's the entry point for nearly everything you will do day-to-day.

| Command | Description |
|---|---|
| `cargo new project` | Create a new Rust project |
| `cargo run` | Build and run the project |
| `cargo check` | Check whether the project compiles, without producing the final executable |
| `cargo test` | Run tests |
| `cargo fmt` | Format Rust code |
| `cargo clippy` | Analyze code for common mistakes and improvements |

---

## Common Crates Worth Knowing

Cargo also manages Rust packages, called **crates**. Developers can create and publish their own crates through the [crates.io](https://crates.io/) registry. The following crates come up often in real-world Rust development:

| Crate | Purpose |
|---|---|
| [`clap`](https://crates.io/crates/clap) | CLI development |
| [`serde`](https://crates.io/crates/serde) | Data serialization |
| [`reqwest`](https://crates.io/crates/reqwest) | HTTP requests |
| [`tokio`](https://crates.io/crates/tokio) | Async programming |
| [`axum`](https://crates.io/crates/axum) | Web APIs |
| [`anyhow`](https://crates.io/crates/anyhow) | Error handling |
| [`tracing`](https://crates.io/crates/tracing) | Application logging |

---

## Recommended Learning Path

1. Learn the fundamental concepts such as ownership, borrowing, lifetimes, and the type system
2. Work through **The Rust Book** cover to cover
3. Reinforce concepts with **Rustlings** exercises
4. Practice further with **RareCode** and its companion solutions repository
5. Build real projects (CLI tools, small web APIs, automation scripts) using the crates above
6. Explore [crates.io](https://crates.io/) to see how the wider ecosystem solves problems you'll eventually run into
7. See Rust applied to a real developer-tooling use case in the **Rust Token Killer (RTK)** article

---

## Key Resources

- [RareCode.ai](https://rarecode.ai) — Hands-on Rust practice problems
- [The Rust Programming Language (The Rust Book)](https://doc.rust-lang.org/book/) — The official, definitive guide to the language
- [Rustlings Exercises](https://github.com/rust-lang/rustlings) — Small, guided exercises for learning Rust by fixing broken code
- [Crates.io Registry](https://crates.io/) — The official Rust package registry
- [Rust Token Killer (RTK) Article](https://medium.com/stackademic/rust-token-killer-save-claude-code-tokens-with-this-rust-binary-761641e76bda) — A real-world Rust CLI binary used to optimize Claude Code token usage
- [RareCode Solutions Repository](https://github.com/CodingAbdullah/RareRust) — Worked solutions to accompany RareCode practice problems