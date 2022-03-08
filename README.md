

<b>ReactJS-Spring-Boot-Full-Stack-App</b>
<hr>

This project consists of two applications: one is a Spring Boot Rest API
called spring-backend and another is a ReactJS application called
react-frontend.

Service-oriented platform focusing on establishing and maintaining
connections between consumers and small businesses in the The Arts,
Entertainment, and Recreation sector.

<b>Applications</b>
<hr>

 <b> - spring-backend</b>

Spring Boot Web Java backend application that exposes a REST API to
manage hobbies. Its secured endpoints can just be accessed if an access
token (JWT) is provided.

spring-backend stores its data in a MySql database.

spring-backend has the following endpoints

<table>
<tbody>
<tr class="odd">
<td><b>Endpoint</b></td>
<td><b>Secured</b></td>
<td><b>Roles</b></td>
</tr>
<tr class="even">
<td>POST /users/authenticate</td>
<td>NO</td>
<td>USER and BUSINESS</td>
</tr>
<tr class="odd">
<td><p>POST /hobbies/create-offer</p>
<p>{“name”,”slogan”, “category”, “intro”, “description”,”price”,”creator”,”location”,”profileImgUrl”,”galleryImgUrl1”,</p>
<p>“galleryImgUrl2”,”galleryImgUrl3”,</p>
<p>“contactInfo”</p>
<p>}</p></td>
<td>YES</td>
<td>BUSINESS</td>
</tr>
<tr class="even">
<td>DELETE /hobbies/delete-hobby/{sbdbId}</td>
<td>YES</td>
<td>BUSINESS</td>
</tr>
<tr class="odd">
<td>GET /user-home/{sbdbUsername}</td>
<td>YES</td>
<td>USER</td>
</tr>
<tr class="even">
<td>GET /hobbies/hobby-details/{sbdbId}</td>
<td>YES</td>
<td>USER and BUSINESS</td>
</tr>
<tr class="odd">
<td>GET /hobbies/is-saved {“id”, “username”}</td>
<td>YES</td>
<td>USER</td>
</tr>
<tr class="even">
<td>GET /hobbies/saved-hobbies/{sbdbUsername}</td>
<td>YES</td>
<td>USER</td>
</tr>
<tr class="odd">
<td>GET /business-owner/{sbdbUsername}</td>
<td>YES</td>
<td>BUSINESS</td>
</tr>
<tr class="even">
<td>GET /hobbies/remove-hobby {“id”, “username”}</td>
<td>YES</td>
<td>USER</td>
</tr>
<tr class="odd">
<td>GET /hobbies/remove-hobby {“id”, “username”}</td>
<td>YES</td>
<td>USER</td>
</tr>
<tr class="even">
<td><p>PUT /hobbies/update-hobby </p>
<p>{“name”,”slogan”, “category”, “intro”,</p>
<p>“description”,”price”,”creator”,”location”,”profileImgUrl”,”galleryImgUrl1”,</p>
<p>“galleryImgUrl2”,”galleryImgUrl3”,</p>
<p>“contactInfo”, “id”</p>
<p>}</p></td>
<td>YES</td>
<td>BUSINESS</td>
</tr>
<tr class="odd">
<td>POST /users/login/{sbdbUsername} </td>
<td>YES</td>
<td>USER and BUSINESS</td>
</tr>
<tr class="even">
<td><p>POST /test/results {“categoryOne”,” categoryTwo”, “categoryThree”, “ categoryFour”,” categoryFive”, “ categorySix”, “ categorySeven”, “location”</p>
<p>}</p></td>
<td>YES</td>
<td>USER</td>
</tr>
<tr class="odd">
<td>POST /users/change-password {“email”}</td>
<td><p>NO</p></td>
<td>USER and BUSINESS</td>
</tr>
<tr class="even">
<td>POST /users/change-password-new {“id”, “username”}</td>
<td><p>NO </p>
<p>(link from Email)</p></td>
<td>USER and BUSINESS</td>
</tr>
<tr class="odd">
<td>POST /users/register-business {“username”,”businessname”, “address”, “email”,”password”, “repeatpassword”}</td>
<td>NO</td>
<td>BUSINESS</td>
</tr>
<tr class="even">
<td>POST /users/rsignup {“username”,”fullName”, “gender”, “email”,”password”, “repeatpassword”}</td>
<td>NO</td>
<td>USER</td>
</tr>
<tr class="odd">
<td>GET users/show-business-details/{sbdbUsername}</td>
<td>YES</td>
<td>BUSINESS</td>
</tr>
<tr class="even">
<td>DELETE users/delete-user/{sbdbId}</td>
<td>YES</td>
<td>USER and BUSINESS</td>
</tr>
<tr class="odd">
<td>PUT users/update-business {”businessname”, “address”,”password”, “id”}</td>
<td>YES</td>
<td>BUSINESS</td>
</tr>
<tr class="even">
<td>PUT users/update-USER {,”fullName”, “gender”, ”password”, “id”}</td>
<td>YES</td>
<td>USER</td>
</tr>
<tr class="odd">
<td>GET users/show-client-details/{sbdbUsername}</td>
<td>YES</td>
<td>USER</td>
</tr>
</tbody>
</table>

<b>-react-frontend</b>

ReactJS frontend application where users can find and save hobbies and businesses can manage offers. In order to access the application, user / business must login using his/her username and password.  All the requests coming from react-frontend to secured endpoints in spring-backend have a access token (JWT) that is generated when user / business logs in.

react-frontend uses Semantic UI React as CSS-styled framework.

<b>Prerequisites</b>
<hr>

-Java 11+

-npm

-JWT 

Click here to view the application.
This application is subject to Copyright.

Set up
Install NodeJs.

<b>Frontend -</b>
Open ./react-frontend

Install the modules - npm i

Start the application on local host - npm start

The application will run on http://localhost:4200

React JS
Axios - API Calls

<b>Backend -</b>
Install JDK 14.0.1

Open ./spring-backend on any IDE (IntelliJ/Eclipse etc.) and run the application.

The backend will run on http://localhost:8080

Spring Boot

Basic Authentication and JWT implemented both using Spring Security.
Spring Data JPA + MySQL 
Database -
Make sure to specify spring.datasource.username and spring.datasource.password in the application.properties file.
The databse will be created with the start of the application. No set up required.
