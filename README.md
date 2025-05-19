# React Mini Project

This is a simple React application that uses the GitHub API to fetch and display GitHub users.

## Prerequisites

- **Node.js** and **npm** installed on your machine.
- A GitHub personal access token.

## Setup

1. **Clone the repository** (replace `<repository-url>` with your repo URL):
   ```bash
   git clone <repository-url>
   cd github-viewer
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure environment variables**:
   - Create a `.env.local` file in the project root.
   - Add the following line, replacing `<YOUR_GITHUB_TOKEN>` with your token:
     ```env
     VITE_GITHUB_TOKEN=<YOUR_GITHUB_TOKEN>
     ```

## Running the App

Start the development server:
```bash
npm run dev
```

## Testing

Run the test suite:
```bash
npm test
```