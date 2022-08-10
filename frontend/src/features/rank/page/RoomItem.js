import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import red_rooom from "../../../assets/images/red_room.png"


const Layout = styled.div`
    background-image: url(${red_rooom});
    background-size : cover;
    height : 100vh;
    width : 100%;
`;


function RoomItem(props) {
  return (
    <>
    <Layout>
        <h1>룸 아이템</h1>
            {/* <li className='rooms_item'>
                <Link className='rooms_item_link' to={props.path}>
                <figure className='rooms_item_pic-wrap' data-category={props.label}>
                    <img
                    className='rooms_item_img'
                    alt='Logo Image'
                    src={props.src}
                    />
                </figure>
                <div className='rooms_item_info'>
                    <button className='rooms_item_title'>{props.title}</button>
                    <button className='rooms_item_personnel'>{props.pesonnel}</button>
                    <button className='rooms_item_text'>{props.text}</button>
                </div>
                </Link>
            </li> */}
    </Layout>
    </>
  );
}

export default RoomItem;