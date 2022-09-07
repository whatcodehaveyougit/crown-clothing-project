import CategoryItem from '../category-item/category-item.component'
import './directory.styles.scss'

const Directory = ( {categories} ) => {

    return (
        <div className='directory-container'>
          {/* Using brackets here instead of curleys in this react map */}
            {  categories.map( ( category ) => (
                <CategoryItem key={category.id} category={category} />
            ))
            }
        </div>
      );
}

export default Directory;