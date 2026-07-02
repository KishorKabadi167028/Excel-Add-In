# Local Testing & Sideload Instructions

## Option 1: Test HTML File (No Add-in Required)

Use `taskpane-test.html` to test the UI and API integration locally without sideloading:

1. Open `infra/taskpane-test.html` directly in your browser (or serve it locally).
2. Click the buttons to simulate reading/writing ranges, importing tables, and exporting data.
3. Modify the API URL in Settings and it will be saved to localStorage.
4. This allows you to test the task pane UI logic before deploying to Excel.

## Option 2: Sideload via Add-in Catalog (Recommended for Dev)

### Prerequisites
- Client running on HTTPS (https://localhost:5173/)
- Server running on HTTPS (https://localhost:5001/)
- Trust your dev certificates (see below)

### Windows (Excel 2021 or Office 365)

**Step 1: Trust Dev Certificates**
```bash
# From excel-addin-server folder
dotnet dev-certs https --trust
```

**Step 2: Add the Catalog to Excel (Registry Method)**

1. Open Registry Editor (Regedit)
2. Navigate to:
   ```
   HKEY_CURRENT_USER\Software\Microsoft\Office\16.0\Excel\Security\Trusted Add-in Catalogs
   ```
   (Or `17.0` for newer Excel builds)

3. Right-click and create a new **String Value** with name: `LocalCatalog`
4. Set the value to the path of the catalog file:
   ```
   C:\Users\YourUsername\path\to\Excel-Add-In\infra\catalog.xml
   ```
   (Use the full local path to `infra/catalog.xml`)

5. Close Registry Editor and restart Excel.

**Step 3: Load the Add-in in Excel**

1. Make sure the client is running:
   ```bash
   cd excel-addin-client
   npm run dev -- --https --port 5173
   ```

2. Make sure the server is running:
   ```bash
   cd excel-addin-server
   dotnet run
   ```

3. Open Excel → Insert → **Get Add-ins** → **MY ADD-INS**
4. You should now see "Excel Add-in Starter" listed under your trusted catalogs.
5. Click it to load the add-in.
6. The custom ribbon button should appear, and clicking it opens the task pane.

### Mac (Excel for Mac)

1. Trust dev certificates:
   ```bash
   dotnet dev-certs https --trust
   ```

2. Edit the plist file for Office:
   ```bash
   nano ~/Library/Preferences/com.microsoft.Excel.plist
   ```
   (Or use a plist editor)

3. Add the catalog path to the `TrustedAddInCatalogs` array.

4. Restart Excel.

### Alternative: Host Catalog on Local Server

Instead of using a file path, you can serve the catalog from a local HTTP server:

1. Start a simple HTTP server in the `infra/` folder:
   ```bash
   cd infra
   python -m http.server 8000
   ```
   (Or use Node: `npx http-server`)

2. Add this URL to Excel's trusted catalogs:
   ```
   http://localhost:8000/catalog.xml
   ```

3. Restart Excel and follow Step 3 above.

## Troubleshooting

**Task pane won't load:**
- Verify `https://localhost:5173/` is running and accessible in a browser.
- Check browser console (F12 in task pane) for errors.
- Verify dev certificates are trusted on your OS.

**Add-in doesn't appear in MY ADD-INS:**
- Restart Excel after adding the catalog to the registry.
- Check that the manifest ID (`12345678-1234-1234-1234-1234567890ab`) is unique and hasn't been registered elsewhere.
- Try removing the catalog from the registry and re-adding it.

**CORS or HTTPS errors:**
- Ensure the API is serving on HTTPS.
- Check that the manifest's SourceLocation matches the actual client URL.
- Add CORS headers to the ASP.NET Core server if needed (see Program.cs).

## Next Steps

- Once sideloading works, you can build the client for production:
  ```bash
  npm run build
  ```
- Deploy the built files to a web server or CDN.
- Update the manifest's SourceLocation to point to the production URL.
- Publish the manifest and catalog to a trusted location (e.g., SharePoint, Azure Blob Storage).
