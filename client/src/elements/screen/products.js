import React, { useContext, useState } from "react";
import { Search } from "../components/search";
import Masonry from "react-responsive-masonry";
import { Card } from "../components/card";
import GeoSuggest from "@ubilabs/react-geosuggest";
import { Dropdown } from "react-day-picker";
import { DropDown } from "../components/dropDown";
import ReactPaginate from 'react-paginate';
import { ProductsContext } from "../../App";


const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];


function Items({ productss }) {
  // const [productss, setProductss] = useContext(ProductsContext);

  return (
    <Masonry columnsCount='6' gutter="30px" style={{ zIndex: '2' }}
    // columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
    >
      {
        productss?.map((product, index) => {
          return (
            <Card product={product} />
          )
        })
      }

    </Masonry>
  );
};


function PaginatedItems({ itemsPerPage }) {
  const [products, setProducts] = useContext(ProductsContext);

  // Testing data by multiplying size of loop
  let productss = products

  const numIterations = 24;

  for (let i = 0; i < numIterations; i++) {
    const item = productss[i];
    productss.push(item);
  }

  // setProductss(productss.map(prd => { productss.push(prd) }))
  console.log(productss)

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = productss.slice(itemOffset, endOffset);
  console.log('current itms in items:', currentItems)
  const pageCount = Math.ceil(productss.length / itemsPerPage);
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
      <Items productss={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel={<div style={{ color: 'red' }}>NEXT</div>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}


export const Products = ({ products, itemsPerPage }) => {

  const [queryVal, setQueryVal] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterSelected, setFilterSelected] = useState("");
  const [sortSelected, setSortSelected] = useState("");

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
      option_element: <i className='ph-fill ph-tag' style={{ color: '#3A7C91' }} />,
      option_text: 'Price',
      option_value: 'price',
      option_state: true,
      option_valueTooltipText: ''
    },
    {
      option_element: <i className='ph-fill ph-star-half' style={{ color: '#3A7C91' }} />,
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


  // PAGINATION


  return (
    <div className="products_wrap" >
      <div >
        <div className="topHeaderAndFilters_wrap" style={{ padding: '20px 0' }}>
          <div style={{ padding: '0 60px' }}>
            <div style={{ fontSize: '72px', fontFamily: 'Montserrat', fontWeight: '700', color: '#2f2e2d', textTransform: 'uppercase' }}>All Instruments</div>
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
                          listStyle: 'none', padding: '12px', cursor: 'pointer', fontFamily: 'Nunito Sans',
                          fontWeight: selectedCategory === category?.category_name ? "700" : '500', color: selectedCategory === category?.category_name ? '#111' : '#999'
                        }}
                      >{category?.category_name}</li>
                    )
                  })
                }
              </ul>
              {/* </div> */}
              <div className="filter_wrap" style={{ display: 'flex', gap: '20px' }}>
                <DropDown placeholder={"Filter by:"} selectedOptionLabel={"Filter by: " + filterSelected} options={filter_options} selectedValue={(opt) => { setFilterSelected(opt) }} index={0} />
                <DropDown placeholder={"Filter by:"} selectedOptionLabel={"Sort by: " + sortSelected} options={sort_options} selectedValue={(opt) => { setSortSelected(opt) }} index={1} />
              </div>
            </div>
          </div>
        </div>
        <div className="products_content_wrap" style={{ padding: '20px 60px' }}>
          {/* <Masonry columnsCount='6' gutter="30px" style={{ zIndex: '2' }}
          // columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            {
              products?.map((product, index) => {
                return (
                  <Card product={product} />
                )
              })
            }
            {
              products?.map((product, index) => {
                return (
                  <Card product={product} />
                )
              })
            }
            {
              products?.map((product, index) => {
                return (
                  <Card product={product} />
                )
              })
            }
          </Masonry> */}
          <PaginatedItems itemsPerPage={24} />
        </div>
      </div>


      <GeoSuggest />
    </div>
  )
};
