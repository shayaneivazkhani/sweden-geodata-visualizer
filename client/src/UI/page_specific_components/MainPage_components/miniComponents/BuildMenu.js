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
  { icon: <AssessmentSharpIcon />, label: "Ali", link: "/ali" },
  { icon: <AssessmentSharpIcon />, label: "Ahmed", link: "/ahmed" },
  { icon: <AssessmentSharpIcon />, label: "Dilan", link: "/dilan" },
  { icon: <AssessmentSharpIcon />, label: "Daniel", link: "/daniel" },
  { icon: <AssessmentSharpIcon />, label: "Hassim", link: "/hassim" },
  { icon: <AssessmentSharpIcon />, label: "Kevin", link: "/kevin" },
  { icon: <AssessmentSharpIcon />, label: "Lucas", link: "/lucas" },
  { icon: <AssessmentSharpIcon />, label: "Shayan", link: "/shayan" },
];



export default function BuildMenuToPersonalPages() {
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
      color: "var(--accent_color2)",
      fontFamily: "var(--accent-font1)",
      fontSize: 16,
      fontWeight: 400,
      textAlign: "left", // Center the text
      textTransform: "uppercase"
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
       
       <TypographyTitle>
            Individual custom subpages
       </TypographyTitle>
        
        <List>
          {data.map((item) => (
            <ListItemButton  component="a" href={item.link}
              key={item.label}
              sx={{
                  py: 0,
                  marginLeft: "7px",
                  minHeight: 36,
              }}
              style={{ color: "#fb9062" }}
            >
            <ListItemIcon sx={{ color: "inherit", minWidth: "auto", marginRight: "10px" }}>
                {item.icon}
            </ListItemIcon>
            <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                    fontFamily: "var(--secondary-font)",
                    fontSize: 16,
                    fontWeight: 400,
                }}
            />
        </ListItemButton>
          ))}
        </List>
      </Box>
    );

    const TypographyText = styled(Typography)(() => ({
      color: "var(--accent_color1)",
      fontFamily: "var(--secondary-font)",
      fontSize: 20,
      fontWeight: 500,
      //textTransform: "uppercase"
      paddingTop: "20px",
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
                            Build
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
