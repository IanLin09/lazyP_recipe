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

const Router = () => (
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/recipe/collection" element={<RecipeList />} />
      <Route path="/recipe/list" element={<MyRecipeList />} />
      <Route path="/recipe/create" element={<CreateRecipe />}/>
      <Route path="/recipe/edit/:id" element={<EditRecipe />}/>
      <Route path="/recipe/:id" element={<Recipe />} />
      <Route path="/store" element={<Store />} />
      <Route path="/account" element={<AccountInfo />}/>
      <Route path="/password" element={<PasswordInfo />}/>
    </Route>
  </Routes>
);

export default Router;
