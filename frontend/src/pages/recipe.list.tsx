import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { useState,useEffect,Fragment } from 'react';
import api from '@/utils/axios'
import { RecipeDTO } from '@/utils/dto';
import { parseRecipe } from '@/utils/parse';
import loadingImg from "@/assets/img/loadingcircles.gif"
import { useHeader } from '@/components/header';

type formInput = {
    category: number | null,
    keyword: string
}

const RecipeList = () => {

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
                    keyword: formData.keyword,
                    tags: formData.category ? ""+formData.category :''
                }).toString();

                const response = await api.get(import.meta.env.VITE_API_URL+`/recipe?${queryParams}`);
                const data:RecipeDTO[] = await response.data.data.map(parseRecipe)
                setRecipes(data)               
            } catch (error) {
                console.error('Error fetching recipes:', error);
            } finally {
                setLoading(false);
            }
        };
        setHeader("Recipes", "Find your favorite recipes here");
        fetchRecipes();
        return () => {
            setHeader("LazyP", "For the people who think cooking spend to much time.");
        };
    },[formData]);
    return (
        
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <Form>
                    <Row >
                        <Form.Group className="mb-3" as={Col} md="4" >
                            <Form.Label>Category</Form.Label>
                            <Form.Select 
                                
                                onChange={(e) => 
                                setFormData(prev => ({
                                    ...prev,
                                    [e.target.name]: e.target.value
                                }))
                            }
                              name="category"
                              aria-label="Recipe's tag"
                              value={formData.category === null ? '' : formData.category}
                            >
                                <option value="">All</option>
                                <option value="1">Meat</option>
                                <option value="2">Veges</option>
                                <option value="3">Dessert</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" as={Col} md="6">
                            <Form.Label>Keyword</Form.Label>
                            <Form.Control
                                type="text"
                                name="keyword"
                                placeholder="Put the keyword of the recipe name or ingredient"
                                onChange={(e) => setKeyword(e.target.value)}
                                onBlur={(e) => 
                                    setFormData(prev => ({
                                        ...prev,
                                        [e.target.name]: keyword
                                    }))}
                                value={keyword}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" as={Col} md="2">
                            <div className="h-100 d-flex align-items-end">
                                <Button variant="danger" href="/form/recipe/create">Create</Button>
                            </div>
                        </Form.Group>
                    </Row>
                </Form>
                    
                {recipes && (
                    recipes.map((recipe,i) => (
                        <>
                            <div className="post-preview" key={recipe.id}>
                                <a href={`/recipe/${recipe.id}`}>
                                    <h2 className="post-title">{recipe.name}</h2>
                                    <h3 className="post-subtitle">{recipe.description}</h3>
                                </a>
                                <p className="post-meta">
                                    ingredients:
                                    {recipe.materials && (
                                        recipe.materials.map((material,index) => (
                                            <Fragment key={material.id}>
                                                {`${material.name}`}
                                                {recipe.materials && index < recipe.materials?.length - 1 && ', '}
                                            </Fragment>
                                        ))
                                    )}
                                </p>
                            </div>
                            
                            {recipes && i < recipes?.length - 1 && <hr className="my-4" />}
                        </>
                    ))
                )}
            </div>

            {loading && <div className='text-center'>
                <img className='image-origin' src={loadingImg}></img>
            </div>}
        </div>
        
    )
}

export default RecipeList;