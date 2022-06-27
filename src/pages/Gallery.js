import react from "react";
import { useEffect } from "react";
import db from '../components/firebasedb.js'
import {collection, doc, getDocs,addDoc} from 'firebase/firestore'
import { useState, useRef} from "react";
import { useContext } from 'react';
import AuthContext from '../store/auth-context.js'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
const Gallery = ()=>{
    const [images,setImages]=useState([]);
    const imagereference = useRef();
    const imagesRef=collection(db, "images");
    const imageHandler = async()=>{
        const curSrc=imagereference.current.value;
        
        /* await addDoc(imagesRef,{src:curSrc}) */
    }
    const HandleThings=()=>{
        imageHandler();
        setImages([...images,imagereference.current.value]);
        imagereference.current.value=""
        console.log(imagereference);
    }
    const handleChange= async(event)=> {
        imageHandler();
        setImages([...images,{link:event.target.files[0]}]);
        await addDoc(imagesRef,{src:event.target.files[0]})
        
      }
    useEffect(()=>{
        const getImages=async()=>{
            let arr=[]
            const data = await getDocs(imagesRef); 
           setImages(data.docs.map((doc)=>({...doc.data(),id:doc.id})));   
        };
       // getImages();

    },[images]);
    return (
              
           <div className="ImgGallery">
               
               <Button variant="contained" component="span">
               <input type="file" ref={imagereference} onChange={handleChange}/>
          
        </Button>
               {console.log(images)}
               <h1 style={{textAlign:"Center"}}>Gallery</h1>
               <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
              
      {images.map((img) => (
        <ImageListItem key={img.src+Math.random}>
          <img
            src={`${img.link}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${img.link}`}
            alt={"Image"}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
               
           </div>
    )
}
export default Gallery;