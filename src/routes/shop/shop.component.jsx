import SHOP_DATA from '../../shop-data.js'
import { useContext, Fragment } from 'react';
import { CatagoriesContext } from '../../contexts/catagories.context'
import ProductCard from '../../components/product-card/product-card.component';
import './shop.styles.scss'

const Shop = () => {
    const { catagoriesMap } = useContext(CatagoriesContext);
     
    return (
        <Fragment>
        {
            // If you want the map to implicitly return something - use normal brakets instead of squiggley
            Object.keys(catagoriesMap).map( (title) => (
                <Fragment key={title}>
                    <h2>{title}</h2>
                    <div className='products-container'>
                    { catagoriesMap[title].map(( product ) => (
                            <ProductCard key={product.id} product={product}></ProductCard>
                        ))}
                    </div>
                </Fragment>
            ))
        }
        </Fragment>
    )
}

export default Shop;