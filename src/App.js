import { useState } from 'react';
import { Row, Col, Button } from 'antd';
import foods from './foods.json';
import FoodBox from './components/FoodBox';
import AddFoodForm from './components/AddFoodForm';
import Search from './components/Search';
import './App.css';

function App() {
  const [foodList, setFoodList] = useState(foods);
  const [filteredFoods, setFilteredFoods] = useState(foods);
  const [showForm, setShowForm] = useState(true);

  const addNewFood = (newFood) => {
    setFoodList([...foodList, newFood]);
    setFilteredFoods([...foodList, newFood]);
  };

  const deleteFood = (name) => {
    const updatedList = foodList.filter((food) => food.name !== name);
    setFoodList(updatedList);
    setFilteredFoods(updatedList);
  };

  const handleSearch = (query) => {
    const filtered = foodList.filter((food) => 
      food.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFoods(filtered);
  };

  return (
    <div className="App">
      <h1>Nutrition Tracker</h1>
      <Button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add New Food'}
      </Button>
      {showForm && <AddFoodForm addFood={addNewFood} />}
      <Search onSearch={handleSearch} />
      {filteredFoods.length === 0 ? (
        <p>No food available. Add some!</p>
      ) : (
        <Row>
          {filteredFoods.map((food, index) => (
            <Col key={index} span={8}>
              <FoodBox food={food} onDelete={deleteFood} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default App;

