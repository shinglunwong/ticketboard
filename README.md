# Mini Project Management System

A mini project management application that allows users to manage projects, tickets, deployments, payments, and credits. Built with React, Mantine UI, React Router, React Query for the frontend, and an Express.js backend with Knex for database management.

## Features

- **User Authentication & Roles**
  - Admin, and Client roles with role-based access control.
  
- **Project Management**
  - Create, view, update, and delete projects.
  - Assign projects to clients.

- **Ticket Management**
  - Create, view, update, and delete tickets within projects.
  - Assign priorities, statuses, types, and estimated work hours.
  - Add remarks to tickets for additional context.

- **Deployment Tracking**
  - Manage deployments for each project.
  - Track deployment platforms and dates.

- **Payment Management**
  - Handle payments related to projects.
  - Track payment statuses and due dates.

- **Credit Allocation**
  - Allocate and manage credits for various project activities.
  
- **Responsive UI**
  - Built with Mantine UI for a clean and responsive user interface.

## Technologies Used

- **Frontend**
  - React
  - Mantine UI
  - React Router
  - React Query

- **Backend**
  - Express.js
  - Knex.js
  - PostgreSQL (or your preferred SQL database)

- **Authentication**
  - JWT (JSON Web Tokens)

- **Others**
  - Bcrypt for password hashing
  - Axios for API requests

## Future Development


The Mini Project Management System is continuously evolving. Future enhancements include:

- Receipt & Invoice Generation
  - Implement functionality to generate receipts and invoices in PDF format for payments.
  - Allow users to download and print financial documents directly from the application.
- Email Notifications
  - Set up automated email notifications for important events such as:
    - Ticket status changes
    - Payment due dates and confirmations
    - Project updates and deployments
- Docker Services
- Ticket work hour should be confirmed by client: request -> estimate hour -> confirmation -> open


### License

This project is licensed under the MIT License.

### Contact

For any inquiries or suggestions, please contact shinglun.wong@gmail.com.