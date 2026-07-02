# Excel Add-In Starter

This repository contains a starter scaffold for an Excel Add-in (React task pane) and an ASP.NET Core 7 Web API backend with EF Core and SQL Server support.

Branch: add/excel-addin-starter

Folders:
- excel-addin-client/ (React + TypeScript task pane)
- excel-addin-server/ (ASP.NET Core 7 Web API)
- infra/ (docker-compose for SQL Server)

Quick start (high level):
1. Start SQL Server for dev: docker-compose up -d (from infra/)
2. Run server: cd excel-addin-server && dotnet restore && dotnet run
3. Run client: cd excel-addin-client && npm install && npm run dev
4. Sideload the manifest in Excel (see client/manifest/manifest.xml). Update the taskpane URL if needed.

Note: Authentication is intentionally omitted.
