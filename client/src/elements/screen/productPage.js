import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PPInfo } from "../components/product_page/pp_info";
import { PPImageViewer } from "../components/product_page/pp_imagViewer";
import { PPSpecs } from "../components/product_page/pp_specs";
import { SimilarPicks } from "../sections/similarPicks";
import { YouMayAlsoLike } from "../sections/you_may_also_like";
import { Fade, JackInTheBox } from "react-awesome-reveal";
import { UserModeContext } from "../../App";
import { Form } from "../components/form";

export const ProductPage = ({ products, userObj }) => {
  // Declaring all variables
  const navigate = useLocation()
  const navigateTo = useNavigate()
  const url = navigate.pathname;
  const [queryProductId, setQueryProductId] = useState(url?.split("/"))
  const [productId, setProductId] = useState(queryProductId[2])
  const [product, setProduct] = useState(
    JSON.parse(localStorage.getItem('last_prod_viewed'))
  );
  const [userMode, setUserMode] = useContext(UserModeContext);
  // const [pageState, setPageState] = useState('product');
  const [pageState, setPageState] = useState('view-product');
  const [formData, setFormData] = useState({})
  const navigateto = useNavigate();

  // console.log(navigate.pathname)


  useEffect(() => {
    navigate.pathname?.split("/")[2] !== productId && setProductId(navigate.pathname?.split("/")[2])
    products.map(prdct => {
      JSON.parse(localStorage.getItem('last_prod_viewed')) === "" && JSON.parse(localStorage.setItem('last_prod_viewed', prdct))
      return (
        prdct?.id === productId && setProduct(prdct)
      );
    })

    // pageState === undefined && setPageState("product");

    localStorage.setItem('last_prod_viewed', JSON.stringify(product))

  }, [productId, url, pageState]);


  const editState = (state) => {
    setPageState(state);
  };


  const getFormEditStockObj = (form) => {
    setFormData(form)
  };


  const returnProductPage = () => {
    return (
      <div className="productPage_wrap" style={{ background: '#FFFBF6 !important', paddingBottom: '40px' }}>
        <div className="productPage_comp" style={{ display: 'flex', flexDirection: 'column', gap: '120px', padding: '30px 60px 120px 60px', background: '#FFFBF6', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '40px', paddingBottom: '30px' }}>
            <div className="pp_left_wrap" onClick={e => navigateTo(-1)} style={{ display: 'flex', border: '1px solid #2d2e2f', color: '#2d2e2f', borderRadius: '50px', padding: '12px', height: 'fit-content', width: 'fit-content', cursor: 'pointer' }}>
              <i class="ri-arrow-left-line" />
            </div>
            <div className="pp_mid_wrap" style={{ display: 'flex', gap: '40px', width: '100%' }}>
              <PPImageViewer productImages={product} />
              {/* <div> */}
              {/* <div className='p_comp_divider' style={{ borderRight: '1px solid #EDEAE6' }}></div> */}
              <PPInfo productInfo={product} userMode={userMode} userObj={userObj} pagestate={editState()} />
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
  }


  const editStockAction = async () => {
    // if (formData?.image_cover !== undefined) {
    //   await axios.post('http://localhost:5000/api/product', formData,
    //     { headers: { "Content-Type": "application/json" } })
    //     .then((productRes => {
    //       console.log(productRes)
    //       navigate('/');
    //       // regRes && setRegStatus(true)
    //     }))
    // } else {
    //   alert("Image upload error due to size")
    // }

    // alert(formData.username)
    alert("Edit page set")
  };


  const returnEditProduct = () => {
    return (
      <div style={{ width: '-webkit-fill-available', padding: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        <div className="pp_left_wrap"
          onClick={e => { alert(pageState); setPageState("view-product") }}
          style={{ position: 'absolute', marginLeft: '60px', left: '0', top: '100px', marginTop: '60px', display: 'flex', border: '1px solid #D9E2E5', borderRadius: '50px', background: '#FFFBF6', padding: '12px', height: 'fit-content', width: 'fit-content', cursor: 'pointer' }}>
          <i class="ph-bold ph-arrow-left" style={{ fontSize: '20px', color: '' }} />
        </div>
        <Form formFields={inputFields} heading={'Edit Instrument'} btnAction={editStockAction} btnTitle={'Edit Instrument'} formObj={getFormEditStockObj} />
      </div>
    )
  };
  // NEW STOCK FIELDS
  const inputFields = [
    {
      name: 'image_cover',
      type: 'single_image',
      placeholder: '',
      // input: (e) => { setFormData({ ...formData, profile_image: profile }) }
    },
    {
      name: 'stockImage',
      type: 'multiple_image',
      placeholder: 'Username or Email',
      // input: (e) => { setFormData({ ...formData, profile_image: profile }) }
    },
    {
      name: 'name',
      type: 'text',
      placeholder: 'Name of Instrument',
    },
    {
      name: 'category',
      type: 'dropdown',
      placeholder: 'Category of Instrument',
      list: [
        {
          option_element: '',
          option_text: 'Piano',
          option_value: 'piano',
          option_state: true,
          option_valueTooltipText: ''
        },
        {
          option_element: '',
          option_text: 'Guitar',
          option_value: 'guitar',
          option_state: true,
          option_valueTooltipText: ''
        },
        {
          option_element: '',
          option_text: 'Drums',
          option_value: 'drums',
          option_state: true,
          option_valueTooltipText: ''
        },
        {
          option_element: '',
          option_text: 'Orchestral',
          option_value: 'orchestral',
          option_state: true,
          option_valueTooltipText: ''
        },
        {
          option_element: '',
          option_text: 'Keyboard',
          option_value: 'keyboard',
          option_state: true,
          option_valueTooltipText: ''
        },
        {
          option_element: '',
          option_text: 'Microphone',
          option_value: 'microphone',
          option_state: true,
          option_valueTooltipText: ''
        },
        {
          option_element: '',
          option_text: 'Speaker',
          option_value: 'speaker',
          option_state: true,
          option_valueTooltipText: ''
        },
        {
          option_element: '',
          option_text: 'Synthesizer',
          option_value: 'synthesizer',
          option_state: true,
          option_valueTooltipText: ''
        }
      ]
    },
    {
      name: 'price',
      type: 'text',
      placeholder: 'Price',
    },
    {
      name: 'type',
      type: 'text',
      placeholder: 'Type of ' + (formData?.category === undefined ? 'Instrument' : formData?.category),
    },
    {
      name: 'manufacturer',
      type: 'text',
      placeholder: 'Manufacturer',
    },
    {
      name: 'Slogan',
      type: 'text',
      placeholder: 'Slogan',
    },
    {
      name: 'description',
      type: 'text',
      placeholder: 'Description',
    },
    {
      name: 'dimensions_unit',
      type: 'dropdown',
      placeholder: 'Dimensions Unit',
      list: [
        {
          option_element: '',
          option_text: 'cm',
          option_value: 'cm',
          option_state: true,
          option_valueTooltipText: ''
        },
        {
          option_element: '',
          option_text: 'mm',
          option_value: 'mm',
          option_state: true,
          option_valueTooltipText: ''
        }
      ]
    },
    {
      name: 'weight_unit',
      type: 'dropdown',
      placeholder: 'Weight Unit',
      list: [
        {
          option_element: '',
          option_text: 'kg',
          option_value: 'kg',
          option_state: true,
          option_valueTooltipText: ''
        },
        {
          option_element: '',
          option_text: 'g',
          option_value: 'g',
          option_state: true,
          option_valueTooltipText: ''
        }
      ]
    },
    {
      name: 'width',
      type: 'text',
      placeholder: 'Width',
    },
    {
      name: 'height',
      type: 'text',
      placeholder: 'Height',
    },
    {
      name: 'height',
      type: 'text',
      placeholder: 'Height',
    },
    {
      name: 'depth',
      type: 'text',
      placeholder: 'Depth',
    },
    {
      name: 'depth',
      type: 'text',
      placeholder: 'Weight',
    },
  ];


  const renderPage = (state) => {
    switch (state) {
      case "view-product":
        returnProductPage()
        break;
      case "edit-product":
        returnEditProduct()
        break;
    }
  }

  return (
    <div className="product_wrap" >
      {
        renderPage(pageState)
        // pageState === "view-product" ? returnProductPage() : returnEditProduct()
      }
    </div>
  )
};
