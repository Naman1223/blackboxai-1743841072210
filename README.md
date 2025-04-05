
Built by https://www.blackbox.ai

---

```markdown
# User Workspace

## Project Overview

User Workspace is a web application that acts as a legal assistant utilizing OpenAI's GPT-3.5 Turbo. The application allows users to interact with the model for legal information and advice through a simple chat interface.

## Installation

To get started with User Workspace, follow the steps below:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/user-workspace.git
    cd user-workspace
    ```

2. **Install dependencies**:
    Make sure you have [Node.js](https://nodejs.org/) installed, then run:
    ```bash
    npm install
    ```

3. **Create a `.env` file**:
   Create a `.env` file in the root of your project and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. **Start the server**:
   ```bash
   node server.js
   ```
   The server will be accessible at `http://localhost:3000`.

## Usage

Once the server is running, you can open your web browser and navigate to `http://localhost:3000`. The chat interface will allow you to send messages to the AI and receive responses tailored to your inquiries about legal topics.

## Features

- **Chat with AI**: Users can ask legal-related questions, and the AI provides accurate legal information in simple terms.
- **File Upload Handling**: The app allows file uploads to facilitate sharing of documents.
- **Static File Serving**: The application serves static HTML files for the user interface.

## Dependencies

This project utilizes the following packages:

- **axios**: For making HTTP requests to the OpenAI API.
- **cors**: To enable Cross-Origin Resource Sharing.
- **dotenv**: For loading environment variables from a `.env` file.
- **express**: A web framework for Node.js to handle routing and middleware.
- **multer**: A middleware for handling `multipart/form-data` for file uploads.
- **pdf-parse**: For parsing PDF files (if necessary in future expandability).

## Project Structure

Here's an overview of the project structure:

```
user-workspace/
├── public/
│   ├── chat.html
│   └── index.html
├── uploads/             # Directory where uploaded files will be stored
├── .env                 # Environment variables (not included in the repo)
├── package.json         # Project metadata and dependencies
├── package-lock.json    # Dependency tree
└── server.js            # Main server file
```

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for more details.

---

Feel free to contribute to the project by submitting issues or pull requests!
```