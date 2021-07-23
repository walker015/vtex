import React, { useState, useEffect } from 'react';

import { Container } from './style';

import api from '../../services/api';

interface IProduct {
  id: number;
  photo: string;
  name: string;
  description: string;
  price: number;

}
const Home: React.FC = () => {
  const [data, setData] = useState<IProduct[]>([]);
  const [cart, setCart] = useState<IProduct[]>([]);

  useEffect(() => {
    api.get('').then(
      response => {
        setData(response.data)
      }
    )
  }, [])

  const handleCart = (index: number) => {
    let push: any = [ ...cart, cart.push(data[index])]
    setCart(push)
    const productStore = JSON.stringify(cart[index])
    localStorage.setItem(`@cart`, productStore);
    
  }

  return (
    <Container>
      <div>
        <div>
          <img src="" alt="" />
        </div>
        <div>
          cart {cart.length}
        </div>
      </div>
      <section>
        {data.map( (prod, index) => (
          <div className="product-content" key={prod.id}>
            <img src={prod.photo} alt="IPhone" width="200px" height="auto" />
            <h4>{prod.name}</h4>
            <span>{prod.description}</span>
            <h6>{prod.price}</h6>
            <button onClick={ () => handleCart(index)}>Adicionar ao carrinho</button>
          </div>
        ))}

      </section>
    </Container>
  );
}

export default Home;