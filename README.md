
<b>ReactJS-Spring-Boot-Full-Stack-App</b>
<hr>

This project consists of two applications: one is a Spring Boot Rest API
called spring-backend and another is a ReactJS application called
react-frontend.

Service-oriented platform focusing on establishing and maintaining
connections between consumers and small businesses in the The Arts,
Entertainment, and Recreation sector.

Click [here](https://www.hobbie.ch) to view the application.
This application is subject to Copyright.

<b>Applications</b>
<hr>

 <b> - spring-backend</b>

Spring Boot Web Java backend application that exposes a REST API to
manage hobbies. Its secured endpoints can just be accessed if an access
token (JWT) is provided.

spring-backend stores its data in a MySql database.

spring-backend has the following endpoints


<b>-react-frontend</b>

ReactJS frontend application where users can find and save hobbies and businesses can manage offers. In order to access the application, user / business must login using his/her username and password.  All the requests coming from react-frontend to secured endpoints in spring-backend have a access token (JWT) that is generated when user / business logs in.

react-frontend uses Semantic UI React as CSS-styled framework.

<b>Prerequisites</b>
<hr>

-Java 11+

-npm

-JWT 

<b>Set up</b>

<hr></hr>

Clone the repository:

<pre>git clone https://github.com/purshink/ReactJS-Spring-Boot-Full-Stack-App.git</pre>

Navigate to the newly created folder:

<pre>cd  ReactJS-Spring-Boot-Full-Stack-App</pre>
 

<b>Frontend -</b>

Install NodeJs.v.16.13.1 /npm v.8.3.0

Navigate to react-frontend subfolder:
 
<pre>cd react-frontend</pre>

Install the modules

<pre>npm i</pre>

Start the application on local host:

<pre>npm start</pre>

Navigate to:

http://localhost:4200

 
<b>Backend -</b>
Install JDK 11.0.11
Install docker -v 20.10.7
Install docker-compose -v 1.8.0

Navigate to spring-backend subfolder:

<pre>cd spring-backend</pre>

Run the project with:

<pre>docker-compose up --build</pre>


The project has the following endpoints:

IMPORTANT: to explore api enter url:  /v3/api-docs

http://localhost:8080/swagger-ui/index.html


NOTE: Testing API 

-/signup (create client-user) or /register (create business-user)

-/authenticate (returns JWT authentication token)

-use JWT token in order to authorize access to secured endpoints (click the lock icon or use the Authorize button on the upper right corner - then paste JWT Token )

NOTE: /notification endpoint will return an internal server error if you don't specify spring.mail credentials first.

<pre>The backend will run on http://localhost:8080 </pre>

<b>Spring Mail</b>

Make sure to specify a valid spring.mail.username and spring.mail.password in the application.properties file in order to be able to send an Email confirmation for updating user entries.

IMPORTANT: if you decide not to specify mail credentials, you will get javax.mail.AuthenticationFailedException. The rest of the application should work normally despite this exception.


