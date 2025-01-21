import Badge from 'react-bootstrap/Badge';
import { Button } from 'react-bootstrap';
import { useState,useEffect,Fragment } from 'react';
import api from '@/utils/axios'
import { RecipeDTO } from '@/utils/dto';
import { parseRecipe } from '@/utils/parse';
import Table from 'react-bootstrap/Table';
import { useHeader } from '@/components/header';
import swAlert from '@/components/alert';
import { ErrorResponse, parseErrors } from '@/utils/error';
import { AxiosError } from 'axios';
import { auth } from '@/utils/cookie';


type formInput = {
    category: number | null,
    keyword: string
}

const MyRecipeList = () => {

    //const [alert, setAlert] = useState<string | null>(null);
    const { setHeader } = useHeader();
    const [recipes,setRecipes] = useState<RecipeDTO[]>([])
    const [loading, setLoading] = useState(false);
    const [keyword,setKeyword] = useState('')
    const [formData, setFormData] = useState<formInput>({
        category: null,
        keyword: ''
    });

    useEffect(()=>{
        const fetchRecipes = async () => {
            setLoading(true);

            try {
                const queryParams = new URLSearchParams({
                    person:"1"
                }).toString();

                const response = await api.get(import.meta.env.VITE_API_URL+`/recipe?${queryParams}`,{
                    headers: {
                      'Content-Type': "application/json"
                    }
                });
                const data:RecipeDTO[] = await response.data.data.map(parseRecipe)
                setRecipes(data)               
            } catch (e:unknown) {
                if (e instanceof AxiosError) {
                    switch (e.response?.status){
                        case 400:{
                            const errorMsg: ErrorResponse = e.response?.data;
                            const errorMap = parseErrors(errorMsg);
                        }
                        case 401:{
                            await swAlert.confirm({ title:"Error",content: "Please login agian.","icon":"error" });
                            auth.removeToken()
                            window.location.replace("/home")
                        }
                        default:{
                            await swAlert.confirm({ title:"Error",content: "Unknown error occured","icon":"error" });
                            window.location.replace("/home")
                        }
                    }
                }
                await swAlert.confirm({ title:"Error",content: "Unknown error occur.","icon":"error" });
            } finally {
                setLoading(false);
            }
        };
        setHeader("My Recipes", "View your recipe and collection");
        fetchRecipes();
        return () => {
            setHeader("LazyP", "For the people who think cooking spend to much time.");
        };
    },[formData]);
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