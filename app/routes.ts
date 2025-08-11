import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("api/offer", "./routes/api/offer.tsx"),
] satisfies RouteConfig;
