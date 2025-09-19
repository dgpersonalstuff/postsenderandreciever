# Client-Side POST Request Sender/Receiver

This project provides a simple client-side web application for sending POST requests and displaying (simulated) responses, as well as a page to simulate receiving and displaying data. It is built using HTML, Tailwind CSS, and vanilla JavaScript.

## Created By

This was created by [Dhruv Gowda](dhruv.ftp.sh).

## Features

*   **Static & Configurable Request Sender:** A form with pre-defined HTML input fields for a POST request. The `script.js` processes these fields and saves the data locally.
*   **Simulated Data Receiver:** A page (`receive.html`) to display all previously stored data, simulating data reception and history in a client-side environment.
*   Data is persisted in `localStorage` across sessions.
*   Displays stored JSON data with new entries at the top.
*   Clean, modern UI with an improved Tailwind CSS design.

## How to View It

1.  **Save the files:** Save all the provided files (`index.html`, `receive.html`, `config.json`, `script.js`, `README.md`, `package.json`) into a single folder.
2.  **Open `index.html`:** Simply open the `index.html` file in your web browser. There's no need for a local server as all operations are client-side.
3.  Navigate between `index.html` (Send Request) and `receive.html` (Receive Data) using the header navigation.

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

### 2. Update Footer Credit

The footer credit "Created by Dhruv Gowda" with a link to `dhruv.ftp.sh` is expected to be present in `index.html` (and `receive.html`) within the main footer paragraph, next to the Creative Commons link. The `script.js` file validates the presence and integrity of this credit. Any attempts to remove or modify this credit in the HTML files or through browser developer tools will result in the entire footer displaying "Access Denied". Therefore, **do not attempt to change this credit.**

### 3. Change Data Storage Key

*   Open `config.json`.
*   The `localStorageKey` value defines the key used to store all submitted/received data in your browser's local storage.

    ```json
    {
      "localStorageKey": "myCustomDataKey" // Change this to a unique key if desired
    }
    ```

### 4. Configure Form Fields (HTML and JavaScript)

The input fields for the POST request form are defined directly in `index.html`. `config.json` also contains a `formFields` array which `script.js` uses to understand which fields to collect data from during submission.

*   **To add or remove form fields:**
    1.  **Modify `index.html`:** Add or remove HTML `<div class="flex flex-col">...</div>` blocks within the `<form id="post-form">` section. Ensure each input/textarea has a `name` attribute that matches the name you want to use for the data key, and an `id` attribute.

        Example of an HTML field structure:
        ```html
        <div class="flex flex-col">
          <label for="your_field_name" class="text-gray-700 font-medium mb-1">Your Field Label*</label>
          <input type="text" id="your_field_name" name="your_field_name" class="mt-1 p-3 border ..." placeholder="Placeholder text" required>
        </div>
        ```

    2.  **Update `config.json`:** For each field you have in `index.html` that you want to be included in the persisted data payload, add a corresponding entry to the `formFields` array in `config.json`.

        Example `config.json` entry:
        ```json
        {
          "formFields": [
            // ... existing fields ...
            { "label": "Your Field Label", "name": "your_field_name", "type": "text", "placeholder": "Placeholder text", "required": true }
          ]
        }
        ```
        The `script.js` relies on this array to know which fields to look for and include in the JSON payload that gets saved.

*   **To change properties of existing fields (e.g., label, placeholder, required state):**
    *   Modify the `label` text and `placeholder` attribute directly in `index.html`.
    *   Adjust the `required` attribute in `index.html` (e.g., add `required` for mandatory fields).
    *   Update the corresponding `label`, `placeholder`, and `required` properties within the `formFields` array in `config.json` for consistency.

### 5. Customize Styling

*   This project uses Tailwind CSS. You can modify the existing Tailwind classes directly in `index.html` and `receive.html` to change colors, fonts, spacing, etc.
*   Custom CSS for gradients is embedded in the `<style>` tags. You can modify these for different color schemes.

### 6. Adjust JavaScript Logic

*   Open `script.js`.
*   On the `index.html` page, the form submission now collects data and stores it in your browser's `localStorage` using the key defined in `config.json` (`localStorageKey`). It then provides a link to `receive.html`.
*   On `receive.html`, `script.js` retrieves all stored data from `localStorage`, sorts it by timestamp (newest first), and renders it dynamically on the page.

### 7. Toggle "Receive Data" Navigation Tab

*   Open `config.json`.
*   To remove the "Receive Data" tab from the navigation header on `index.html`, set `showReceiveTab` to `false`:

    ```json
    {
      "showReceiveTab": false
    }
    ```

## License

This work is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1).

**You are free to:**

*   **Share** – copy and redistribute the material in any medium or format for any purpose, even commercially.
*   **Adapt** – remix, transform, and build upon the material for any purpose, even commercially.

**Under the following terms:**

*   **Attribution** – You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

The attribution notice "Created by Dhruv Gowda" with a link to `dhruv.ftp.sh` is enforced by `script.js` on all pages. This credit is expected to be present in the footer of `index.html` and `receive.html`. Please retain it. Any attempts to remove or modify this credit will result in the footer displaying "Access Denied" to ensure the attribution terms are met.


## etc.

* **Yes, I did obfuscate it.**
