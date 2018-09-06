# Contributing (teamFleming core)

## Detailed Workflow (teamFleming core)
<!-- Git workflow (teamFleming) -->
Team Fleming's Git Workflow
1. 'git branch' [make sure you show the correct branches]
1. 'git checkout dev' [go to the dev branch]
1. 'git pull origin dev' [update the dev branch to the most up to date]
1. 'git checkout -b newFeature' [create a new branch for the feature you are working on]
1. [write the code, stage(add) the data, and commit code]
	- [DON'T FORGET to use prefixes to flag your commits]
  - Make commits to your feature branch. Prefix each commit like so:
  - The first line of your commit message should be a brief summary of what the
  commit changes. Aim for about 70 characters max. Remember: This is a summary,
  not a detailed description of everything that changed.
  - (feat) Add a new feature
  - (fix) Fix inconsistent tests [Fixes #0]
  - (refactor) Refactoring Data
  - (cleanup) Cleaning up 
  - (test) Test related
  - (doc) Document related
1. 'git checkout dev' [go back to dev branch]
1. 'git pull origin dev' [update the dev branch to the most up to date again]
1. 'git checkout newFeature' [go back to your newFeature work]
1. 'git merge dev' [merge the dev and the newFeature to not have merge conflicts]
1. [fix any conflicts]
1. 'git push origin newFeature' [DO NOT PUSH TO DEV]
1. [GO TO GITHUB REPO]
1. [Change branch to newFeature and create a pull request to dev branch]
  - make base: dev and compare: newFeature]
1. [submit pull request (using CONTRIBUTING.md flags)]
1. [have someone other than yourself code review and accept the pull request to dev]
1. [eventually as a group, we will pull the dev to the master branch periodically]

## Code Review

1. Follow [STYLE-GUIDE.md](STYLE-GUIDE.md)
1. Your pull request will be reviewed by another maintainer. The point of code
   reviews is to help keep the codebase clean and of high quality and, equally
   as important, to help you grow as a programmer. If your code reviewer
   requests you make a change you don't understand, ask them why.
1. Fix any issues raised by your code reviwer, and push your fixes as a single
   new commit.
1. Once the pull request has been reviewed, it will be merged by another member of the team. Do not merge your own commits.



