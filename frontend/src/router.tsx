import { Routes, Route } from 'react-router-dom';
import Layout from "@/layouts/blog.tsx"
import Home from "@/pages/app.tsx"
import CreateRecipe from '@/pages/recipe.create.tsx';
import Login from '@/pages/login.tsx';
import RecipeList from '@/pages/recipe.list.tsx';
import Recipe from '@/pages/recipe.tsx'
import { RouteHandle } from '@/utils/dto';

const Router = () => (
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route path="/home" element={<Home />} />
      <Route path="/recipe/list" element={<RecipeList />} />
      <Route path="/recipe/:id" element={<Recipe />} />
      <Route 
      path="/recipe/create" 
      element={<CreateRecipe />}

      />
      <Route path="/login" element={<Login />} />
    </Route>

  </Routes>
);

export default Router;
