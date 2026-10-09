Smart Investment Map Platform

A Digital Platform for Managing, Analyzing, and Presenting Investment Opportunities

The Smart Investment Map Platform is a web based platform designed to organize, analyze, and visualize investment opportunities through a unified digital environment.

The platform connects investment opportunity data with sectoral, geographic, financial, operational, infrastructure, and readiness information. It provides tools for searching, filtering, visualization, dashboards, geographic mapping, API access, and preliminary investment analysis.

The platform combines:

- PostgreSQL for structured data management
- FastAPI for backend services and REST APIs
- React and TypeScript for the web interface
- Leaflet for interactive geographic mapping
- A rule-based investment analysis engine
- Interactive dashboards and indicators
- Swagger/OpenAPI for API documentation
- Render for public deployment
- GitHub for source-code management

-------------------------------------------------------------

Development Copy and Local Run

This repository (Interactive-Investment-Map) is an independent development copy of the original investment-ai-platform project. It is not connected to the publicly deployed platform described in the Deployment section below, and it must not point to the production backend or database.

Backend (from the backend folder, PowerShell):

powershell
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python -m uvicorn app.main:app --reload


- Set DATABASE_URL in backend/.env, for example:
  postgresql+psycopg2://postgres:YOUR_PASSWORD@127.0.0.1:5432/investment_db
  Special characters in the password must be URL-encoded (for example @ becomes %40).
- To populate an empty database, either import investment_db_inserts.sql with psql, or set AUTO_SEED_DB=true in backend/.env so the backend imports it on first start (only if the investment_opportunities table does not exist). Auto-import is off by default.
- Diagnostic endpoints (/api/db-test, /api/db-stats, /api/cache/clear) return 404 unless ENABLE_DEBUG_ENDPOINTS=true is set.
- Authentication: every /api route except /api/health and /api/auth/login requires a Bearer token. Set JWT_SECRET in backend/.env (see .env.example), then run python create_admin.py once from the backend folder to create the users table and the first administrator. Administrators create further accounts through POST /api/users (there is no self-registration).
- Auth endpoints: POST /api/auth/login, GET /api/auth/me, POST /api/auth/change-password, GET/POST /api/users and PATCH /api/users/{id}/active (admin only). In /docs, log in, then use the Authorize button with the returned token.
- uvicorn --reload does not pick up .env changes. Restart the backend after editing .env.
- API: http://127.0.0.1:8000 - Swagger: http://127.0.0.1:8000/docs - Health: http://127.0.0.1:8000/api/health

Frontend (from the frontend folder):

powershell
npm install
npm run dev


