# Contributing to Readme Markdown Generator

👍🎉 First off, thanks for taking the time to contribute! 🎉👍

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.


## Setting Up the project locally

To install the project you need to have `node` and `npm`
1.  Clone or Pull the project.
    ```sh
    # Clone your fork
    git clone https://github.com/0length/worklog.git
    cd worklog
    git checkout -b <new branch>
    # Or Use Git Init
    git init
    git remote add origin https://github.com/0length/worklog.git
    git checkout -b <new branch>
    ...
    ```
2. from the root of the project: 
    - ```npm install <package-name0> <package-name1> <package-name2> .etc --global``` to install  (prisma@1.28.3, typescript, ts-node) dependencies gobally
    - ```npm install``` to install all dependencies locally
    
3. Build the database service using docker and docker-composer
    ```sh
    cd worklog/prisma
    docker-compose up -d --build prisma && docker-compose up -d --build mongo
    npm run prisma
    ...
    ```
4. Seeding
    ```sh
    npm run db-seed
    ```
5. Happy Coding
