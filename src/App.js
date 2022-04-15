import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { useMoralis } from "react-moralis";
import Moralis from 'moralis';
import Form from './Form'
import {useEffect} from 'react';

const App = ()=>{
  const {authenticate, isAuthenticated, user} = useMoralis();
  const { logout, isAuthenticating } = useMoralis();
  const {
    isWeb3Enabled,
    enableWeb3,
  } = useMoralis();

  useEffect(() => {
    if (!isWeb3Enabled) {
      enableWeb3();
    }
  }, []);
  if(isAuthenticated){
    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" >
            <Toolbar>
              <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                  NFT Minter
              </Typography>
              <Button color="inherit" onClick={()=>logout()} disabled={isAuthenticating}>Logout</Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Form/>
      </>
    );
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" >
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                NFT Minter
            </Typography>
            <Button color="inherit" onClick={()=>authenticate()} >Connect Wallet</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <h1 style={{textAlign: 'center', marginTop:"10%"}}>Sorry, Connect your Wallet to use App 😞</h1>
    </>
  );
}

export default App;