- The frontend runs on http://localhost:5173.
- The backend address is read from VITE_API_URL (default http://127.0.0.1:8000). See frontend/.env.example.
- If PowerShell blocks npm scripts, run: Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned (or use npm.cmd).
- CORS allows localhost:5173 by default. Use the CORS_ORIGINS environment variable (comma-separated) for other origins.

Never commit .env files or credentials. Only .env.example files belong in the repository.

-------------------------------------------------------------

Contents

- [Overview](overview)
- [Objectives](objectives)
- [Main Features](main-features)
- [Data Structure](data-structure)
- [Technical Architecture](technical-architecture)
- [Database](database)
- [Backend and API](backend-and-api)
- [Frontend](frontend)
- [GIS and Interactive Map](gis-and-interactive-map)
- [Investment Analysis Model](investment-analysis-model)
- [Dashboard and Indicators](dashboard-and-indicators)
- [Current Data](current-data)
- [Testing and Validation](testing-and-validation)
- [Deployment](deployment)
- [Local Development](local-development)
- [Repository Structure](repository-structure)
- [Version Control](version-control)
- [Scalability and Future Development](scalability-and-future-development)
- [Security and Operational Architecture](security-and-operational-architecture)
- [Technologies](technologies)
- [Official Documentation](official-documentation)
- [Main Links](main-links)
- [Important Notes](important-notes)
- [Current Platform Status](current-platform-status)
- [License and Usage](license-and-usage)

-------------------------------------------------------------

Overview

The platform provides a unified environment for managing investment opportunities instead of relying on scattered files or disconnected data sources that are difficult to search, connect, and analyze.

Each investment opportunity is represented as an integrated record that can be connected to:

- Sector and activity
- Geographic location
- Financial information
- Project information
- Employment data
- Infrastructure
- Site characteristics
- Approvals and readiness
- Related entities
- Investors
- Contracts
- Attachments
- Analytical results

The data is stored in a relational PostgreSQL database and exposed through REST APIs. The frontend consumes these services and presents the information through an Arabic RTL web interface designed for both desktop and mobile screens.

In addition to data presentation, the platform provides a preliminary analytical layer based on weighted indicators to support structured investment assessment.

-------------------------------------------------------------

Objectives

The platform focuses on the following objectives:

1. Organize investment opportunity data in a structured relational database.
2. Standardize the information associated with each opportunity.
3. Connect investment opportunities with their geographic locations.
4. Provide fast search and filtering capabilities.
5. Provide dashboards for aggregated investment indicators.
6. Enable analysis by sectors, locations, statuses, and readiness.
7. Present financial, operational, geographic, and infrastructure information.
8. Provide investment readiness indicators.
9. Apply a transparent weighted-indicator model for preliminary investment assessment.
10. Provide automated opportunity analysis through backend API services.
11. Establish a scalable technical architecture for future integrations and data expansion.

-------------------------------------------------------------

Main Features

1. Investment Opportunity Management

The platform provides a structured interface for browsing investment opportunities, searching records, applying filters, opening detailed opportunity pages, and accessing their geographic locations.

2. Opportunity Details

Each opportunity can include:

- Basic information
- Sector and activity
- Geographic location
- Coordinates
- Area and proposed use
- Financial information
- Project details
- Employment information
- Infrastructure
- Site characteristics
- Readiness and approvals
- Related entities
- Investors
- Contracts
- Attachments
- Analytical results

3. Search and Filtering

The platform supports filtering according to criteria such as:

- Sector
- Activity
- Status
- Location
- Investment readiness
- Opportunity characteristics

4. Dashboard

The dashboard provides an overview of the investment opportunity database, including:

- Total opportunities
- Active opportunities
- Ready opportunities
- Investment value
- Number of sectors
- Number of regions
- Sector distribution
- Geographic distribution
- Status distribution

5. Interactive Map

Investment opportunities are displayed on an interactive map.

Users can:

- View opportunity locations
- Explore geographic distribution
- View summary information
- Open opportunity details
- Analyze the spatial distribution of investment opportunities

6. Investment Analysis

The platform provides a structured preliminary assessment model using weighted indicators related to:

- Market
- Financial factors
- Location
- Infrastructure
- Readiness
- Employment
- Risk

7. REST API

The backend exposes REST API services for retrieving investment data and executing analytical services.

Interactive API documentation is provided through Swagger/OpenAPI.

-------------------------------------------------------------

Data Structure

The platform separates different categories of information into related database tables rather than storing all information in a single table.

Investment Opportunities

Opportunity records may include:

- Opportunity code
- Opportunity name
- Sector
- Activity
- Status
- Description
- Location
- Geographic coordinates
- Area
- Production capacity
- Reserves or resources where applicable

Financial Data

Financial records contain available investment values and other financial indicators associated with each opportunity.

Employment Data

Employment information contains workforce requirements and potential job opportunities associated with investment projects.

Geographic and Administrative Data

Investment opportunities are connected to geographic and administrative location structures.

Geographic coordinates are stored to support mapping and spatial analysis.

Infrastructure

The platform supports multiple infrastructure categories, including:

- Roads
- Electricity
- Water
- Sewage
- Telecommunications
- Gas
- Irrigation
- Other infrastructure elements

Site Characteristics

Site-related information may include:

- Availability of raw materials
- Market accessibility
- Access to ports and airports
- Expansion potential
- Labor availability
- Strategic location

Approvals, Entities, Investors, Contracts, and Attachments

The database supports relationships between investment opportunities and:

- Approvals
- Organizations and entities
- Investors
- Contracts
- Attachments and supporting documents

-------------------------------------------------------------

Technical Architecture

The platform follows a layered architecture separating data storage, backend services, analytical processing, and the frontend.

text
PostgreSQL
    ↓
Opportunity Service
    ↓
FastAPI / REST API
    ↓
AI Analyzer
    ↓
React Frontend


System Layers

Data Layer

PostgreSQL is used as the primary relational database for storing investment opportunities and their related information.

Service Layer

FastAPI provides backend services and handles communication between the frontend and the database.

Analysis Layer

The analysis component currently uses predefined indicators, rules, and weights to generate preliminary investment assessment results.

Presentation Layer

React and TypeScript are used to build the frontend interface, dashboards, opportunity pages, analytical views, and other components.

Geographic Layer

Leaflet is used to display investment opportunities geographically and connect location data with opportunity records.

-------------------------------------------------------------

Database

The platform uses PostgreSQL as its primary database management system.

Key database tables and components include:

text
investment_opportunities
sectors
sub_sectors
locations
project_details
financial_data
employment
entities
opportunity_approvals
opportunity_infrastructure
opportunity_site_features
opportunity_attachments
investors
contracts


This structure separates different categories of information while maintaining relationships between them.

The relational design also makes it easier to extend the platform with additional data categories and services.

-------------------------------------------------------------

Backend and API

The backend is developed using Python and FastAPI.

The backend is responsible for:

- Connecting to PostgreSQL
- Retrieving investment opportunities
- Retrieving detailed opportunity information
- Providing analytical services
- Returning structured JSON responses
- Providing OpenAPI documentation
- Processing frontend requests

Main API Endpoints

text
GET  /api/health
GET  /api/opportunities
GET  /api/opportunities/{code}
GET  /api/ai/opportunity/{opportunity_code}
POST /api/ai/opportunities/{opportunity_id}/analyze


Additional database and service endpoints are available within the deployed API.

API Documentation

The platform provides an interactive Swagger/OpenAPI interface where API endpoints can be inspected and tested.

-------------------------------------------------------------

Frontend

The frontend is developed using:

- React
- TypeScript
- Vite
- Tailwind CSS

The interface is designed primarily for Arabic RTL usage and is responsive across desktop and mobile screens.

Main Pages and Modules

The current platform includes interfaces for:

- Dashboard
- Investment Opportunities
- Opportunity Details
- Interactive Map
- Sectors
- Locations
- Investors
- Financial Data
- Contracts
- Attachments
- Entities
- Ready Opportunities
- New Opportunities
- Investment Analysis
- Reports
- Data Tables

The frontend communicates with the backend through the deployed REST API rather than connecting directly to PostgreSQL.

-------------------------------------------------------------

GIS and Interactive Map

The platform uses Leaflet to display investment opportunities geographically.

Each opportunity can contain geographic coordinates that allow its location to be displayed on the interactive map.

The map supports:

- Displaying opportunity locations
- Exploring geographic distribution
- Viewing summary information
- Navigating to opportunity details
- Supporting spatial analysis of investment opportunities

The geographic component can be expanded in future versions through additional GIS layers and more advanced spatial analysis.

-------------------------------------------------------------

Investment Analysis Model

The platform currently uses a Rule-Based / Weighted Indicators model for preliminary investment assessment.

The model is designed to provide a transparent and interpretable assessment based on predefined indicators and weights.

Current Weights

| Indicator      |   Weight |
| -------------- | -------: |
| Market         |      20% |
| Financial      |      20% |
| Location       |      15% |
| Infrastructure |      15% |
| Readiness      |      15% |
| Employment     |      10% |
| Risk           |       5% |
| Total      | 100% |

The indicators are combined according to their predefined weights to produce an overall investment attractiveness score and analytical interpretation.

Current Nature of the Analysis

The current system is not a machine-learning model trained on historical investment data.

Instead, it uses predefined rules, indicators, and weights.

This approach makes the current assessment model transparent, explainable, and easier to review or modify.

Future versions may incorporate Machine Learning or predictive models once sufficient reliable historical investment data becomes available.

-------------------------------------------------------------

Dashboard and Indicators

The dashboard indicators are connected to the actual PostgreSQL data through the backend API.

The main indicators include:

- Total number of opportunities
- Active opportunities
- Ready opportunities
- Total investment value
- Number of sectors
- Number of regions
- Sector distribution
- Geographic distribution
- Opportunity status distribution

The core dashboard indicators are not based on static values embedded in the frontend.

-------------------------------------------------------------

Current Data

The current database contains investment opportunity records and supporting data distributed across the main database tables.

Current verified record counts include:

text
investment_opportunities      : 36
sectors                       : 10
sub_sectors                   : 29
locations                     : 35
project_details               : 35
financial_data                : 36
employment                    : 35
entities                      : 9
opportunity_approvals         : 35
opportunity_infrastructure    : 35
opportunity_site_features     : 35
opportunity_attachments       : 9


The number of records differs between tables because some related information is optional or is not currently available for every investment opportunity.

-------------------------------------------------------------

Testing and Validation

The main platform components have been tested throughout the development and deployment process.

Database

Testing included:

- PostgreSQL connection verification
- Database availability
- Data existence verification
- Relationship and related-data checks

API

Testing included:

- Health Check
- Opportunity list retrieval
- Opportunity retrieval by code
- Analysis service
- Swagger/OpenAPI
- JSON response validation

Frontend

Testing included:

- Data loading
- Dashboard indicators
- Search and filtering
- Opportunity listing
- Opportunity details
- Interactive map
- Investment analysis
- Navigation between pages

Mobile Devices

The deployed version has also been tested on mobile devices.

Testing confirmed that the public frontend can communicate with the deployed backend and correctly display opportunities, indicators, and opportunity details.

-------------------------------------------------------------

Deployment

The platform is publicly deployed on Render using separate frontend and backend services.

Frontend

The frontend is deployed as a static web application.

Backend

The backend is deployed as a web service running the FastAPI application.

The production frontend connects to the deployed backend API rather than the local development server.

Public Platform

Frontend:

https://investment-ai-frontend.onrender.com

Backend API:

https://investment-ai-platform.onrender.com

Swagger / OpenAPI:

https://investment-ai-platform.onrender.com/docs

Health Check:

https://investment-ai-platform.onrender.com/api/health

-------------------------------------------------------------

Local Development

Requirements

The development environment requires:

- Python
- Node.js
- npm
- PostgreSQL
- Git

Run Backend

powershell
cd C:\Projects\investment-ai-platform\backend

python -m uvicorn app.main:app --reload


Local API:

text
http://127.0.0.1:8000


Local Swagger:

text
http://127.0.0.1:8000/docs


Run Frontend

powershell
cd C:\Projects\investment-ai-platform\frontend

npm install
npm run dev


On Windows environments where PowerShell blocks `npm.ps1`, the following command can be used:

powershell
npm.cmd run dev


Database Configuration

The backend uses the `DATABASE_URL` environment variable to connect to PostgreSQL.

The variable must be configured according to the target development or deployment environment.

---

Repository Structure

text
investment-ai-platform/

│

├── backend/

│      ├── app/

│      ├── requirements.txt

│      └── ...
│

├── frontend/

│      ├── src/

│      ├── public/

│      ├── package.json

│      └── ...
│

└── README.md


- Backend

Contains the backend application, database configuration, API routes, services, data models, and analytical logic.

- Frontend

Contains the React components, pages, services, styles, images, and other frontend assets.

The repository structure above represents the current source-code structure used by the deployed platform.

-------------------------------------------------------------

Version Control

The project uses Git for version control and GitHub for source-code hosting.

Development changes are committed to the repository and can be deployed through the connected Render services according to the deployment configuration.

Repository:

https://github.com/heysem53/investment-ai-platform

-------------------------------------------------------------

Scalability and Future Development

The current architecture is designed to allow additional services and data sources to be introduced without fundamentally changing the core system layers.

Possible future development areas include:

- Adding additional investment opportunities
- Expanding sectors and activities
- Adding more GIS layers
- Developing advanced spatial analysis
- Introducing Machine Learning when sufficient historical data becomes available
- Adding authentication
- Implementing user and role management
- Adding audit logs
- Improving document and attachment management
- Adding exportable reports
- Integrating external data sources
- Developing automated data synchronization
- Adding additional analytical indicators
- Expanding investment decision-support capabilities

-------------------------------------------------------------

Security and Operational Architecture

The platform separates the frontend from the database.

The frontend does not connect directly to PostgreSQL. Instead, requests are handled through the backend API.

This architecture provides a foundation for future implementation of:

- Authentication
- Authorization
- User management
- Role-based access control
- API protection
- Access logging
- Sensitive-data management
- Additional security controls

-------------------------------------------------------------

Technologies

| Area               | Technology              |
| ------------------ | ----------------------- |
| Backend Language   | Python                  |
| Backend Framework  | FastAPI                 |
| Database           | PostgreSQL              |
| Frontend Language  | TypeScript / JavaScript |
| Frontend Framework | React                   |
| Build Tool         | Vite                    |
| CSS Framework      | Tailwind CSS            |
| Interactive Maps   | Leaflet                 |
| API                | REST / OpenAPI          |
| API Documentation  | Swagger UI              |
| Version Control    | Git / GitHub            |
| Deployment         | Render                  |

-------------------------------------------------------------

Official Documentation

The project uses the official documentation of the technologies below as technical references:

- Python — https://docs.python.org/3/
- PostgreSQL — https://www.postgresql.org/docs/
- FastAPI — https://fastapi.tiangolo.com/
- React — https://react.dev/
- TypeScript — https://www.typescriptlang.org/docs/
- Vite — https://vite.dev/guide/
- Tailwind CSS — https://tailwindcss.com/docs
- Leaflet — https://leafletjs.com/reference.html
- GitHub — https://docs.github.com/
- Render — https://render.com/docs

-------------------------------------------------------------

Main Links

| Resource          | Link                                                   |
| ----------------- | ------------------------------------------------------ |
| Public Platform   | https://investment-ai-frontend.onrender.com            |
| Backend API       | https://investment-ai-platform.onrender.com            |
| Swagger / OpenAPI | https://investment-ai-platform.onrender.com/docs       |
| Health Check      | https://investment-ai-platform.onrender.com/api/health |
| GitHub Repository | https://github.com/heysem53/investment-ai-platform     |

-------------------------------------------------------------

Important Notes

- The deployed version uses PostgreSQL through the backend service.
- The production frontend communicates with the deployed API and does not depend on `localhost`.
- The current investment analysis model is based on predefined indicators, rules, and weights.
- The current analysis is not a Machine Learning model trained on historical investment data.
- Analytical results are intended as preliminary decision-support indicators and do not replace specialized technical, financial, legal, or feasibility studies.
- Some related data may not be available for every opportunity, which explains the different record counts across database tables.
- The database, analytical model, GIS components, and backend services can be expanded as the volume and quality of available data increase.

-------------------------------------------------------------

Current Platform Status

The current deployed version includes:

- PostgreSQL database
- FastAPI backend
- REST API
- React frontend
- TypeScript
- Tailwind CSS
- Interactive dashboard
- Investment indicators
- Interactive GIS map
- Search and filtering
- Investment opportunity pages
- Detailed opportunity records
- Financial data
- Operational data
- Geographic data
- Infrastructure information
- Site characteristics
- Investment readiness indicators
- Weighted investment assessment model
- Opportunity analysis service
- Swagger/OpenAPI documentation
- Public deployment on Render
- GitHub source-code repository
- Desktop and mobile support

-------------------------------------------------------------

License and Usage

This repository contains the source code and technical implementation of the Smart Investment Map Platform.

The use, modification, redistribution, or integration of the source code and associated data should comply with the applicable ownership, authorization, and data-use requirements.
