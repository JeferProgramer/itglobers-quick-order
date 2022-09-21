import React, {useState, useEffect} from 'react'
import { useMutation, useLazyQuery } from 'react-apollo'
import UPDATE_CART from '../graphql/updateCart.graphql'
import GET_PRODUCT from "../graphql/getProductBySku.graphql"
import styles from "./styles.css"

const QuickOrder = () => {
  const [inputText, setInputText] = useState("")
  const [search, setSearch] = useState("")

  const [getProductData, {data: product}] = useLazyQuery(GET_PRODUCT)
  const [addToCart] = useMutation(UPDATE_CART)

  const handleChange = (event: any) => {
    setInputText(event.target.value)
    console.log("Input Changes", inputText)
  }

  const addProductToCart = () => {
    //en este momento envio el sku de mi input a text al query de graphql para obtenerlo
    getProductData({
      variables:{
        sku: inputText
      }
    })
  }

  //cuando la busqueda este activa y cuando el producto llegue
  useEffect(() => {
    console.log("El resultado de mi producto es", product, search);
    if(product){
      let skuId = parseInt(inputText)
      console.log("mis datos necesarios", skuId, product)
     addToCart ({
        variables: {
          salesChannel: "1",
          items: [
            {
              id: skuId,
              quantity: 1,
              seller: "1"
            }
          ]
        }
      })
      .then(() => {
        window.location.href = "/checkout"
      })
    }
  },[product, search])


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
    <h2 className={styles["titileQuickOrder"]}>Compra rapida de VTEX U</h2>
    <form onSubmit={searchProduct}>
      <div className={styles["conatinerForm"]}>
        <label htmlFor="sku">Ingresa el numero de SKU</label>
        <input id='sku' type="text"  onChange={handleChange}/>
        <input type="submit" value="AÑADIR AL CARRITO" className={styles["containerButton"]}/>
      </div>
    </form>
  </div>
}

export default QuickOrder
