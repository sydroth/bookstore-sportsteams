# bookstore-sportsteams

##Description

The exact same book store project, except instead of books we will use sports teams.

## Project Setup

### Create database for local development
The following commands assume postgres is installed in the development environment.  
```
 > createdb earsplitting-glider
 > npm run db 
```

##Context

Creating this web application will provide exposure to:

Express (or other web framework)
Javascript
Simple relational database interactions (Create, Read, Update, Delete), with SQL practice
Simple server side templating (to render data retrieved from the database)

##Specs

- [ ] Any user can add teams of selected leagues into the system via an admin page
- [ ] Teams entered in the system are listed on the home page, in pages of 10
- [X] Users can search for teams by team name OR by head coach OR by league OR by division OR by mascot, and search results will be presented in a new page
- [ ] Users can view team details on a team detail page, linked to from the listing or search pages
- [X] All code submissions are peer reviewed via GitHub PR by at least two members of the team, and master is always in a   stable state (tests passed, site functions)
- [X] The artifact produced is properly licensed, preferably with the MIT license.

##Quality Rubric

- [X] Variables, functions, css classes, etc. are meaningfully named (no comments exist in code to explain functionality - the names serve that function)
- [X] Functions are small and serve a single purpose
- [X] Code is well organized into a meaningful file structure
- [ ] Interface is user friendly
