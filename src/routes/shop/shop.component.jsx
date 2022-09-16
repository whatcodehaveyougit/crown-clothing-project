import SHOP_DATA from '../../shop-data.js'
import { useContext, Fragment } from 'react';
import { CatagoriesContext } from '../../contexts/catagories.context'
import CatagoryPreview from '../../components/catagory-preview/catagory-preview.component';
import './shop.styles.scss'

const Shop = () => {
    const { catagoriesMap } = useContext(CatagoriesContext);
     
    return (
        <div className="shop-container">
        {
            // If you want the map to implicitly return something - use normal brakets instead of squiggley
            Object.keys(catagoriesMap).map( (title) => {
                const products = catagoriesMap[title];
                return (
                    <CatagoryPreview id={title} title={title} products={products} />
                );
            })
        }
        </div>
    )
}

export default Shop;