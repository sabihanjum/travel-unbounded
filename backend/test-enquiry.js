const http = require("http");

const targetUrl = process.env.API_URL || "http://localhost:5000/api/enquiry";
const parsedUrl = new URL(targetUrl);

// Test Payload (Future date, valid email, matching schema)
const testData = JSON.stringify({
  fullName: "Test User From Console",
  email: "console.test@example.com",
  countryCode: "+91",
  contactNumber: "9876543210",
  preferredDestination: "Andaman",
  dateOfTravel: "2027-01-15",
  numberOfPeople: 4,
  hotelCategory: "Luxury",
  numberOfChildren: 2
});

const options = {
  hostname: parsedUrl.hostname,
  port: parsedUrl.port || (parsedUrl.protocol === "https:" ? 443 : 80),
  path: parsedUrl.pathname,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(testData)
  }
};

console.log(`Sending mock enquiry to ${targetUrl}...`);

const req = http.request(options, (res) => {
  let body = "";
  
  res.on("data", (chunk) => {
    body += chunk;
  });
  
  res.on("end", () => {
    console.log(`\nHTTP Response Status: ${res.statusCode}`);
    try {
      const jsonResponse = JSON.parse(body);
      console.log("Recorded Server Response:\n", JSON.stringify(jsonResponse, null, 2));
    } catch (err) {
      console.log("Recorded Server Response (Raw Text):\n", body);
    }
  });
});

req.on("error", (e) => {
  console.error(`\nError: Connection failed. Is the backend server running on ${parsedUrl.port}?`);
  console.error(`Detail: ${e.message}`);
});

req.write(testData);
req.end();
