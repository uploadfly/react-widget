# Uploadfly React Widget Component Documentation

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Event Handlers](#event-handlers)
- [Styling](#styling)
- [Attribution](#attribution)

## Installation

To use the `UfWidget` component in your React application, run the following command:

```bash
npm install i @uploadfly/react-widget
```

## Usage

Import the `UfWidget` component and use it within your React application:

```jsx
import React from "react";
import UfWidget from "@uploadfly/react-widget";
import "@uploadfly/react-widget/dist/style.css";

function App() {
  // Your component code here

  return (
    <div>
      <h1>File Upload Widget</h1>
      <UfWidget apiKey="YOUR_API_KEY">
        {/* Content that triggers the modal */}
        <button>Upload a file</button>
      </UfWidget>
    </div>
  );
}

export default App;
```

## Props

The `UfWidget` component accepts the following props:

- `apiKey` (string, required): Your API key for accessing the file upload service.
- `hideAttribution` (boolean, optional): If set to `true`, hides the attribution link.
- `onUploadComplete` (function, optional): A callback function that receives upload completion data.
- `accentColor` (string, optional): Custom accent color for styling the widget (default is `#f35815`).

## Event Handlers

- `onUploadComplete(data: object)`: A callback function called when the upload process is completed. It receives an object containing the following properties:
  - `status` (number): HTTP status code of the upload response.
  - `success` (boolean): Indicates whether the upload was successful.
  - `data` (object): Information about the uploaded file, including:
    - `url` (string): URL to the uploaded file.
    - `name` (string): Name of the uploaded file.
    - `size` (number): Size of the uploaded file in bytes.
    - `type` (string): MIME type of the uploaded file.
    - `path` (string): Path to the uploaded file.

## Attribution

By default, the widget includes an attribution link to Uploadfly. If you wish to hide this attribution, set the `hideAttribution` prop to `true`.
