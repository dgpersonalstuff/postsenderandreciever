let siteConfig = {};
const ATTRIBUTION_NAME = "Dhruv Gowda";
const ATTRIBUTION_LINK = "dhruv.ftp.sh";
const CREDIT_CHECK_DELAY = 100;
function enforceCredit() {
  const footerElement = document.querySelector('footer');
  if (!footerElement) return;
  setTimeout(() => {
    let creditFound = false;
    const attributionLink = footerElement.querySelector(`a[href*="${ATTRIBUTION_LINK}"]`);
    if (attributionLink && attributionLink.textContent.includes(ATTRIBUTION_NAME)) {
      creditFound = true;
    }
    if (!creditFound) {
      footerElement.innerHTML = `<div class="container mx-auto text-center text-red-500 font-bold text-2xl py-8">Access Denied</div>`;
      document.body.style.pointerEvents = 'none';
      console.error("Credit attribution not found or modified. Access Denied.");
    }
  }, CREDIT_CHECK_DELAY);
}
function initializeUI(config) {
  const pageTitleElement = document.getElementById('page-title');
  const siteHeaderElement = document.getElementById('site-header');
  const postSectionTitleElement = document.getElementById('post-section-title');
  const receiveSectionTitle = document.getElementById('receive-section-title');
  const currentYearElement = document.getElementById('current-year');
  const navReceiveTab = document.getElementById('nav-receive-tab');
  if (pageTitleElement) pageTitleElement.textContent = config.pageTitle;
  if (siteHeaderElement) siteHeaderElement.textContent = config.siteHeader;
  if (postSectionTitleElement) postSectionTitleElement.textContent = config.postSectionTitle;
  if (receiveSectionTitle) receiveSectionTitle.textContent = config.receivePageTitle;
  if (currentYearElement) currentYearElement.textContent = new Date().getFullYear();
  if (navReceiveTab && config.showReceiveTab === false) {
    navReceiveTab.style.display = 'none';
  }
}
document.addEventListener('DOMContentLoaded', async () => {
  enforceCredit();
  try {
    const response = await fetch('./config.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    siteConfig = await response.json();
    console.log('Site configuration loaded:', siteConfig);
    initializeUI(siteConfig);
    if (document.getElementById('post-form')) {
      const postForm = document.getElementById('post-form');
      const responseContainer = document.getElementById('response-container');
      const responseData = document.getElementById('response-data');
      postForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(postForm);
        const data = {
          id: Date.now(),
          timestamp: new Date().toISOString()
        };
        siteConfig.formFields.forEach(field => {
          const value = formData.get(field.name);
          if (value !== null) {
            data[field.name] = value;
          }
        });
        try {
          const existingRequestsJSON = localStorage.getItem(siteConfig.localStorageKey);
          let existingRequests = existingRequestsJSON ? JSON.parse(existingRequestsJSON) : [];
          existingRequests.push(data);
          localStorage.setItem(siteConfig.localStorageKey, JSON.stringify(existingRequests));
          responseContainer.classList.remove('hidden');
          responseData.innerHTML = `\n          <p class="text-green-700 font-semibold mb-2">Request successfully stored!</p>\n          <p class="text-sm text-gray-600 mb-4">You can view all received data on the <a href="./receive.html" class="text-indigo-600 hover:underline">Receive Data page</a>.</p>\n          <h3 class="text-xl font-semibold text-indigo-800 mb-2">Sent Data:</h3>\n          <pre class="whitespace-pre-wrap text-sm text-gray-700 bg-white p-4 rounded-xl overflow-x-auto border border-indigo-100 shadow-inner">${JSON.stringify(data, null, 2)}</pre>\n        `;
          postForm.reset();
        } catch (error) {
          console.error('Error storing POST request:', error);
          responseContainer.classList.remove('hidden');
          responseData.textContent = `Error: ${error.message}. Please check the console for more details.`;
        }
      });
    }
    if (document.getElementById('received-data-display')) {
      const displayContentContainer = document.getElementById('display-content-container');
      const clearAllDataButton = document.getElementById('clear-all-data');
      function renderReceivedData() {
        displayContentContainer.innerHTML = '';
        const existingRequestsJSON = localStorage.getItem(siteConfig.localStorageKey);
        let existingRequests = existingRequestsJSON ? JSON.parse(existingRequestsJSON) : [];
        if (existingRequests.length === 0) {
          displayContentContainer.innerHTML = `\n            <p class="text-lg text-gray-700">No data received yet. Send a request from the <a href="./index.html" class="text-indigo-600 hover:underline">Send Request page</a>.</p>\n          `;
          return;
        }
        existingRequests.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        existingRequests.forEach(request => {
          const requestBlock = document.createElement('div');
          requestBlock.className = 'mb-8 p-6 bg-white rounded-xl shadow-md border border-gray-100';
          requestBlock.innerHTML = `\n            <h4 class="text-xl font-semibold text-indigo-800 mb-2">Request ID: ${request.id}</h4>\n            <p class="text-sm text-gray-500 mb-4">Timestamp: ${new Date(request.timestamp).toLocaleString()}</p>\n            <pre class="whitespace-pre-wrap text-sm text-gray-700 bg-indigo-50 p-4 rounded-lg overflow-x-auto border border-indigo-100">${JSON.stringify(request, null, 2)}</pre>\n          `;
          displayContentContainer.appendChild(requestBlock);
        });
      }
      renderReceivedData();
      if (clearAllDataButton) {
        clearAllDataButton.addEventListener('click', () => {
          if (confirm('Are you sure you want to clear all stored data? This action cannot be undone.')) {
            localStorage.removeItem(siteConfig.localStorageKey);
            renderReceivedData();
          }
        });
      }
    }
  } catch (error) {
    console.error('Failed to load site configuration:', error);
    document.body.innerHTML = `<div class="text-center text-red-600 text-3xl font-bold p-10">Error: Failed to load configuration. Please check console.</div>`;
  }
});
