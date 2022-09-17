import React, {useState} from 'react'
import { useMutation } from 'react-apollo'
import UPDATE_CART from '../graphql/updateCart.graphql'

const QuickOrder = () => {
  const [inputText, setInputText] = useState("")
  const [search, setSearch] = useState("")

  const [addToCart] = useMutation(UPDATE_CART)

  const handleChange = (event: any) => {
    setInputText(event.target.value)
    console.log("Input Changes", inputText)
  }

  const addProductToCart = () => {
  }

  const searchProduct = (event:any) => {
    event.preventDefault();
   if(!inputText){
    alert("Oiga, ingrese algo")
   } else{
    console.log("al final estamos buscando",inputText)
    setSearch(inputText)
    addProductToCart()
   }
  }

  return <div>
    <h2>Compra rapida de VTEX U</h2>
    <form onSubmit={searchProduct}>
      <div>
        <label htmlFor="sku">Ingresa el numero de SKU</label>
        <input id='sku' type="text"  onChange={handleChange}/>
      </div>
      <input type="submit" value="AÑADIR AL CARRITO" />
    </form>
  </div>
}

export default QuickOrder
