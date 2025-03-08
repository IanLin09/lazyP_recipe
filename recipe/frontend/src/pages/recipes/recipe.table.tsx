import Badge from 'react-bootstrap/Badge';
import { Button } from 'react-bootstrap';
import api from '@/utils/axios'
import { RecipeDTO } from '@/utils/dto';
import { parseRecipe } from '@/utils/parse';
import Table from 'react-bootstrap/Table';
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { LoadingScene } from '@/components/loading';
import { useQueryResponseError,errorAlert } from '@/utils/error';

const fetchRecipes = async () => {
    try {
        const response = await api.get("my_recipe",{
            headers: {
              'Content-Type': "application/json"
            }
        });
        const data:RecipeDTO[] = await response.data.data.map(parseRecipe)
        return data;
    } catch (e:unknown) {
        if (e instanceof AxiosError) {
            switch (e.response?.status){
                case 401:{
                    throw new useQueryResponseError("Please login agian", 401);
                }
                default:{
                    throw new useQueryResponseError("Unknown error occurred", 500);
                }
            }
        }
    }
};

const MyRecipeList = () => {

    const { data: recipes, error, isError, isLoading } = useQuery({
        queryKey: ['myRecipe'],
        queryFn: fetchRecipes,
      });

    if (isLoading){
        return <LoadingScene/>
    }

    if (isError){
        errorAlert(error)
        return <></>
    }
    return (
        
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                    
                <Table responsive="sm">
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th>Recipe Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr> 
                    </thead>
                    <tbody>
                    {recipes && (
                    recipes.map((recipe,i) => (
                        <tr key={`reciepe-${i}`}>
                            <td>{recipe.id}</td>
                            <td>{recipe.name}</td>
                            <td><Badge bg="success">Publish</Badge></td>
                            <td><Button href={`/recipe/edit/${recipe.id}`} variant='warning' size="sm">Edit</Button></td>
                        </tr>
                    )))}
                    </tbody>
                </Table>
            </div>
        </div>
        
    )
}

export default MyRecipeList;