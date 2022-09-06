
function App() {

  const categories = [
    {
      id: 1,
      name: 'Hats'
    },
    {
      id: 2,
      name: 'Gloves'
    },
    {
      id: 3,
      name: 'Things'
    },
    {
      id: 4,
      name: 'Pants'
    },
    {
      id: 5,
      name: 'Shirts'
    }
  ]

  return (
    <div className='categories-container'>

    {/* Using brackets here instead of curleys in this react map */}
      {  categories.map( ( { title } ) => (
          <div className='category-container'>
            jfjfj
            {/* <img /> */}
            <div className='category-body-container'>
              <h2>{title}</h2>
              <p>Shop Now</p>
            </div>
          </div>
      ))
      }

    </div>


  );
}

export default App;

