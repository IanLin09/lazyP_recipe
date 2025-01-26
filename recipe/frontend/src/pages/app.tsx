import recipeIMG from "@/assets/img/food.webp"
import GroceryIMG from "@/assets/img/grocery.webp"



const App = () => {

  return (
    
      <div className="index-container-flex">
        <div className="index-item">
          <a href="/recipe/collection">
          <img className="index-image" src={recipeIMG} />
          <div className="image-overlay">
            <h2 className="overlay-text">Recipe Collection</h2>
          </div>
          </a>
        </div>
        <div className="index-item">
          <a href="/store">
            <img className="index-image" src={GroceryIMG} />
            <div className="image-overlay">
              <h2 className="overlay-text">Grocery Location</h2>
            </div>
          </a>
        </div>
      </div>
  )
  
}

export default App
