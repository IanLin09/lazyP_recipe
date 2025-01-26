import { Navigate,Routes, Route } from 'react-router-dom';
import Layout from "@/layouts/blog.tsx"
import Home from "@/pages/app.tsx"
import CreateRecipe from '@/pages/recipes/recipe.create';
import EditRecipe from '@/pages/recipes/recipe.edit';
import RecipeList from '@/pages/recipes/recipe.list';
import Recipe from '@/pages/recipes/recipe'
import MyRecipeList from '@/pages/recipes/recipe.table';
import Store from "@/pages/store/store"
import AccountInfo from "@/pages/acccount/account"
import PasswordInfo from '@/pages/acccount/password';
import NotFoundPage from '@/pages/exist';
import Authorization from '@/components/authorization';

const Router = () => (
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<Navigate to="/home" replace />} />
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
