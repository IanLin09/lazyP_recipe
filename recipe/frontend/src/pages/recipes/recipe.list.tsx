import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState,Fragment } from 'react';
import api from '@/utils/axios'
import { RecipeDTO } from '@/utils/dto';
import { parseRecipe } from '@/utils/parse';
import swAlert from '@/components/alert';
import { useQuery } from '@tanstack/react-query';
import { LoadingScene } from '@/components/loading';


type formInput = {
    category: number | null,
    keyword: string
}

const fetchRecipes = async ({ queryKey }: { queryKey: [string, formInput] }) => {
    const [_key, { category, keyword }] = queryKey; // Extract filter params

    try {
        const response = await api.get(`/recipe`, {
            headers: { 'Content-Type': "application/json" },
            params: { category, keyword }
        });

        if (!response.data || !Array.isArray(response.data.data)) {
            throw new Error("Invalid response format");
        }

        return response.data.data.map(parseRecipe) as RecipeDTO[];
    } catch (e) {
        return []; // Return an empty array to avoid `undefined` errors
    }
};

const RecipeList = () => {

    const [keyword,setKeyword] = useState('')
    const [formData, setFormData] = useState<formInput>({
        category: null,
        keyword: ''
    });

    const { data: recipeList, isLoading, isError } = useQuery({
        queryKey: ['recipeList', formData] as [string, formInput],  // Ensure `formData` changes trigger refetch
        queryFn: fetchRecipes, // No direct params, `queryKey` will be used
        placeholderData: (lastData) => lastData,
        enabled: !!formData,  // Avoids running when `formData` is null/undefined,
    });

    if (isLoading){
        return <LoadingScene/>
    }

    if (isError){
        swAlert.confirm({ title: "Error", content: "Unknown error occurred.", icon: "error" });
        return <></>
    }

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
                                <option value="3">Main dishes</option>
                                <option value="1">Meat</option>
                                <option value="2">Veges</option>
                                
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
                    </Row>
                </Form>
                    
                {recipeList && (
                    recipeList.map((recipe,i) => (
                        <div key={recipe.id}>
                            <div className="post-preview" >
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
                            
                            {recipeList && i < recipeList?.length - 1 && <hr className="my-4" />}
                        </div>
                    ))
                )}
            </div>

        </div>
        
    )
}

export default RecipeList;