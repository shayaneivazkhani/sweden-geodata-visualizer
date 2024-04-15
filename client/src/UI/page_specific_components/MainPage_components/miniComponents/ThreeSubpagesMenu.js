import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import AssessmentSharpIcon from '@mui/icons-material/AssessmentSharp';
const data = [
  { icon: <AssessmentSharpIcon />, label: "Food Sales", link: "/livsmedel" },
  { icon: <AssessmentSharpIcon />, label: "Organic Sales", link: "/ekologiskt" },
  { icon: <AssessmentSharpIcon />, label: "Deals Made", link: "/deals" },
];



export default function TreeSubpagesMenuToStatisticPages() {
    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };


    const TypographyTitle = styled(Typography)(() => ({
      fontFamily: "Optima",
      fontSize: "25px",
      color: "rgb(163,239,243)",
      fontWeight: 500,
      fontSize: 26,
      textAlign: "center", // Center the text
      //textTransform: "uppercase"
    }));
  
    const list = (anchor) => (
      <Box
        bgcolor="rgba(0,0,0,0.9)"
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
          paddingTop: '20px', // Add padding to the top
          paddingLeft: '20px' // Add padding to the left
        }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
       
       <Typography variant="overline" color={"rgb(163,239,243)"} display="block" gutterBottom>
               Navigate to pages with statistics
      </Typography>
        
        <List>
          {data.map((item) => (
            <ListItemButton  component="a" href={item.link}
              key={item.label}
              sx={{
                  py: 0,
                  minHeight: 32,
              }}
              style={{ color: "#fb9062" }}
            >
            <ListItemIcon sx={{ color: "inherit" }}>
                {item.icon}
            </ListItemIcon>
            <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: "medium",
                }}
            />
        </ListItemButton>
          ))}
        </List>
      </Box>
    );

    const TypographyText = styled(Typography)(() => ({
      fontFamily: "Copperplate",
      fontSize: "25px",
      color: "rgb(163,239,243)",
      fontWeight: 500,
      fontSize: 20,
      //textTransform: "uppercase"
      paddingTop: "20px",
      transition: "0.10s",
      "&:hover": {
        transform: "scale(1.03)",
      }
    }));
  
    return (
      <div>
        {['top'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>
                <TypographyText >
                            Statistics
                </TypographyText>
            </Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    );
}