declare module "dashboard/Dashboard" {
  const Dashboard: React.ComponentType;
  export default Dashboard;
}

declare module "users/Users" {
  const Users: React.ComponentType;
  export default Users;
}

declare module "auth/stores" {
  export * from "@repo/auth/stores";
}

declare module "auth/stores/authStore" {
  export * from "@repo/auth/stores/authStore";
}

declare module "auth/components" {
  export * from "@repo/auth/components";
}

declare module "auth/components/LoginForm" {
  export * from "@repo/auth/components/LoginForm";
}

declare module "auth/components/SignupForm" {
  export * from "@repo/auth/components/SignupForm";
}

declare module "auth/components/ProtectedRoute" {
  export * from "@repo/auth/components/ProtectedRoute";
}

declare module "auth/hooks" {
  export * from "@repo/auth/hooks";
}

declare module "auth/hooks/useAuth" {
  export * from "@repo/auth/hooks/useAuth";
}

declare module "auth/hooks/useRequireAuth" {
  export * from "@repo/auth/hooks/useRequireAuth";
}

declare module "auth/lib" {
  export * from "@repo/auth/lib";
}

declare module "auth/lib/api" {
  export * from "@repo/auth/lib/api";
}

declare module "auth/lib/constants" {
  export * from "@repo/auth/lib/constants";
}

declare module "auth/lib/schemas" {
  export * from "@repo/auth/lib/schemas";
}

declare module "auth/types" {
  export * from "@repo/auth/types";
}
