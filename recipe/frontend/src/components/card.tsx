import Card from 'react-bootstrap/Card';
import { ReactNode } from 'react';

interface Props {
    img?: string,
    header?:string,
    title: string,
    text?:string,
    children?: ReactNode
}

const BootstrapCard = (props:Props) => {

    const cardCotent = () => {
        if (props.text){
            return (
                <Card.Text>
                    {props.text}
                </Card.Text>
            )
        }else{
            return (props.children)
        }
    }

    return (
        
        <Card className='card-custom'>
          {props.img && <Card.Img variant="top" className="card-custom-image" src={props.img} />}
          {props.header &&<Card.Header>{props.header}</Card.Header>}
          <Card.Body>
            <Card.Title>{props.title}</Card.Title>

            {cardCotent()}
          </Card.Body>
        </Card>
        
    )
}

export default BootstrapCard