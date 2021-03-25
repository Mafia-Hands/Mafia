# Contributing

If you would like to contribute code you can do so through GitHub by first forking this repository, using the [forking workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow), then cloning the forked repository, then sending a pull request.

All code or documentation contributions should be associated with an open issue. If an issue does not exist, you should create one first (see guidance below).

Please keep our Wiki and relevant documentation up-to-date. Add visuals if you think it will help future developers.

When submitting code, please make every effort to follow existing conventions and style in order to keep the code as readable as possible - see our [common code conventions](https://github.com/Mafia-Hands/Mafia/wiki/Common-Code-Conventions) here.

Please note we have a [code of conduct](https://github.com/Mafia-Hands/Mafia/wiki/Code-of-Conduct), please follow it in all your interactions with the project.

## Set Up

Before running, install any necessary modules using:

```bash
npm install
```

To run the program use:

```bash
npm start
```

Please refer to [Getting Started](https://github.com/Mafia-Hands/Mafia/wiki/Getting-Started) for more details on how to set up your development environment.

## Branch naming conventions

When creating a new branch in your fork, make sure to use the correct prefix depending on the type of issue.

New feature:

```bash
feature/branch-name
```

Documentation:

```bash
docs/branch-name
```

Bug fix:

```bash
bug/branch-name
```

Tests:

```bash
testing/branch-name
```

Refactoring:

```bash
refactor/branch-name
```

## Pull request process

All contributors in the team have been given merge access to allow each individual to merge their own PR. This allows for efficient work with no delays and having to depend on a specific group of contributors to merge PRs.

Use the PR title to summarise changes; and the body to give further detail on specific changes (reference associated issues here).

All PRs must be reviewed and approved by at least two other team members before being merged. A review means running the test suite, running the code, and ensuring the code works as expected. Once 2 approving reviews have been submitted, only the author of the PR can merge the branch into `main`.

If you think certain parts of your changes need particular attention, please leave a comment on the PR highlighting these particular changes.

Please do not make your PR too large - if splitting it up into two PRs makes it easier for the reviewer, then please create new branches / PRs and cherry-pick the relevant commits.

When completely a PR make sure you use **'Squash & Merge'.**

## Creating issues

All issues need to be approved by one other contributor before work on that issue can begin.

You can create a new issue to document bugs (including documentation issues) or request new features that were not included in the initial list of issues.

For a new feature request, the issue should describe the new feature and why it is needed.  
For bug reports, provide as much information as you can so that the person who fixes the bug will be able to reproduce it.

For all new issues, please make sure you check the open issues first to avoid creating duplicate issues.  
If more than one person works on an issue, ensure this is documented in the issue and pull request comments.

## Tests

All additions or modifications to code should include associated tests (an automated test suite should be created).
Please see [Puppeteer](https://github.com/Mafia-Hands/Mafia/wiki/Frontend#semi-automated-testing-with-puppeteer) and [backend testing](https://github.com/Mafia-Hands/Mafia/wiki/Backend-Testing-Infrastructure) for more details on how to create tests within our codebase.

When you submit pull requests, before they can be merged in we require all tests to be passing.

## Commenting

For all Socket.IO event handlers and emissions, they should be prefixed with a function header comment.
Comment headers for other functions should only be done when appropriate, doing it for all is not necessary.

For large chunks of code and files, please include a header comment.

Please avoid adding comments that may change in the future (e.g. the functionality will change, the functionality needs to be implemented). However, if it is avoidable (e.g. for indicating that there is functionality here to be implemented), prefix the comment with ` TODO:`
