# Contributing

If you would like to contribute code you can do so through GitHub by first forking this repository, using the [forking workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow), then cloning the forked repository, then sending a pull request.
All code or documentation contributions should be associated with an open issue. If an issue does not exist, you should create one first (see guidance below).    
All  additions or modifications to code should include associated tests (an automated test suite should be created).  
When submitting code, please make every effort to follow existing conventions and style in order to keep the code as readable as possible.
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

## Pull Request process 
Use the PR title to summerise changes; and the body to give further detail on specific changes (reference associated issues here).  

All PRs must be reviewed and approved by at least one other team member before being merged. A review means running the test suite, running the code, and ensuring the code works as expected.

When completely a PR make sure you use 'Squash & Merge'.  

  
## Creating issues
All issues need to be approved by one other contributer before work on that issue can begin.
You can create a new issue to document bugs (including documentation issues) or request new features that were not included in the initial list of 
issues.  
For a new feature request, the issue should describe the new feature and why it is needed.  
For bug reports, provide as much information as you can so that the person who fixes the bug will be able to reproduce it.  
For all new issues, please make sure you check the open issues first to avoid creating duplicate issues.  
If more than one person works on an issue, ensure this is documented in the issue and pull request comments.