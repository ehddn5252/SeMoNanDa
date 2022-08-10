import React from "react";
import { Link } from 'react-router-dom';
import NavBar from "../../../common/navbar/NavBar";
import './Custom.css';
import styled from "styled-components";

function Custom() {
	const isCustom = true;

	return (
		<div id="Container" className="rank-base">
			<NavBar className="navbar" isCustom={isCustom}/>
			<h1>자유경연!</h1>
		</div>
	);
}

export default Custom;