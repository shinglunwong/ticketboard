import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
// Pages
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import UserListPage from "./pages/UserListPage";
import UserDetailPage from "./pages/UserDetailPage";
import ProjectListPage from "./pages/ProjectListPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import TicketListPage from "./pages/TicketListPage";
import TicketDetailPage from "./pages/TicketDetailPage";
import DeploymentListPage from "./pages/DeploymentListPage";
import DeploymentDetailPage from "./pages/DeploymentDetailPage";
import PaymentListPage from "./pages/PaymentListPage";
import PaymentDetailPage from "./pages/PaymentDetailPage";
import ConfigListPage from "./pages/ConfigListPage";
import ConfigDetailPage from "./pages/ConfigDetailPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:id"
          element={
            <ProtectedRoute>
              <UserDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/configs"
          element={
            <ProtectedRoute>
              <ConfigListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/configs/:id"
          element={
            <ProtectedRoute>
              <ConfigDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:projectId"
          element={
            <ProtectedRoute>
              <ProjectDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:projectId/tickets"
          element={
            <ProtectedRoute>
              <TicketListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:projectId/tickets/:ticketId"
          element={
            <ProtectedRoute>
              <TicketDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:projectId/deployments"
          element={
            <ProtectedRoute>
              <DeploymentListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:projectId/deployments/:deploymentId"
          element={
            <ProtectedRoute>
              <DeploymentDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:projectId/payments"
          element={
            <ProtectedRoute>
              <PaymentListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:projectId/payments/:paymentId"
          element={
            <ProtectedRoute>
              <PaymentDetailPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}
