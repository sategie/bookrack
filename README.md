# Bookrack

![Image of home page on different devices](/readme-assets/homepage.png)

<a href="https://bookrack.onrender.com/" target="_blank">Click this link to view the deployed project</a>

Note: The app was deployed using the free tier of Render. As a result, it takes about 1 minute for the app to load the
first time.

When the loading is complete, you will see a blank orange page. Simply hit the refresh button to view the app.

After 5 minutes of inactivity, the app needs to be reloaded again.

It is not a bug :)

## Project Goals

The bookrack app is a virtual bookshelf. It allows you to organize and store books you have read in the past, and books
you would like to read in the future.

The backend was designed using [Java](https://www.java.com/en/), [Spring Boot](https://spring.io/projects/spring-boot)
and [MongoDB](https://www.mongodb.com/).

The frontend was designed using [TypeScript](https://www.typescriptlang.org/) and [React.js](https://react.dev/).

## Existing Features

### Landing Page

The landing page is the first page you see when the app opens. It provides a basic summary of the app as well as
different navigation options for the user.
There is also a slideshow which displays the first 5 books from the database.

![Image of landing page](/readme-assets/landing-page.png)

### All Books

The All Books page displays all the books in the database arranged in cards.

![Image of All Books page](/readme-assets/all-books.png)

### Book Details

The Book Details page opens when a book is clicked within the All Books page.

Here, you can add a book to the Past/Future Reads and you can also delete a book from the database.

![Image of Book Details page](/readme-assets/book-details.png)

### Past Reads

The Past Reads page displays all the books you have read in the past. Only books within the All Books page can be added
to the Past Reads.

### Future Reads

The Future Reads page displays all the books you would like to read in the future. Only books within the All Books page
can be added to the Future Reads.

### Add Book

This page allows you to add a new book to the database.
It checks if a book with the same title and author already exists in the database prior to adding the book.

If the book already exists, the book is not added and an alert is displayed to inform the user.

If the book does not already exist in the database, the book is added and an alert is displayed 
informing the user accordingly.

![Image of Add Book page](/readme-assets/add-book.png)

## Features Left to Implement

### Login

I plan to add a login functionality in order for users to be able to store books specific to their accounts.

### Database for Past/Future Reads

At the moment, the Past/Future Reads are stored on the client side (browser) via Local Storage.

I plan to create separate collections within MongoDB to store the Past/Future Reads on the backend.

## Frameworks, Libraries and Dependencies

### Spring Boot

[Spring Boot](https://spring.io/projects/spring-boot) is a Java framework which is used to build backend applications
faster.

### MongoDB

[MongoDB](https://www.mongodb.com/) is an open source document oriented NoSQL database management system. 

### React

[React](https://react.dev/) is the library used in creating the frontend part of the project. It was used together 
with TypeScript.

### Bootstrap

[Bootstrap](https://getbootstrap.com/Bootstrap) was used in the project to provide styling for the various components.

### Flapdoodle

This was used to provide an embedded MongoDB for integration testing purposes.

### Cloudinary

[Cloudinary](https://cloudinary.com/) was used to provide image uploading functionality in the app. It provides
cloud-based image and video management services.


## Technologies Used

### SonarCloud

[SonarCloud](https://www.sonarsource.com/products/sonarcloud/) was used in the project to perform static code analysis
and ensure adequate code coverage.

### Maven

[Maven](https://maven.apache.org/) was used in the project to perform build automation for the Java backend. It is used
to compile, test, package and manage dependencies in Java applications.

### Docker

[Docker](https://www.docker.com/) was used in the project to containerize and run the server.


### Render

[Render](https://render.com/) was used to deploy the app. It used the docker image (created through the Dockerfile) to 
deploy the app on its platform.


