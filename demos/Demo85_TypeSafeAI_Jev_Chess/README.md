# Jev Chess

A TypeScript chess application that combines **TypeSafe AI's Jev System One model** with **Stockfish** to explore judgment-based AI in chess.

***You can find the link to the article associated with this demo (here)[https://medium.com/stackademic/building-chess-with-jev-and-claude-opus-5-5-43a3544c1f9e].

Play against Jev, Stockfish, or a Hybrid opponent that combines Stockfish's calculation with Jev's personality-driven judgment.

## Features

- Play against Jev
- Play against Stockfish
- Jev + Stockfish Hybrid mode
- Multiple Jev personalities and difficulty levels
- Jev position evaluation and draw decisions
- Legal move validation with `chess.js`
- Local mock Jev for development
- Docker support
- Server-side Jev API integration

## Tech Stack

- Next.js
- React
- TypeScript
- TypeSafe AI SDK
- Stockfish
- chess.js
- react-chessboard
- Tailwind CSS
- shadcn/ui
- Upstash Redis
- Docker

## Environment Variables

Create a `.env.local` file and add your TypeSafe AI API key:

```env
TYPESAFE_API_KEY=your_typesafe_api_key
```

The API key is only used server-side and should never be exposed through a `NEXT_PUBLIC_` environment variable.

If no API key is provided, the application can use the local mock Jev implementation.

## Run Locally

macOS/Linux:

```bash
./scripts/setup.sh local --start
```

Windows:

```powershell
.\scripts\setup.ps1 local -Start
```

## How Hybrid Mode Works

```text
Position
   ↓
Stockfish
   ↓
Top 5 Moves
   ↓
Jev
   ↓
Personality Judgment
   ↓
Selected Move
   ↓
chess.js
   ↓
Board
```

Stockfish handles calculation while Jev handles judgment, allowing the opponent to maintain strong moves while expressing different playing styles.

## License

Licensed under **GPL-3.0-or-later** because the project distributes Stockfish.