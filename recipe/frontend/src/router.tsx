import { Navigate,Routes, Route } from 'react-router-dom';
import { lazy } from 'react'
import Layout from "@/layouts/blog.tsx"
import Home from "@/pages/app.tsx"
import NotFoundPage from '@/pages/exist';
import Authorization from '@/components/authorization';


const CreateRecipe = lazy(()=> import("@/pages/recipes/recipe.create"));
const EditRecipe = lazy(()=> import("@/pages/recipes/recipe.edit"));
const RecipeList = lazy(()=> import("@/pages/recipes/recipe.list"));
const Recipe = lazy(()=> import("@/pages/recipes/recipe"));
const MyRecipeList = lazy(()=> import("@/pages/recipes/recipe.table"));
const PasswordInfo = lazy(()=> import("@/pages/acccount/password"));
const Store = lazy(()=> import("@/pages/store/store"));
const AccountInfo = lazy(()=> import("@/pages/acccount/account"));
//const Authorization = lazy(()=> import("@/components/authorization"));

const Router = () => (
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<Navigate to="/" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/recipe/collection" element={<RecipeList />} />
      <Route path="/recipe/list" element={<Authorization><MyRecipeList /></Authorization>} />
      <Route path="/recipe/create" element={<Authorization><CreateRecipe /></Authorization>}/>
      <Route path="/recipe/edit/:id" element={<Authorization><EditRecipe /></Authorization>}/>
      <Route path="/recipe/:id" element={<Recipe />} />
      <Route path="/store" element={<Store />} />
      <Route path="/account" element={<Authorization><AccountInfo /></Authorization>}/>
      <Route path="/password" element={<Authorization><PasswordInfo /></Authorization>}/>
    </Route>
    <Route path="/404" element={<NotFoundPage />} />
    <Route path="*" element={<Navigate to="/404" replace />} />
  </Routes>
);

export default Router;
