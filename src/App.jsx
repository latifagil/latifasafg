import { useEffect } from 'react'
import { useState } from 'react'
import Button from '@mui/material/Button';
import {Header} from './assets/components/Header';
import { Input } from '@mui/material';


function App() {
  const [tempProducts, setTempProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      const call = await fetch(`https://reactapi.pautinaweb.ru/objects.php`);
      const response = await call.json();
      setProducts(response);
      setTempProducts(response);
    }
    fetchProducts();
  }, []);

  function sort(type = 'asc') {
    setTempProducts([...products.sort((a, b) => type === 'asc' ? a.price - b.price : type === 'desc' ? b.price - a.price : '')]);
  }

  useEffect(() => {
    setTempProducts([...products.filter((item) => item.name.toLowerCase().includes(search))])
  }, [search]) 



  return (
    <>
    <Header/>
  
    <section className='px-5 container mx-auto pt-10'>
      <div className='mt-4'>
        <div className='flex items-center justify-between gap-1'>
        <div className='flex items-center gap-1'>
          <Input value={search} onChange={(event) => setSearch(event.target.value)} />
          </div>
          <div className='flex gap-2'>
            <Button variant="text" onClick={() => sort('desc')}>
              По убыванию
            </Button>
            <Button variant="text" onClick={() => sort()}>
              По возрастанию
            </Button>
          </div>
        </div>
        <div className='mt-4 grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-4'>
        {tempProducts.map((item) => {
          return (
            <article className='p-3 rounded-xl bg-white' key={item.id}>
              <h2 className='text-xl font-bold'>{item.name} </h2>
              <p className='mt-2 text-sm color-white'>{item.description}</p>
              <p className='mt-8 font-semibold text-[var(--text-color)]'>{item.price} руб.</p>
              <p>{item.sclad} шт.</p>
              <Button variant="outlined">
                Добавить в корзину
              </Button>
            </article>
          )
        })}
        </div>
      </div>
    </section>
    </>
  )
}

export default App
