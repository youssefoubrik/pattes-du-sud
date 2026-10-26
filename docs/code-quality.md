# Code quality and engineering

## Implementation

- Keep components and functions focused. Reuse behavior when it reduces duplication; avoid abstractions that hide simple code.
- Build only what the current need requires. Prefer the smallest understandable solution.
- Name code by its purpose. Prefer early returns and direct conditions over nested ternaries and unnecessary checks.
- Default to Server Components. Use `"use client"` only for interactions that need it; keep client JavaScript and hydration minimal.
- Prefer static generation for public content. Use `next/image`, set dimensions/aspect ratios, optimize the actual LCP image, and lazy-load offscreen media.
- Avoid unnecessary third-party scripts, background video, oversized images, and large dependencies for trivial behavior.
- Handle errors with useful not-found, fallback, and error-boundary states. Never show raw exceptions.
- Create reusable components when real repetition exists. Avoid giant components and premature optimization.
