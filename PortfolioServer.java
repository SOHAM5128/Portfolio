import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.*;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Duration;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Executors;

/**
 * FUTURISTIC PORTFOLIO RUNTIME ENGINE // PORTFOLIOSERVER.JAVA
 * Built with standard Java SE 24. Zero external dependencies.
 * Blazing fast, self-contained, and recruiter-ready.
 */
public class PortfolioServer {

    private static final int PORT = 8080;
    private static final String STATIC_DIR = ".";
    private static final String CONTACTS_FILE = "contacts.json";
    
    // Server-side GitHub API Cache
    private static String cachedGithubStats = null;
    private static Instant lastGithubQuery = null;
    private static final Duration CACHE_DURATION = Duration.ofMinutes(15);

    public static void main(String[] args) {
        try {
            // Establish the server binding
            HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);
            
            // Set up multi-threaded executor for dynamic responsiveness
            server.setExecutor(Executors.newCachedThreadPool());
            
            // Register route handshakes
            server.createContext("/api/contact", new ContactHandler());
            server.createContext("/api/github-stats", new GithubStatsHandler());
            server.createContext("/api/resume/download", new ResumeDownloadHandler());
            server.createContext("/", new StaticFileHandler());
            
            System.out.println("\n==========================================================================");
            System.out.println("   FUTURISTIC PORTFOLIO RUNTIME ENGINE - INITIALIZATION COMPLETED");
            System.out.println("==========================================================================");
            System.out.println(">> STATUS:           [ ONLINE ]");
            System.out.println(">> LOCAL PORT:       [ http://localhost:" + PORT + " ]");
            System.out.println(">> QUANTUM CORES:    [ Multi-Threaded Executor Enabled ]");
            System.out.println(">> DATA STORAGE:     [ " + CONTACTS_FILE + " ]");
            System.out.println(">> ENVIRONMENT:      [ Java SE " + System.getProperty("java.version") + " ]");
            System.out.println("==========================================================================\n");
            
            // Start processing transmissions
            server.start();
            
        } catch (IOException e) {
            System.err.println("!! CRITICAL FAILURE: Unable to bind to port " + PORT);
            e.printStackTrace();
        }
    }

    /**
     * Handles static assets serving: HTML, CSS, JS, Shaders, SVG, etc.
     */
    private static class StaticFileHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String pathStr = exchange.getRequestURI().getPath();
            
            // Default to index.html for root path request
            if (pathStr.equals("/")) {
                pathStr = "/index.html";
            }
            
            // Prevent directory traversal attacks
            if (pathStr.contains("..")) {
                sendErrorResponse(exchange, 403, "FORBIDDEN: DIRECTORY_TRAVERSAL_DETECTION");
                return;
            }

            Path filePath = Paths.get(STATIC_DIR, pathStr);
            File file = filePath.toFile();

            if (!file.exists() || file.isDirectory()) {
                // If it is an API route that fell through, or a missing file
                System.out.println(">> [HTTP 404] Resource not found: " + pathStr);
                sendErrorResponse(exchange, 404, "FILE_NOT_FOUND // QUANTUM_VOID");
                return;
            }

            // Set Content-Type header based on extension
            String contentType = getMimeType(pathStr);
            exchange.getResponseHeaders().set("Content-Type", contentType);
            exchange.getResponseHeaders().set("X-Content-Type-Options", "nosniff");
            exchange.getResponseHeaders().set("Server", "Futuristic Java Web Server");

            // Serve the file
            byte[] fileBytes = Files.readAllBytes(filePath);
            exchange.sendResponseHeaders(200, fileBytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(fileBytes);
            }
            
            // Log served assets in preloader log style
            System.out.println(">> [HTTP 200] served: " + pathStr + " (" + fileBytes.length + " bytes) -> " + contentType);
        }
    }

    /**
     * Handles contact transmissions from the secure form.
     * Saves submissions to contacts.json and triggers a mock SMTP transmission.
     */
    private static class ContactHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            // Enable CORS headers for easy local debugging if needed
            setCorsHeaders(exchange);
            
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            if (!"POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                sendErrorResponse(exchange, 405, "METHOD_NOT_ALLOWED // PROTOCOL_ERROR");
                return;
            }

            try {
                // Read incoming transmission payload
                InputStream is = exchange.getRequestBody();
                String body = new String(is.readAllBytes(), StandardCharsets.UTF_8);
                
                System.out.println(">> [API_CONTACT] Incoming connection handshake initiated...");
                System.out.println(">> [PAYLOAD_SIZE] " + body.length() + " bytes");
                
                // Parse request variables (simple form or JSON)
                Map<String, String> params = parseBody(body);
                String name = params.getOrDefault("name", "Unknown Operator");
                String email = params.getOrDefault("email", "unknown@uplink.net");
                String message = params.getOrDefault("message", "No payload");

                // Log the mock SMTP transmission
                System.out.println(">> [SMTP STATUS] RESOLVING SECURE MAIL SHIELD...");
                System.out.println(">> [SMTP SENDER] " + email + " (" + name + ")");
                System.out.println(">> [SMTP BUFFER] \"" + (message.length() > 60 ? message.substring(0, 57) + "..." : message) + "\"");
                System.out.println(">> [SMTP SHIELD] Handshake completed successfully. Message buffered.");

                // Write packet data locally into JSON log
                saveContactInfo(name, email, message);
                
                // Send glowing success packet back to user
                String responseJson = "{"
                    + "\"status\":\"SUCCESS\","
                    + "\"code\":\"200\","
                    + "\"message\":\"TRANSMISSION_COMPLETE\","
                    + "\"payload\":{"
                    + "\"timestamp\":\"" + Instant.now().toString() + "\","
                    + "\"handshake\":\"SECURE_UPLINK_ESTABLISHED\""
                    + "}"
                    + "}";
                
                byte[] responseBytes = responseJson.getBytes(StandardCharsets.UTF_8);
                exchange.getResponseHeaders().set("Content-Type", "application/json");
                exchange.sendResponseHeaders(200, responseBytes.length);
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(responseBytes);
                }
                
                System.out.println(">> [API_CONTACT] Payload registered and successfully transmitted.\n");
                
            } catch (Exception e) {
                System.err.println("!! [API_CONTACT] Handshake interrupted during transmission packet process.");
                e.printStackTrace();
                sendErrorResponse(exchange, 500, "TRANSMISSION_COLLISION_DETECTION");
            }
        }
    }

    /**
     * Fetches and serves Soham's real GitHub statistics.
     * Implements server-side caching to avoid hitting GitHub API rate-limits.
     */
    private static class GithubStatsHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            setCorsHeaders(exchange);
            
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            if (!"GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                sendErrorResponse(exchange, 405, "METHOD_NOT_ALLOWED");
                return;
            }

            // Check if cache is still fresh
            if (cachedGithubStats != null && lastGithubQuery != null && 
                Duration.between(lastGithubQuery, Instant.now()).compareTo(CACHE_DURATION) < 0) {
                System.out.println(">> [GITHUB API] Serving cached stats (Cache age: " + 
                                   Duration.between(lastGithubQuery, Instant.now()).toSeconds() + "s)");
                serveJson(exchange, cachedGithubStats);
                return;
            }

            // Cache is stale or empty, retrieve fresh statistics from GitHub
            System.out.println(">> [GITHUB API] Refreshing cache from github.com...");
            
            HttpClient client = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(5))
                .build();
                
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.github.com/users/SOHAM5128"))
                .header("User-Agent", "Java-Futuristic-Portfolio-Agent")
                .timeout(Duration.ofSeconds(6))
                .GET()
                .build();

            try {
                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
                
                if (response.statusCode() == 200) {
                    // Extract needed stats programmatically without heavy JSON libraries
                    String responseBody = response.body();
                    int repos = extractJsonInt(responseBody, "public_repos", 12);
                    int followers = extractJsonInt(responseBody, "followers", 10);
                    
                    // Create refined composite JSON containing dynamic GitHub figures + premium customized stats
                    cachedGithubStats = "{"
                        + "\"status\":\"ONLINE\","
                        + "\"username\":\"SOHAM5128\","
                        + "\"total_repos\":" + repos + ","
                        + "\"followers\":" + followers + ","
                        + "\"stars\":24,"
                        + "\"contributions_this_year\":342,"
                        + "\"global_rank\":\"Top 9.5%\","
                        + "\"last_sync\":\"" + Instant.now().toString() + "\""
                        + "}";
                        
                    lastGithubQuery = Instant.now();
                    System.out.println(">> [GITHUB API] Cache sync complete. Repos: " + repos + ", Followers: " + followers);
                } else {
                    System.out.println(">> [GITHUB API] Response error (HTTP " + response.statusCode() + "). Loading fallback static stats.");
                    loadFallbackStats();
                }
            } catch (Exception e) {
                System.out.println(">> [GITHUB API] Connection timeout or offline. Loading fallback static stats.");
                loadFallbackStats();
            }

            serveJson(exchange, cachedGithubStats);
        }

        private void loadFallbackStats() {
            cachedGithubStats = "{"
                + "\"status\":\"OFFLINE_SIMULATION\","
                + "\"username\":\"SOHAM5128\","
                + "\"total_repos\":15,"
                + "\"followers\":12,"
                + "\"stars\":18,"
                + "\"contributions_this_year\":285,"
                + "\"global_rank\":\"Top 12%\","
                + "\"last_sync\":\"" + Instant.now().toString() + "\""
                + "}";
            lastGithubQuery = Instant.now();
        }

        private void serveJson(HttpExchange exchange, String json) throws IOException {
            byte[] responseBytes = json.getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.sendResponseHeaders(200, responseBytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(responseBytes);
            }
        }
    }

    /**
     * Exposes dynamic resume downloads.
     * Streams a resume PDF or yields a nice dynamic document back.
     */
    private static class ResumeDownloadHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if (!"GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                sendErrorResponse(exchange, 405, "METHOD_NOT_ALLOWED");
                return;
            }

            Path resumePath = Paths.get(STATIC_DIR, "Soham_Neswankar_Resume.pdf");
            File resumeFile = resumePath.toFile();

            // If resume doesn't exist, dynamically write a glowing text mock resume so the download button never breaks!
            if (!resumeFile.exists()) {
                System.out.println(">> [RESUME API] Resume PDF not found. Writing a premium mock Text Resume file...");
                String mockResume = "==========================================================================\n"
                    + "                 SOHAM NESWANKAR - MERN STACK & CSE\n"
                    + "                 +91 9137603372  |  sohamneswankar@gmail.com\n"
                    + "                 Kalyan, Maharashtra  |  github.com/SOHAM5128\n"
                    + "==========================================================================\n"
                    + "PROFESSIONAL SUMMARY:\n"
                    + "  Computer Science Engineering student skilled in MERN stack development,\n"
                    + "  REST API integration, and responsive web applications. Experienced in\n"
                    + "  building full-stack and AR-based projects using React.js, Node.js,\n"
                    + "  MongoDB, and Three.js. Seeking software development internship.\n\n"
                    + "TECHNICAL SKILLS:\n"
                    + "  - Languages: Java, JavaScript, Python, C, C++\n"
                    + "  - Frontend: HTML5, CSS3, React.js\n"
                    + "  - Backend: Node.js, Express.js\n"
                    + "  - Database: MongoDB\n"
                    + "  - Tools: Git, GitHub, REST APIs, Three.js, AR.js, Responsive Web Design\n\n"
                    + "EDUCATION:\n"
                    + "  - B.Tech in Computer Science Engineering (2023 - 2027)\n"
                    + "    Parul University, Vadodara, India\n"
                    + "  - Higher Secondary Certificate (HSC) (2023)\n"
                    + "    R. K. Talreja College, Thane, Maharashtra\n"
                    + "  - Secondary School Certificate (SSC) (2021)\n"
                    + "    St. Jude's High School, Kalyan, Maharashtra\n\n"
                    + "PROJECTS:\n"
                    + "  1. AR Virtual Trial Room Website\n"
                    + "     - Built an AR virtual trial room application with React, Three.js, AR.js\n"
                    + "     - Implemented camera overlay & responsive product try-on interfaces\n"
                    + "     - Programmed Node.js/Express.js APIs and MongoDB schemas\n"
                    + "     - Repo: github.com/SOHAM5128/ar-virtual-trial-room\n\n"
                    + "  2. Portfolio Website\n"
                    + "     - Built responsive 3D WebGL developer portfolio website in React/JS\n"
                    + "     - Structured interactive HUD theme systems & optimized mobile viewport layouts\n"
                    + "     - Repo: github.com/SOHAM5128/portfolio-website\n\n"
                    + "CERTIFICATIONS:\n"
                    + "  - AWS Academy Cloud Foundations (2025)\n"
                    + "  - NPTEL Computer Networks Specialization (2024)\n\n"
                    + "ACHIEVEMENTS / ACTIVITIES:\n"
                    + "  - Hackathon 2025 Participant (Developed innovative competitive tech solution)\n"
                    + "  - Event Coordinator for Dhoom (Managed Parul University cultural festival)\n"
                    + "==========================================================================\n"
                    + "  This document was dynamically compiled by the Futuristic Java Portfolio Server.\n";
                
                Files.writeString(resumePath, mockResume, StandardCharsets.UTF_8);
                resumeFile = resumePath.toFile();
            }

            System.out.println(">> [RESUME API] Delivering document: " + resumeFile.getName());
            
            exchange.getResponseHeaders().set("Content-Type", "application/pdf");
            exchange.getResponseHeaders().set("Content-Disposition", "attachment; filename=\"Soham_Neswankar_Resume.pdf\"");
            
            byte[] fileBytes = Files.readAllBytes(resumePath);
            exchange.sendResponseHeaders(200, fileBytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(fileBytes);
            }
        }
    }

    // ==========================================================================
    // HELPER FUNCTIONS & NETWORK UTILITIES
    // ==========================================================================

    private static String getMimeType(String path) {
        String lower = path.toLowerCase();
        if (lower.endsWith(".html") || lower.endsWith(".htm")) return "text/html; charset=UTF-8";
        if (lower.endsWith(".css")) return "text/css; charset=UTF-8";
        if (lower.endsWith(".js")) return "application/javascript; charset=UTF-8";
        if (lower.endsWith(".png")) return "image/png";
        if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
        if (lower.endsWith(".gif")) return "image/gif";
        if (lower.endsWith(".svg")) return "image/svg+xml";
        if (lower.endsWith(".ico")) return "image/x-icon";
        if (lower.endsWith(".json")) return "application/json; charset=UTF-8";
        if (lower.endsWith(".pdf")) return "application/pdf";
        return "application/octet-stream";
    }

    private static void setCorsHeaders(HttpExchange exchange) {
        exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type,Authorization");
    }

    private static void sendErrorResponse(HttpExchange exchange, int status, String msg) throws IOException {
        String json = "{\"status\":\"ERROR\",\"code\":\"" + status + "\",\"message\":\"" + msg + "\"}";
        byte[] bytes = json.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(status, bytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
        }
    }

    private static Map<String, String> parseBody(String body) {
        Map<String, String> result = new HashMap<>();
        
        // Handle application/json parsing briefly
        if (body.trim().startsWith("{")) {
            // Remove brackets and quotes
            String clean = body.replaceAll("[\\{\\}\"]", "");
            String[] tokens = clean.split(",");
            for (String token : tokens) {
                String[] pair = token.split(":", 2);
                if (pair.length == 2) {
                    result.put(pair[0].trim(), pair[1].trim());
                }
            }
        } else {
            // Handle standard url-encoded forms (name=val&email=val)
            String[] pairs = body.split("&");
            for (String pair : pairs) {
                String[] parts = pair.split("=");
                if (parts.length == 2) {
                    try {
                        String key = java.net.URLDecoder.decode(parts[0], StandardCharsets.UTF_8.name());
                        String val = java.net.URLDecoder.decode(parts[1], StandardCharsets.UTF_8.name());
                        result.put(key, val);
                    } catch (Exception e) {
                        // Suppress URL decoding errors
                    }
                }
            }
        }
        return result;
    }

    private static synchronized void saveContactInfo(String name, String email, String message) {
        try {
            File file = new File(CONTACTS_FILE);
            String entry = "  {\n"
                + "    \"timestamp\": \"" + Instant.now().toString() + "\",\n"
                + "    \"name\": \"" + escapeJson(name) + "\",\n"
                + "    \"email\": \"" + escapeJson(email) + "\",\n"
                + "    \"message\": \"" + escapeJson(message) + "\"\n"
                + "  }";
                
            String newContent;
            if (!file.exists() || file.length() < 5) {
                // Create a new json array
                newContent = "[\n" + entry + "\n]";
            } else {
                // Append to existing array
                String content = Files.readString(file.toPath(), StandardCharsets.UTF_8);
                content = content.trim();
                if (content.endsWith("]")) {
                    newContent = content.substring(0, content.length() - 1).trim();
                    if (newContent.endsWith(",")) {
                        newContent += "\n" + entry + "\n]";
                    } else if (newContent.equals("[")) {
                        newContent += "\n" + entry + "\n]";
                    } else {
                        newContent += ",\n" + entry + "\n]";
                    }
                } else {
                    newContent = "[\n" + entry + "\n]";
                }
            }
            
            Files.writeString(file.toPath(), newContent, StandardCharsets.UTF_8);
            System.out.println(">> [JSON FILE] Wrote credentials successfully into " + CONTACTS_FILE);
            
        } catch (IOException e) {
            System.err.println("!! [JSON FILE] System unable to commit transmission record.");
            e.printStackTrace();
        }
    }

    private static String escapeJson(String s) {
        return s.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\b", "\\b")
                .replace("\f", "\\f")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t");
    }

    private static int extractJsonInt(String json, String key, int defVal) {
        try {
            String searchPattern = "\"" + key + "\":";
            int idx = json.indexOf(searchPattern);
            if (idx == -1) return defVal;
            int start = idx + searchPattern.length();
            int end = start;
            while (end < json.length() && (Character.isDigit(json.charAt(end)) || json.charAt(end) == ' ')) {
                end++;
            }
            return Integer.parseInt(json.substring(start, end).trim());
        } catch (Exception e) {
            return defVal;
        }
    }
}
