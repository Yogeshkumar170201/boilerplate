import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Moralis from 'moralis';
import { useMoralis } from "react-moralis";

const Form = () => {

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    const {user} = useMoralis();
    const submitbtn = async ()=>{
        if(isFilePicked){
            let data = selectedFile;
            const imageFile = new Moralis.File(data.name, data)
            await imageFile.saveIPFS();
            let imageHash = imageFile.hash();
            // console.log(imageHash);
            // console.log(imageFile.ipfs());
            // console.log(selectedFile)
            let metadata = {
                name:name,
                description:desc,
                image:'/ipfs/'+imageHash
            }
            const jsonFile = new Moralis.File("metadata.json", {base64:btoa(JSON.stringify(metadata))});
            await jsonFile.saveIPFS();
            let metadataHash = jsonFile.hash();
            const res = await Moralis.Plugins.rarible.lazyMint({
                chain: 'rinkeby',
                userAddress: user.get("ethAddress"),
                tokenType: 'ERC721',
                tokenUri: '/ipfs/'+metadataHash,
                royaltiesAmount: 5,
            })
            // console.log(res);
            alert('NFT Successfully Minted')
        }
        setName("");
        setDesc("");
        setSelectedFile();
        setIsFilePicked(false);
    }

  return (
    <Box width= "50%" margin={5} sx={{ display: 'flex',flexDirection: 'column', alignItems: 'space-between'  }}>
        <TextField id="outlined-basic" label="Name" variant="outlined" name= "name" value={name} onChange={(e)=>setName(e.target.value)} />
        <TextField id="outlined-basic" label="Description" variant="outlined" name="desc" value={desc} onChange={(e)=>setDesc(e.target.value)} />
        <Button
            variant="contained"
            component="label"
        >
            Upload NFT
            <input
                type="file"
                hidden
                name="file"
                onChange={(e)=>{setSelectedFile(e.target.files[0]);setIsFilePicked(true)}}
            />
        </Button>
        <Button margin={10} variant="outlined" onClick={()=>{submitbtn()}}>Submit</Button>
    </Box>
  )
}

export default Form