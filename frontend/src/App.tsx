import { BrowserRouter as Router, Routes, Route } from "react-router";

// Layout
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";

// Authentication
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";

// Dashboard
import Home from "./pages/Dashboard/Home";

// Opportunities
import Opportunities from "./pages/Opportunities/Opportunities";
import OpportunityDetails from "./pages/Opportunities/OpportunityDetails";

// Investment Platform
import InvestmentMap from "./pages/InvestmentMap/InvestmentMap";
import Sectors from "./pages/Sectors/Sectors";
import Locations from "./pages/Locations/Locations";
import Investors from "./pages/Investors/Investors";
import FinancialData from "./pages/FinancialData/FinancialData";
import Contracts from "./pages/Contracts/Contracts";
import Attachments from "./pages/Attachments/Attachments";
import Reports from "./pages/Reports/Reports";
import TablesData from "./pages/TablesData/TablesData";
import Entities from "./pages/Entities/Entities";
import ReadyOpportunities from "./pages/Opportunities/ReadyOpportunities";
import NewOpportunity from "./pages/Opportunities/NewOpportunity";

// AI
import OpportunityAnalysis from "./pages/AIAnalysis/OpportunityAnalysis";

// Other Pages
import UserProfiles from "./pages/UserProfiles";
import Calendar from "./pages/Calendar";
import Blank from "./pages/Blank";
import ApiTest from "./pages/ApiTest";
import NotFound from "./pages/OtherPage/NotFound";

// Forms
import FormElements from "./pages/Forms/FormElements";

// Tables
import BasicTables from "./pages/Tables/BasicTables";

// UI Elements
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";

// Charts
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";


export default function App() {
  return (
    <Router>
      <ScrollToTop />

      <Routes>

        {/* =====================================================
            Dashboard Layout
        ===================================================== */}
        <Route element={<AppLayout />}>

          {/* Dashboard */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* =================================================
              Investment Platform
          ================================================= */}
          <Route
            path="/map"
            element={<InvestmentMap />}
          />

          <Route
            path="/sectors"
            element={<Sectors />}
          />

          {/* Opportunities */}
          <Route
            path="/opportunities"
            element={<Opportunities />}
          />

          {/* Opportunity Details */}
          <Route
            path="/opportunities/:code"
            element={<OpportunityDetails />}
          />

          {/* Opportunity Management */}
          <Route
            path="/opportunities/ready"
            element={<ReadyOpportunities />}
          />

          <Route
            path="/opportunities/new"
            element={<NewOpportunity />}
          />

          {/* =================================================
              Analytics
          ================================================= */}
          <Route
            path="/analytics"
            element={<Blank />}
          />

          {/* =================================================
              Investors & Data
          ================================================= */}
          <Route
            path="/investors"
            element={<Investors />}
          />

          <Route
            path="/financial-data"
            element={<FinancialData />}
          />

          <Route
            path="/entities"
            element={<Entities />}
          />

          <Route
            path="/locations"
            element={<Locations />}
          />

          {/* =================================================
              Reports & Documents
          ================================================= */}
          <Route
            path="/reports"
            element={<Reports />}
          />

          <Route
            path="/contracts"
            element={<Contracts />}
          />

          <Route
            path="/attachments"
            element={<Attachments />}
          />

          {/* =================================================
                  Artificial Intelligence
              ================================================= */}
              
              {/* صفحة التحليل الذكي للفرصة */}
              <Route
                path="/ai/opportunity-analysis/:code"
                element={<OpportunityAnalysis />}
              />
              
              {/* صفحات AI المستقبلية */}
              <Route
                path="/ai/investment-evaluation"
                element={<Blank />}
              />
              
              <Route
                path="/ai/recommendations"
                element={<Blank />}
              />

              <Route
                path="/ai-analysis"
                element={<OpportunityAnalysis />}
              />

          {/* =================================================
              Database Tables
          ================================================= */}
          <Route
            path="/tables"
            element={<TablesData />}
          />

          {/* =================================================
              Settings
          ================================================= */}
          <Route
            path="/settings"
            element={<Blank />}
          />

          {/* =================================================
              Original TailAdmin Pages
          ================================================= */}

          <Route
            path="/profile"
            element={<UserProfiles />}
          />

          <Route
            path="/calendar"
            element={<Calendar />}
          />

          <Route
            path="/blank"
            element={<Blank />}
          />

          {/* Forms */}
          <Route
            path="/form-elements"
            element={<FormElements />}
          />

          {/* Tables */}
          <Route
            path="/basic-tables"
            element={<BasicTables />}
          />

          {/* UI Elements */}
          <Route
            path="/alerts"
            element={<Alerts />}
          />

          <Route
            path="/avatars"
            element={<Avatars />}
          />

          <Route
            path="/badge"
            element={<Badges />}
          />

          <Route
            path="/buttons"
            element={<Buttons />}
          />

          <Route
            path="/images"
            element={<Images />}
          />

          <Route
            path="/videos"
            element={<Videos />}
          />

          {/* Charts */}
          <Route
            path="/line-chart"
            element={<LineChart />}
          />

          <Route
            path="/bar-chart"
            element={<BarChart />}
          />

        </Route>

        {/* =====================================================
            Authentication
        ===================================================== */}

        <Route
          path="/signin"
          element={<SignIn />}
        />

        <Route
          path="/signup"
          element={<SignUp />}
        />

        {/* =====================================================
            Development / API Test
        ===================================================== */}

        <Route
          path="/api-test"
          element={<ApiTest />}
        />

        {/* =====================================================
            404
        ===================================================== */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </Router>
  );
}