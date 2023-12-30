// app.js

const http = require('http');
const fs = require('fs').promises;

// Function to simulate processing time for a component
async function processComponent(componentName, processingTime, res) {
  return new Promise(resolve => {
    setTimeout(async () => {
      const [htmlContent, cssContent] = await Promise.all([
        fs.readFile(`${componentName.toLowerCase()}.html`, 'utf-8'),
        fs.readFile(`${componentName.toLowerCase()}.css`, 'utf-8').catch(() => ''), // Optional: Handle missing CSS file
      ]);

      // Send the HTML content
      res.write(`<div id="${componentName.toLowerCase()}">${htmlContent}</div>`);

      // Send the CSS content in a <style> tag
      res.write(`<style>${cssContent}</style>`);

      resolve();
      console.log(`${componentName} processed.`);
    }, processingTime);
  });
}

const server = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<html><head><title>BigPipe Example</title></head><body>');

  // Simulate processing and sending components asynchronously
  await processComponent('Header', 1000, res);
  await processComponent('Sidebar', 1500, res);
  await processComponent('Main Content', 2000, res);
  await processComponent('Footer', 500, res);

  // Finish the response
  res.end('</body></html>');
});

const PORT = 3000;
const IP = '127.0.0.1';

server.listen(PORT, IP, () => {
  console.log(`Server running at http://${IP}:${PORT}/`);
});
