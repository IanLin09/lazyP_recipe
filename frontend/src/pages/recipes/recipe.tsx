import { useState,useEffect } from 'react';
import { RecipeDTO,RecipeMaterialDTO } from '@/utils/dto';
import api from '@/utils/axios'
import { useParams } from "react-router-dom";
import { parseRecipe } from '@/utils/parse';
import YoutubeVideo from "@/components/youtube"
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import CardWithImg from "@/components/card";

const RecipePage = () => {
    
    const { id } = useParams<{ id: string }>();
    const [recipe,setRecipe] = useState<RecipeDTO>()
    const [loading, setLoading] = useState(false);
    const [materialChunk,setMaterialChunk] = useState<RecipeMaterialDTO[][]>([])

    
    useEffect(()=>{
        const fetchRecipe = async () => {
            setLoading(true);

            try {
                const response = await api.get(import.meta.env.VITE_API_URL+`/recipe/${id}`);
                const data:RecipeDTO = await parseRecipe(response.data.data)
                
                if (data.materials && materialChunk.length == 0){
                    let chunk = []
                    for (let i = 0; i < data.materials.length; i += 3) {
                        chunk.push(data.materials.slice(i, i + 3));
                    }
                    setMaterialChunk(chunk)
                }
                
                await setRecipe(data)
            } catch (error) {
                console.error('Error fetching recipe:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
        return () => {
       
        };
    },[]);


    return (
        <Container>
            <Row className="justify-content-center">
                {recipe?.video_link && (
                    <Col xs={12} md={8} className="mb-4">
                        <div className="video-wrapper">
                            <YoutubeVideo videoId={recipe.video_link} />
                        </div>
                        <hr className="my-4" />
                    </Col>
                )}          
            </Row>

            <Row>
                <Col xs={{ span: 8, offset: 3 }} md={{ span: 6, offset: 2 }}><h2 className="mb-3">{recipe?.name}</h2></Col>
            </Row>
            <Row className="mb-5 ">
                <Col xs={{ span: 8, offset: 3 }} md={{ span: 6, offset: 2 }}><h4 className="text-muted">{recipe?.description}</h4></Col>
            </Row>
            
            <Row className="my-5 py-3">
                <Col xs={{ span: 8, offset: 3 }} md={{ span: 6, offset: 2 }}>
                    <Card border="warning" style={{ width: '18rem' }}>
                        <Card.Header>Ingredients</Card.Header>
                        <Card.Body>
                        <Card.Title>Servings : {recipe?.servings}</Card.Title>
                        <hr />
                        
                        {materialChunk.map((material,index) => (
                            <Row key={`material-${index}`}>
                                {material.map((m) => (
                                    <p key={`ingredient-${m.id}`}>{m.name} : {m.number} {m.unit} </p>
                                ))}
                            </Row>
                        ))}
                        
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <hr className="my-4" />
            <Row>
                <Col xs={{ span: 8, offset: 3 }} md={{ span: 6, offset: 2 }}><h2 className="mb-3">Directions</h2></Col>
            </Row>
            <br/>
            <Row className="my-4">
            
                <Carousel>
                    {recipe?.steps && recipe.steps.map((step,index)=> (
                        <Carousel.Item key={step.id}>
                            <div className='w-100 d-flex flex-column text-center justify-content-center align-items-center'>
                            <CardWithImg 
                            img={step.image_link} 
                            title={`Step ${index+1}`}
                            text={step.description}
                            ></CardWithImg>
                            </div>
                        </Carousel.Item>
                    ))
                    }
                </Carousel>
            </Row>
        </Container>
    );
}

export default RecipePage;