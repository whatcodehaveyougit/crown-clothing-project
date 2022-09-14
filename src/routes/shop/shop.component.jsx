import SHOP_DATA from '../../shop-data.json'

const Shop = () => {

    return (
        <>
         {
            SHOP_DATA.map(({ id, name }) => (
                <div key={id}>
                    <h1>{name}</h1>
                </div>
            ))
         }
        </>
    )
}

export default Shop;