# Client-Side POST Request Sender/Receiver with Netlify Function Backend

This project provides a client-side web application for sending POST requests and displaying responses, now integrated with a simple Netlify serverless function for data handling. It is built using HTML, Tailwind CSS, and vanilla JavaScript for the frontend.

## Created By

This was created by [Dhruv Gowda](dhruv.ftp.sh).

## Features

*   **Request Sender:** A form to send POST requests to a configurable Netlify function API.
*   **Data Receiver/Display:** A page (`receive.html`) to fetch and display all previously stored data from the Netlify function.
*   Data is managed by a Netlify serverless function.
*   Displays stored JSON data with new entries at the top.
*   Clean, modern UI with an improved Tailwind CSS design.
*   Configurable backend API URL.

## How to View It

1.  **Save the files:** Save all the provided files into a single folder. Note that the Netlify function files are in a `netlify/functions/` subdirectory.
2.  **Deploy to Netlify (Backend):**
    *   Create a new site on Netlify and connect it to your Git repository (e.g., GitHub).
    *   Ensure the `netlify.toml` file is at the root of your repository and the `netlify/functions/posts.js` file is present.
    *   Netlify will automatically detect and deploy the function. Your function endpoint will be accessible at `https://your-netlify-app-name.netlify.app/.netlify/functions/posts`.
    *   For this project, the Netlify app is deployed at `https://melodious-parfait-a67155.netlify.app/`.
    *   **Note:** The Netlify function in this example uses an in-memory array for data storage. This means the data is **ephemeral** and will reset if the function goes cold or the server instance is reloaded. For persistent data, you would need to integrate with an external database service.
3.  **Host Frontend (e.g., GitHub Pages):**
    *   Upload the HTML, CSS, and JavaScript files (`index.html`, `receive.html`, `script.js`, `config.json`, `package.json`, `README.md`) to your GitHub Pages repository.
    *   The `index.html` file will be the entry point.
4.  **Ensure Netlify Function is Deployed:** For the frontend to function correctly (sending and receiving data), the Netlify function must be deployed and accessible.
5.  Navigate between `index.html` (Send Request) and `receive.html` (Receive Data) using the header navigation.

## How to Personalize It

### 1. Change Page Titles and Site Headers

*   Open `config.json`.
*   Modify the `pageTitle`, `siteHeader`, `postSectionTitle`, and `receivePageTitle` values to your desired text.

    ```json
    {
      "pageTitle": "Your Custom Page Title",
      "siteHeader": "Your Awesome Site Header",
      "postSectionTitle": "Send Your Data Here",
      "receivePageTitle": "View Incoming Data"
    }
    ```

### 2. Update Backend API URL

*   Open `config.json`.
*   The `backendApiUrl` value defines the endpoint where the frontend will send and retrieve data.
*   If you deploy your Netlify app to a different URL, update this value accordingly.

    ```json
    {
      "backendApiUrl": "https://melodious-parfait-a67155.netlify.app/.netlify/functions/posts" // Change this if your Netlify function is elsewhere
    }
    ```

### 3. Update Footer Credit

The footer credit "Created by Dhruv Gowda" with a link to `dhruv.ftp.sh` is expected to be present in `index.html` (and `receive.html`) within the main footer paragraph, next to the Creative Commons link. The `script.js` file validates the presence and integrity of this credit. Any attempts to remove or modify this credit in the HTML files or through browser developer tools will result in the entire footer displaying "Access Denied". Therefore, **do not attempt to change this credit.**

### 4. Configure Form Fields (HTML and `config.json`)

The input fields for the POST request form are defined directly in `index.html`. `config.json` also contains a `formFields` array which `script.js` uses to validate and collect data from the frontend.

*   **To add or remove form fields:**
    1.  **Modify `index.html`:** Add or remove HTML `<div class="flex flex-col">...</div>` blocks within the `<form id="post-form">` section. Ensure each input/textarea has a `name` attribute that matches the name you want to use for the data key, and an `id` attribute.

        Example of an HTML field structure:
        ```html
        <div class="flex flex-col">
          <label for="your_field_name" class="text-gray-700 font-medium mb-1">Your Field Label*</label>
          <input type="text" id="your_field_name" name="your_field_name" class="mt-1 p-3 border ..." placeholder="Placeholder text" required>
        </div>
        ```

    2.  **Update `config.json`:** For each field you have in `index.html` that you want to be included in the data payload sent to the backend, add a corresponding entry to the `formFields` array in `config.json`.

        Example `config.json` entry:
        ```json
        {
          "formFields": [
            // ... existing fields ...
            { "label": "Your Field Label", "name": "your_field_name", "type": "text", "placeholder": "Placeholder text", "required": true }
          ]
        }
        ```
        The `script.js` relies on this array to know which fields to look for and include in the JSON payload that gets sent to the backend.

*   **To change properties of existing fields (e.g., label, placeholder, required state):**
    *   Modify the `label` text and `placeholder` attribute directly in `index.html`.
    *   Adjust the `required` attribute in `index.html` (e.g., add `required` for mandatory fields).
    *   Update the corresponding `label`, `placeholder`, and `required` properties within the `formFields` array in `config.json` for consistency.

### 5. Customize Styling

*   This project uses Tailwind CSS. You can modify the existing Tailwind classes directly in `index.html` and `receive.html` to change colors, fonts, spacing, etc.
*   Custom CSS for gradients is embedded in the `<style>` tags. You can modify these for different color schemes.

### 6. Adjust JavaScript Logic (`script.js`)

*   Open `script.js`.
*   On the `index.html` page, the form submission now sends a `fetch` POST request to the `backendApiUrl` configured in `config.json`.
*   On `receive.html`, `script.js` sends a `fetch` GET request to `backendApiUrl` to retrieve all stored data from the backend, sorts it by timestamp (newest first), and renders it dynamically on the page.
*   The "Clear All Data" button now sends a `fetch` DELETE request to `backendApiUrl` to clear all data on the backend.

### 7. Toggle "Receive Data" Navigation Tab

*   Open `config.json`.
*   To remove the "Receive Data" tab from the navigation header on `index.html`, set `showReceiveTab` to `false`:

    ```json
    {
      "showReceiveTab": false
    }
    ```

## Backend (Netlify Serverless Function)

*   The backend logic is implemented as a Netlify serverless function (`netlify/functions/posts.js`).
*   It exposes `POST /.netlify/functions/posts`, `GET /.netlify/functions/posts`, and `DELETE /.netlify/functions/posts` endpoints.
*   It uses an **in-memory array** to store data. **This data is not persistent** and will reset when the function's instance is reloaded by Netlify (e.g., due to inactivity or new deployments).
*   **CORS is enabled** to allow requests from any origin (e.g., your GitHub Pages frontend).

## License

This work is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1).

**You are free to:**

*   **Share** – copy and redistribute the material in any medium or format for any purpose, even commercially.
*   **Adapt** – remix, transform, and build upon the material for any purpose, even commercially.

**Under the following terms:**

*   **Attribution** – You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

The attribution notice "Created by Dhruv Gowda" with a link to `dhruv.ftp.sh` is enforced by `script.js` on all pages. This credit is expected to be present in the footer of `index.html` and `receive.html`. Please retain it. Any attempts to remove or modify this credit will result in the footer displaying "Access Denied" to ensure the attribution terms are met.


## Other

* **Yes, I did obfuscate it.**
