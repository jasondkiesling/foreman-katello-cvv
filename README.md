# Foreman/Katello Content View Version Browser

A tool to more easily manage Content View Versions in Katello, a Foreman Plugin.

Authors:  
Jason Kiesling - jason_kiesling@student.uml.edu  
Kevin Huang - kevin_huang2@student.uml.edu  
Evan O'Malley - evan_omalley@student.uml.edu  
Max Rider - maxwell_rider@student.uml.edu

Advisors:  
Dr. James Daly - james_daly@uml.edu  
Ian Ballou - Red Hat

## Getting Started - Development
1. Install Node.js (a JavaScript Runtime) via NVM. Follow the direction from the [NVM website](https://github.com/nvm-sh/nvm) to install it on your OS.
1. Run `nvm install --lts` to install Node.
1. Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) if not already installed.
1. Visit [github.com/jasondkiesling/foreman-katello-cvv](https://github.com/jasondkiesling/foreman-katello-cvv). In the top right corner, click "Fork" and follow the directions.
1. On your computer, run the following commands. (This requires git to be installed.) (If using SSH keys, replace the HTTPS URL with your SSH URL.)
    ```
    git clone https://github.com/[your-username]/foreman-katello-cvv.git  
    cd foreman-katello-cvv
    git remote add upstream https://github.com/jasondkiesling/foreman-katello-cvv.git
    ```
1. Run `npm install` to download required packages.
1. Run `npm start` to start the server.
1. Navigate to http://localhost:3000 in your browser to see your local server!

## Getting Started - Production
1. Install Node.js (a JavaScript Runtime) via NVM. Follow the direction from the [NVM website](https://github.com/nvm-sh/nvm) to install it on your OS.
1. Run `nvm install --lts` to install Node.
1. Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) if not already installed.
1. Clone either your fork or this repo.
    ```
    git clone https://github.com/[your-username OR jasondkiesling]/foreman-katello-cvv.git
    ```
1. Run `npm install` to download required packages.
1. Run `npm build` to build the production version.
1. Install serve with `npm install -g serve`.
1. Start the production server by running `serve -s build`.
1. Navigate to http://localhost:5000 in your browser to see your local server!

## Notes
In order for this browser to make API calls to Foreman, you will need to configure CORS on Foreman to allow this domain.
