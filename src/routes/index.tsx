import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "./layout";
import { ErrorPage } from "./error";
import { itemsLoader } from "@/lib/loaders";
import { Home } from "./home";
import { itemAction } from "@/lib/actions";
import { ItemPage } from "./item";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route
        path="/"
        element={<Home />}
        errorElement={<ErrorPage />}
        loader={itemsLoader}
        action={itemAction}
      />
      <Route
        path="items/:id"
        element={<ItemPage />}
        errorElement={<ErrorPage />}
      />
    </Route>,
  ),
);
