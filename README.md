# Project Name

## Overview
This project is a web application built with Node.js and Express on the backend, and React on the frontend. It includes features such as user authentication, product management, and Stripe integration for payment processing.

## Prerequisites
- Node.js
- npm (Node Package Manager)
- MongoDB
- Redis


## Project Structure

### Backend (`server` directory)
- **Dependencies:** The backend dependencies are listed in the `package.json` file.
- **Environment Variables:** The backend uses environment variables for sensitive information. These are loaded using the `dotenv` package.
- **API Routes:** The main API routes are defined in the `api.js` file.
- **Database Connection:** The MongoDB connection is established in the `db.js` file.
- **Static Files:** The server serves static files based on the user's cookies.
- **Server Listening:** The server listens on the specified port.

### Frontend (`client` directory)
- **Dependencies:** The frontend dependencies are listed in the `package.json` file.
- **Public Files:** The public files are located in the `public` directory.
- **Build Scripts:** The build scripts for the admin and main builds are defined in the `package.json` file.

## Security

### Sensitive Information
- **Environment Variables:** Sensitive information such as API keys and database URIs are stored in environment variables.
- **.gitignore:** The `.gitignore` file ensures that sensitive files are not tracked by Git.

### SSL Certificates
- **Private Key:** The private key file is ignored by Git.

## License
This project is licensed under the ISC License.

## Contributing
If you would like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## Contact
For any inquiries, please contact [tthingizkhan@gmail.com].