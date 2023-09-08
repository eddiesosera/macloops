import React, { useContext, useEffect, useState } from "react";
import { Search } from "../components/search";
import Masonry from "react-responsive-masonry";
import { Card } from "../components/card";
import GeoSuggest from "@ubilabs/react-geosuggest";
import { Dropdown } from "react-day-picker";
import { DropDown } from "../components/dropDown";
import ReactPaginate from 'react-paginate';
import { ProductsContext, UserModeContext } from "../../App";
import './style/products.css'
import GeoSelect99, { GeoSelect33 } from "../components/geoSelection/geoSelect";
import { useLocation, useNavigate } from "react-router-dom";
import { Form } from "../components/form";
import axios from "axios";


function Items({ products }) {
  // const [productss, setProductss] = useContext(ProductsContext);

  return (
    <Masonry columnsCount={window.screen.width > 770 ? 5 : 1} gutter="30px" style={{ zIndex: '1' }}>
      {/* // columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }} */}
      {
        products?.map((product, index) => {
          return (
            <Card product={product} />
          )
        })
      }

    </Masonry>
  );
};


function PaginatedItems({ itemsPerPage }) {
  const [productss, setProducts] = useContext(ProductsContext);

  // Testing data by multiplying size of loop
  let products = productss

  // const numIterations = 24;

  // for (let i = 0; i < numIterations; i++) {
  //   const item = products[i];
  //   products.push(item);
  // }

  // setProductss(productss.map(prd => { productss.push(prd) }))

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = products.slice(itemOffset, endOffset);
  console.log('current itms in items:', currentItems)
  const pageCount = Math.ceil(products.length / itemsPerPage);
  console.log('page count: ', pageCount)

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % productss.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items products={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel={<div style={{ color: '#2293b6', cursor: 'pointer' }}><i class="ph-bold ph-arrow-right" /></div>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel={<div style={{ color: '#2293b6', cursor: 'pointer' }}><i class="ph-bold ph-arrow-left" /></div>}
        renderOnZeroPageCount={null}

        pageClassName="li_pagination"
        containerClassName="pagiantion_container"
        breakLinkClassName="pagination_breakLink"
        activeClassName="pagination_active"
      />
    </>
  );
}


export const Products = ({ products, userDB, itemsPerPage, userObj }) => {

  const [queryVal, setQueryVal] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterSelected, setFilterSelected] = useState("");
  const [sortSelected, setSortSelected] = useState("");
  const [userMode, setUserMode] = useContext(UserModeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({})


  // 2 page states = instruments
  const [pageState, setPageState] = useState('instruments');
  // const [userObj, setUserObj] = useState(JSON.parse(sessionStorage.getItem('user')));

  // Updating search input value
  const getQuery = q => {
    setQueryVal(q);
  };


  // Product Categories
  const productCategories = [
    {
      category_id: 0,
      category_name: 'All'
    },
    {
      category_id: 0,
      category_name: 'Pianos'
    },
    {
      category_id: 0,
      category_name: 'Keyboard'
    },
    {
      category_id: 0,
      category_name: 'Guitars'
    },
    {
      category_id: 0,
      category_name: 'Drums'
    },
    {
      category_id: 0,
      category_name: 'Microphones'
    },
    {
      category_id: 0,
      category_name: 'Orchestral'
    }
  ];


  // Filter options dropdown
  const filter_options = [
    {
      option_element: <i className='ph-fill ph-tag' style={{ color: '#3a7c91' }} />,
      option_text: 'Price',
      option_value: 'price',
      option_state: true,
      option_valueTooltipText: ''
    },
    {
      option_element: <i className='ph-fill ph-star-half' style={{ color: '#3a7c91' }} />,
      option_text: 'Rating',
      option_value: 'rating',
      option_state: true,
      option_valueTooltipText: ''
    }
  ];


  // Sort options dropdown
  const sort_options = [
    {
      option_element: '',
      option_text: 'Most Recent',
      option_value: 'most_recent',
      option_state: true,
      option_valueTooltipText: ''
    },
    {
      option_element: '',
      option_text: 'Highest',
      option_value: 'highest',
      option_state: true,
      option_valueTooltipText: ''
    },
    {
      option_element: '',
      option_text: 'Lowest',
      option_value: 'lowest',
      option_state: true,
      option_valueTooltipText: ''
    }
  ];


  // PAGINATE BY URL SECTION

  const url = location.pathname
  const url_segments = url.split('/');

  // console.log(url_segments[2])
  useEffect(() => {
    if (url_segments[2] === "admin") {
      if (url_segments[3] === "new") {
        setPageState("newStock");
      }
    }
  }, [url, pageState, url_segments])


  const getFormNewStockObj = obj => {
    setFormData(obj);
    console.log(obj)
  };

  // PAGE INSTRUMENTS
  const returnListOfProducts = () => {
    return (
      <div >
        <div className="topHeaderAndFilters_wrap" style={{ padding: '20px 0' }}>
          <div style={{ padding: '0 60px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '48px', fontFamily: 'Montserrat', fontWeight: '700', color: '#2f2e2d', textTransform: 'uppercase' }}>All Instruments</div>
              {
                userObj?.role === "admin" && userMode === "admin" &&
                <button style={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center', color: "#2293B6", background: '#EAF6F9',
                  border: '0.75px solid #C3E1E9', width: 'fit-content', height: "40px", padding: '0 20px', gap: "10px"
                }}
                  onClick={e => { navigate('/products/admin/new'); setPageState("new") }}>
                  <i className='ph-bold ph-plus' style={{ fontSize: '20px' }} />
                  <div style={{ fontFamily: 'Nunito Sans', fontWeight: '600' }}>New Stock</div>
                </button>
              }
            </div>
            <div className="search_query" style={{ marginBottom: '20px', display: queryVal !== "" ? 'block' : 'none' }}>
              {
                queryVal !== "" ? "Results for: " + queryVal : ""
              }
            </div>
          </div>
          <div className="products_content" style={{ padding: '0 60px', background: '#faf6f2', position: 'sticky', top: '80px', zIndex: '6' }}>
            <div className="products_top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Search query={getQuery} />

              {/* <div className="categoryAndFilter_wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> */}
              <ul className="products_top_category_wrap" style={{ padding: '20px 0', display: 'flex', gap: '10px', }}>
                {
                  productCategories.map((category, index) => {
                    return (
                      <li className="product_category" key={index} onClick={e => setSelectedCategory(category?.category_name)}
                        style={{
                          listStyle: 'none', padding: '12px', cursor: 'pointer', fontFamily: 'Nunito Sans', fontSize: '16px',
                          fontWeight: selectedCategory === category?.category_name ? "900" : '700', color: selectedCategory === category?.category_name ? '#111' : '#999'
                        }}
                      >{category?.category_name}</li>
                    )
                  })
                }
              </ul>
              {/* </div> */}
              <div className="filter_wrap" style={{ display: 'flex', gap: '20px', color: '#3a7c91' }}>
                <DropDown placeholder={"Filter by:"} selectedOptionLabel={"Filter by: " + filterSelected} options={filter_options} selectedValue={(opt) => { setFilterSelected(opt) }} index={0} />
                <DropDown placeholder={"Filter by:"} selectedOptionLabel={"Sort by: " + sortSelected} options={sort_options} selectedValue={(opt) => { setSortSelected(opt) }} index={1} />
              </div>
            </div>
          </div>
        </div>
        <div className="products_content_wrap" style={{ padding: '20px 60px' }}>
          <PaginatedItems itemsPerPage={10} />
        </div>
      </div>
    )
  }

  // PAGE: NEW STOCK
  const returnNewStock = () => {
    return (
      <div style={{ width: '-webkit-fill-available', padding: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="pp_left_wrap" onClick={e => { navigate('/products'); setPageState("instruments") }} style={{ position: 'absolute', marginLeft: '60px', left: '0', top: '0', marginTop: '60px', display: 'flex', border: '1px solid #D9E2E5', borderRadius: '50px', background: '#FFFBF6', padding: '12px', height: 'fit-content', width: 'fit-content', cursor: 'pointer' }}>
          <i class="ph-bold ph-arrow-left" style={{ fontSize: '20px', color: '' }} />
        </div>
        <Form formFields={inputFields} heading={'New Instrument'} btnAction={newStockAction} btnTitle={'Add Instrument'} formObj={getFormNewStockObj} />
      </div>
    )
  };


  // NEW STOCK FIELDS
  const inputFields = [
    {
      name: 'image_cover',
      type: 'single_image',
      maxNumber: 1,
      placeholder: 'Image Cover'
    },
    {
      name: 'images',
      type: 'multiple_image',
      maxNumber: 4,
      placeholder: 'Upload Images'
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
      type: 'number',
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
      name: 'slogan',
      type: 'text',
      placeholder: 'Slogan',
    },
    {
      name: 'description',
      type: 'textarea',
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
      type: 'number',
      placeholder: 'Width',
    },
    {
      name: 'height',
      type: 'number',
      placeholder: 'Height',
    },
    {
      name: 'depth',
      type: 'number',
      placeholder: 'Depth',
    },
    {
      name: 'weight',
      type: 'number',
      placeholder: 'Weight',
    },
  ];

  const newStockAction = async () => {
    if (formData?.image_cover !== undefined) {
      await axios.post('http://localhost:5000/api/product', formData,
        { headers: { "Content-Type": "application/json" } })
        .then((productRes => {
          console.log(productRes)
          navigate('/');
          // regRes && setRegStatus(true)
        }))
    } else {
      alert("Image upload error due to size")
    }

    // alert(formData.username)
  };

  // "weight_unit": "kg", "width": 0, "height": 0, "depth": 0, "weight": 0


  return (
    <div className="products_wrap" >
      {
        pageState === "instruments" ?
          returnListOfProducts()
          : returnNewStock()
      }
    </div>
  )
};
