---
# These are optional elements. Feel free to remove any of them.
status: accepted
date: 2022-12-16
deciders: tbisiar
consulted: n/a
informed: n/a
---
# Use Turborepo for incremental bundler and build system

## Context and Problem Statement

Want a simple way to manage multi-module mono-repo, I've heard good things about Turborepo and would like to give it a try.

<!-- This is an optional element. Feel free to remove. -->
## Decision Drivers

* {decision driver 1, e.g., a force, facing concern, …}
* {decision driver 2, e.g., a force, facing concern, …}
* … <!-- numbers of drivers can vary -->

## Considered Options

* Microservices with separate npm repos
* Turborepo
* nx.dev
* … <!-- numbers of options can vary -->

## Decision Outcome

Chosen option: "Turborepo", because
* It doesn't provide top-level dependency mangement, but am not expecting too much dependency cross-over between FE & BE.
* It does provide uniform js/ts linting config across packages, while not as granular as nx.dev, but that can be an advantage for consistency across full small-scoped mono-repo. 
* Turborrepo supports incremental builds w/ local build-step caching, and hot module reload for Next.js

<!-- This is an optional element. Feel free to remove. -->
### Consequences

* Good, because should be able to ramp POC build/dev process more quickly
* Good, because take-home test provides actionable opportunity to test new, highly-recommended project structure
* Bad, because more complicated initial POC than using separate npm repos
* Bad, because missing granularity for linting sub-modules separately and consistent centralized dependency management potential from nx.dev
* … <!-- numbers of consequences can vary -->

<!-- This is an optional element. Feel free to remove. -->
## Validation

decision will be validated post submission to decide if Turborepo was simpler for this POC, or added unneccessary additional overhead for a simple POC

<!-- This is an optional element. Feel free to remove. -->
## More Information

here's an article that provided much of the info from the analysis (although they decided on nx.dev for separate reasons)

This decision can be revisited for future take-home test or POCs, or if it becomes prohibitive to completeing this take-home test.
