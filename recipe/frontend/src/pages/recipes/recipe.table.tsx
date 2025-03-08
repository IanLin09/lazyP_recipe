import Badge from 'react-bootstrap/Badge';
import { Button } from 'react-bootstrap';
import api from '@/utils/axios'
import { RecipeDTO } from '@/utils/dto';
import { parseRecipe } from '@/utils/parse';
import Table from 'react-bootstrap/Table';
import { AxiosError } from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { LoadingScene } from '@/components/loading';
import { useQueryResponseError,errorAlert } from '@/utils/error';
import { useState,memo } from 'react';
import swAlert from '@/components/alert';
import Swal from "sweetalert2";


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

type props = {
    recipe:RecipeDTO
}

const PublicStatus = memo(({recipe}:props) => {
    const [color,setColor] = useState(recipe.deleted_at ? "danger" : "success");
    const [text,setText] = useState(recipe.deleted_at ? "Unpublish" : "Publish");
    const recipeId = recipe.id ? recipe.id : 0

    const updatePublicStatus = async (id:number) => {
        const response = await api.put(`/recipe/delete/${id}`, {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }

    const mutation = useMutation({
        mutationFn:updatePublicStatus,
        onSuccess: async () => {
            setColor(color == "danger" ? "success" : "danger");
            setText(text == "Unpublish" ? "Publish" : "Unpublish");
        },
        onError:async () => {
            swAlert.confirm({ title: "Error", content: "Unknown error occurred.", icon: "error" });
        }
    })

    const handleUpdateComfirm = async (id:number) => {
        Swal.fire({
            title: 'Do you want to change public status?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
          }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await mutation.mutateAsync(id);
                    Swal.fire('success!', '', 'success');
                } catch (e: unknown) {
                    await swAlert.confirm({ title:"Error",content: "Unknown error occurred","icon":"error" });
                }
                
            } 
          })
    }

    return (
        <>
            <Badge 
                role="button"
                style={{ cursor: "pointer" }} 
                onClick={() => handleUpdateComfirm(recipeId)} 
                bg={color}>
                {text}
            </Badge>
        </>
    )
});

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
                            <td><PublicStatus recipe={recipe} /></td>
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