import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PPInfo } from "../components/product_page/pp_info";
import { PPImageViewer } from "../components/product_page/pp_imagViewer";
import { PPSpecs } from "../components/product_page/pp_specs";
import { SimilarPicks } from "../sections/similarPicks";

export const ProductPage = ({ products }) => {
  // Declaring all variables
  const navigate = useLocation()
  const navigateTo = useNavigate()
  const url = navigate.pathname;
  const [queryProductId, setQueryProductId] = useState(url?.split("/"))
  const [productId, setProductId] = useState(queryProductId[2])
  const [product, setProduct] = useState(
    JSON.parse(localStorage.getItem('last_prod_viewed'))
  )


  console.log(navigate.pathname)


  useEffect(() => {
    navigate.pathname?.split("/")[2] !== productId && setProductId(navigate.pathname?.split("/")[2])
    products.map(prdct => {
      return (prdct.id === productId && setProduct(prdct))
    })
    localStorage.setItem('last_prod_viewed', JSON.stringify(product))
    console.log(product)
  }, [productId, url])

  return (
    <div className="productPage_wrap" style={{ padding: '20px 60px' }}>
      <div className="productPage_comp" style={{ display: 'flex', gap: '40px', paddingBottom: '30px' }}>
        <div className="pp_left_wrap" onClick={e => navigateTo(-1)} style={{ display: 'flex', border: '1px solid #D9E2E5', borderRadius: '50px', padding: '12px', cursor: 'pointer' }}>
          <i class="ri-arrow-left-line" />
        </div>
        <div className="pp_mid_wrap" style={{ display: 'flex', gap: '20px' }}><PPInfo /><PPImageViewer /></div>
        <div className="pp_right_wrap"><PPSpecs /></div>
      </div>

      <hr style={{ width: '100%', border: "0", height: '0.5px', background: '#E9E6E1', marginBottom: '120px' }} />

      <SimilarPicks similar_picks={products} />
    </div>
  )
};
