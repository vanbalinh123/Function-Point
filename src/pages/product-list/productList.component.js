import { NavLink, Outlet } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { fetchProduct } from "../../redux/list.slice";
import { deletedProduct } from "../../redux/list.slice";
import { productDeleted } from "../../redux/list.slice";
import { filterProduct } from "../../redux/list.slice";


import './productList.styles.css'

const ProductList = () => {
    const list = useSelector(state => state.list.list)
    const dispatch = useDispatch(); 
    const [nameFilter, setNameFilter] = useState('');
    useEffect(() => {
        dispatch(fetchProduct({name: ''}))
    }, [])


    const hanleFilter = () => {
        dispatch(fetchProduct({name: nameFilter}))
    }

    const handleSaveFile = (item) => {
    
    // Tạo object
    const fileContent = item;
      
      // Chuyển đổi object thành chuỗi JSON
      const jsonString = JSON.stringify(fileContent);
      
      // Tạo đối tượng Blob từ chuỗi JSON
      const blob = new Blob([jsonString], { type: 'application/json' });
      
      // Tạo URL đại diện cho file
      const fileURL = URL.createObjectURL(blob);
      
      // Tạo thẻ <a> để tải xuống file
      const downloadLink = document.createElement('a');
      downloadLink.href = fileURL;
      downloadLink.download = 'file.txt'; // Tên file muốn lưu
      
      // Thêm thẻ <a> vào DOM và kích hoạt tải xuống
      document.body.appendChild(downloadLink);
      downloadLink.click();
      
      // Xóa URL đại diện cho file sau khi tải xuống
      URL.revokeObjectURL(fileURL);
      
      // Xóa thẻ <a> đã tạo
      document.body.removeChild(downloadLink);
    }
    
    const handleDelete = (id) => {
        const isConfirmed = window.confirm(`Do you want to delete (id=${id}) or not?`);
        if(isConfirmed) {
            dispatch(deletedProduct(id));
            dispatch(productDeleted(id))
        }
    }

    return( 
        <div className='product-list'>
                        <div className="header">
                <h2>Product List</h2>
                <NavLink
                    to='/productDetail/new'
                >
                    <button className="primary-btn add-new">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide w-4 h-4 mr-2"><line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add New Product
                    </button>
                </NavLink>
            </div>
            <form className="form-list">
            <div className="fillter-box">
                <div className='filter-box__input-container'>
                    <label className="label">Product Name:</label>
                    <input 
                        type='text'
                        className='input' 
                        placeholder='Product name...'
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                    />
                </div>
                <button 
                    type="button"
                    className='primary-btn'
                    onClick={hanleFilter}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide w-4 h-4 mr-2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    Filter
                </button>
            </div>
            {list.map((item) => (
                <div className='row-item' key={item.id}>
                    <div className="header-row-item">
                        <span><label className="label">Name: </label>{item.name}</span>
                        <div class="button">
                            <NavLink
                                to = {`/productDetail/${item.id}`}
                            >
                                <button className="primary-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide w-4 h-4 mr-1"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path></svg>
                                        Edit
                                </button>
                            </NavLink>
                            <button 
                                className="primary-btn"
                                type="button"
                                onClick={() => handleDelete(item.id)}    
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide w-4 h-4 mr-1"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                    Delete
                            </button>
                        </div>
                    </div>
                    <div className="body-row-item">
                        <div><label className="label">EI: </label>{item.ei}</div>
                        <div><label className="label">EQ: </label>{item.eq}</div>
                        <div><label className="label">EO: </label>{item.eo}</div>
                        <div><label className="label">EIF: </label>{item.eif}</div>
                        <div><label className="label">ILF: </label>{item.ilf}</div>
                        {/* <div><label className="label">UFC: </label>{item.ufc}</div>
                        <div><label className="label">VAF: </label>{item.vaf}</div> */}
                    </div>
                    <div className="footer-row-item ufc-vaf">
                        <span><label className="label">Weight: </label>{item.weight}</span>
                        <span><label className="label">UFC: </label>{item.ufc}</span>
                        <span><label className="label">VAF: </label>{item.vaf}</span>
                    </div>
                    <div className="footer-row-item">
                        <span><label className="label">Function Point: </label>{item.funcPoint}</span>
                    </div>
                    <div className="footer-row-item">
                        <span><label className="label">Language: </label>{item.textLanguage}</span>
                    </div>
                    <div className="footer-row-item">
                        <span><label className="label">Average number of lines of code of 1 engineer/day: </label>{item.lineOfDay}</span>
                    </div>
                    <div className="footer-row-item">
                        <span><label className="label">Effort: </label>{item.effort}</span>
                    </div>
                    <button 
                        type="button"
                        className="primary-btn save-file-excel"
                        onClick={() => handleSaveFile(item)}    
                    >
                        Save File txt
                    </button>
                </div>
            ))}
            </form>
        </div>
    )
}

export default ProductList;