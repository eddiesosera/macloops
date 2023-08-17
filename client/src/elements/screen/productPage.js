import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PPInfo } from "../components/product_page/pp_info";
import { PPImageViewer } from "../components/product_page/pp_imagViewer";
import { PPSpecs } from "../components/product_page/pp_specs";
import { SimilarPicks } from "../sections/similarPicks";
import { YouMayAlsoLike } from "../sections/you_may_also_like";

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
    <div className="productPage_wrap" style={{ background: '#FFFBF6 !important', paddingBottom: '40px' }}>
      <div className="productPage_comp" style={{ display: 'flex', flexDirection: 'column', gap: '120px', padding: '30px 60px 120px 60px', background: '#FFFBF6', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '40px', paddingBottom: '30px' }}>
          <div className="pp_left_wrap" onClick={e => navigateTo(-1)} style={{ display: 'flex', border: '1px solid #D9E2E5', borderRadius: '50px', padding: '12px', height: 'fit-content', width: 'fit-content', cursor: 'pointer' }}>
            <i class="ri-arrow-left-line" />
          </div>
          <div className="pp_mid_wrap" style={{ display: 'flex', gap: '40px', width: '100%' }}>
            <PPImageViewer productImages={product} />
            {/* <div> */}
            {/* <div className='p_comp_divider' style={{ borderRight: '1px solid #EDEAE6' }}></div> */}
            <PPInfo productInfo={product} />
            {/* </div> */}
          </div>
        </div>
        <div className="pp_right_wrap"><PPSpecs specs={product} /></div>
      </div>

      <hr style={{ padding: 0, width: '100%', border: "0", height: '0.5px', background: '#E9E6E1', marginTop: 0, marginBottom: '90px' }} />

      {/*Similar Picks Section */}
      <div style={{ background: '#FAF6F2', padding: '30px 60px', display: 'flex', flexDirection: 'column', gap: '60px' }}>
        <SimilarPicks similar_picks={products} />

        {/* More by Manufacturer Section */}
        <div>
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: 'Montserrat', textTransform: 'uppercase', fontSize: '24px', fontWeight: '700', color: '#13120f', height: '45px' }}>More by {product?.manufacturer}</div>
              <button style={{ background: 'none', border: 'solid 1px #2293B6', color: '#2293B6', fontFamily: 'Montserrat', fontWeight: '600', padding: '0 20px' }}>View More</button>
            </div>
          </div>
          <YouMayAlsoLike may_like_products={products} />
        </div>

      </div>


    </div>
  )
};
