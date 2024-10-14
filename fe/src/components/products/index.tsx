import { mockData } from '../../mock/data';
import { ProductCard } from '../cards/Product';
import { Button } from '../button';
import { useFilterContext } from '../../contexts/filters';
import { ChevronDown } from 'react-feather';
import { useEffect, useState } from 'react';
import { IProduct } from '../../interfaces/product';
import axios from 'axios';

export const Products = () => {
  const { filters, query } = useFilterContext();

  const [productsData, setProductsData] = useState<IProduct[] | null>(null)
  const [filteredProducts, setFilteredProducts]= useState<IProduct[] | null>(null)
  const [sortedProducts, setSortedProducts]= useState<IProduct[] | null>(null)

  const fetchProductsData = async () => {
    const data = await axios.get('http://localhost:5000/api/products')
    setProductsData(data.data)
  } 

  useEffect(() => {
    fetchProductsData()
  }, [])

  useEffect(() => {
    if (productsData !== null) {
      const searchByCode = productsData.filter((product) => {
        return product.code.toLowerCase().includes(query.toLowerCase());
      });
      const filteredProductsData = searchByCode.filter((product) => {
        if (filters.capacity && product.capacity !== filters.capacity) {
          return false;
        }
        if (filters.energyClass && product.energyClass !== filters.energyClass) {
          return false;
        }
        return !(filters.feature && !product.features.includes(filters.feature));
      });

      setFilteredProducts(filteredProductsData)
    
      const sortedProductsData = filteredProductsData.sort((a, b) => {
        if (filters.sort === 'price') {
          return a.price.value - b.price.value;
        }
        if (filters.sort === 'capacity') {
          return a.capacity - b.capacity;
        }
        return 0;
      });

      setSortedProducts(sortedProductsData)
    }
  }, [productsData, filters.energyClass, filters.capacity, filters.sort, filters.feature, query])

  if (filteredProducts !== null && filteredProducts.length === 0) {
    return (
      <div>
        <p className="text-center text-gray-500 text-xl mt-4">
          Brak produktów spełniających kryteria wyszukiwania
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-x-4 gap-y-5">
        {productsData !== null && sortedProducts !== null ? sortedProducts.map((product) => (
          <ProductCard key={product.code} {...product} />
        )) : <></>}
      </div>
      <div className="flex justify-center mt-4">
        <Button
          variant={'tertiary'}
          value={'Pokaż więcej'}
          icon={<ChevronDown />}
          onClick={() => console.log('some action')}
        />
      </div>
    </>
  );
};
