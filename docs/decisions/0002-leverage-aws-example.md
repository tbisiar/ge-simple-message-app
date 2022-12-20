---
# These are optional elements. Feel free to remove any of them.
status: accepted
date: 2022-12-16
deciders: tbisiar
consulted: n/a
informed: n/a
---
# Leverage AWS example from blog

## Context and Problem Statement

To setup a chat application there are many decisions to be made.  To shortcut a solution to a stable, well-architected, serverless chat application in aws there is the opportunity to take advantage of an example provided by this blog: https://aws.amazon.com/blogs/mobile/building-a-full-stack-chat-application-with-aws-and-nextjs/

<!-- This is an optional element. Feel free to remove. -->
## Decision Drivers

* speed of initial POC development
* risk of not providing enough original code / decisions for assessment
* … <!-- numbers of drivers can vary -->

## Considered Options

* build locally hosted solution with express/hapi server and in-memory database
* build custom AWS stack with pulumi or AWS CDK
* start with blog example
* … <!-- numbers of options can vary -->

## Decision Outcome

Chosen option: "Start with blog example", because per take-home test instructions 
`incorporating open source or third-party code is fine as long as it's clearly distinguishable from original code` and a quicker POC allows more time for customization/completing the assignment and adding enhancement(s)

<!-- This is an optional element. Feel free to remove. -->
### Consequences

* Good, because quicker POC with well architected & complete IAM, Lambda, Storage, & API setup
* Bad, because risk of not being able to show enough of own work/code style
* … <!-- numbers of consequences can vary -->

<!-- This is an optional element. Feel free to remove. -->
## Validation

This decision will be validated with the engineering hiring panel, and prior to submission to ensure there is enough customization for my skill/ability to be assessed.

<!-- This is an optional element. Feel free to remove. -->
## More Information

This decision should be revisited prior to submittin the take-home test so as to be addressed by either adding additonal customization or developing individual backend solution.
