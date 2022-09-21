import './catagory.styles.scss'
import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { CatagoriesContext } from '../../contexts/catagories.context';
import ProductCard from '../../components/product-card/product-card.component';

const Catagory = () => {

    const { catagory } = useParams();
    const { catagoriesMap } = useContext(CatagoriesContext);
    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        setProducts( catagoriesMap[catagory] );

    }, [catagory, catagoriesMap])

    return (
        <div className='catagory-container'>
            {
                products.map((product) => {
                    <ProductCard key={product.id} product={product}></ProductCard>

                })
            }
        </div>
    )


}

export default Catagory;