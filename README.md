# Marking
This is a web application that allows students to submit assignments and the instructor can mark the assignments on the website. The application is built using React, NextJS, Typescript, Nodejs, Express, PostgreSQL, Knex, Jest and Docker.

## Features
- Student and Instructor Authentication
- Student can view their completed assignments and overall progress
- Student can store the draft assignment and modify in future
- Instructor can view the list of assignments and the status of each student's assignment
- Instructor can mark the assignments
- Email is automatically send to student when all assignments is marked.
- Submitted or marked assignment is not editable.

## Testing
[Demo](http://192.9.229.157:8000/)
| Username  | Password |
| ------------- | ------------- |
| admin | admin  |
| student1  | 1234  |
| student2  | 1234  |
| student3  | 1234  |

## Security
#### Frontend:
- useLogin react hook to check if user is logged in<p>
- useAuth react hook to determine the user's role and redirect to index if the role is not suitable for the user

#### Backend:
- JWT token used to verify identity
- Passwords are hashed before being stored in the database
- Route is protected by a role-based authentication
- RequireAuth decorator is used to verify the user's identity and role

## Scalability
The application support multiple questions in a single assignment instead of one question pre assignment. It also support unlimit student quantity. 
Decorators and dependency injection are widely adopted, the code is structured in a way that promotes loose coupling between different components, such as services and controllers. So that each component can be developed and tested independently, without depending on the implementation details of other components.

Decorators are used to add behavior or functionality to classes or methods, such as authentication. This allows for a modular and extensible approach to adding new features to the application.

All those design provides scalability for the application. As the user base grows and more complex assignments are required, the application is better equipped to handle these needs. 

## Installation

Clone the repository using the following command and navigate to the repository folder.
```
git clone https://github.com/wilsonchyw/Marking.git
cd Marking
```


In the backend folder, create a .env file and define the following environment variables:
```
MAILER_USER=your-email-service-username
MAILER_PASSWORD=your-email-service-password
MAILER_PROVIDER=your-email-service-provider(Omit this if you decide to use gmail)
```
Alternatively, you can define these variables in the docker-compose.yml file.

Start the docker compose.
```
docker-compose up --build
```

Access the application at [http://localhost:8000](http://localhost:8000)

## optional
If you choose to develop or deploy on a remote computer, change the `NEXT_PUBLIC_ENDPOINT` in docker-compose.yml to the remote address
``` yaml
frontend:
    environment:
       - NEXT_PUBLIC_ENDPOINT=http://remote:3000
```

## Remark
Regarding the email service, if you decide to use Gmail(default provide) as the email provide, according to the [docunmentation](https://www.npmjs.com/package/nodemailer) of nodemailer. You may need to define a "Application Specific" password instead of you orgrinal password. Detail about the informations could be found at [here](https://nodemailer.com/usage/using-gmail/)
