import React, { useCallback, useEffect, useState } from "react";
import { Link, useHref } from "react-router-dom";
import {
    Box,
    Drawer,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    AppBar,
    ListItemText,
    Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Logo from "../Logo";
import instructions from "../../config/instructions.json";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";

const Header = ({ isShowDrawer, openDrawer, closeDrawer }) => {
    const [drawerList, setDrawerList] = useState({
        isLoaded: false,
        error: null,
        items: [],
    });

    const initCollapseState = (data = []) => {
        const checkNestedItems = (item) => {
            const items = item?.items || [];

            if (items?.length) {
                return {
                    ...item,
                    isExpanded: false,
                    items: items.map((i) => checkNestedItems(i)),
                };
            } else return { ...item, isExpanded: false };
        };

        if (Array.isArray(data) && data?.length) {
            return data.map((item) => checkNestedItems(item));
        }
    };

    const newState = initCollapseState(instructions);
    console.log("new", newState);

    const getItem = useCallback((item) => {
        const items = item?.items || [];

        if (items?.length) {
            return (
                <ListItem key={item?.id} disablePadding>
                    <ListItemButton
                    // onClick={handleClick}
                    >
                        <ListItemText primary={item?.title} />
                        {/* {open ? <ExpandLess /> : <ExpandMore />} */}
                        <ExpandMore />
                    </ListItemButton>
                    <Collapse
                        // in={open}
                        timeout="auto"
                        unmountOnExit
                    >
                        <List component="div" disablePadding>
                            {items.map((i) => getItem(i))}
                        </List>
                    </Collapse>
                </ListItem>
            );
        } else
            return (
                <ListItem key={item?.id} disablePadding>
                    <ListItemButton
                    // onClick={handleClick}
                    >
                        <ListItemText primary={item?.title} />
                    </ListItemButton>
                </ListItem>
            );
    }, []);

    const fetchInstructionPage = async (path) => {
        try {
            const response = await fetch("static/instructions/page_1.html");
            if (response && response.status === 200) {
                return response.text();
            }
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        fetchInstructionPage().then((html) => {
            console.log("html", html.text());
            // const parser = new DOMParser();
            // const doc = parser.parseFromString(html, "text/html");

            // console.log('doc', doc);
        });
    }, [instructions]);

    return (
        <div className={`header ${isShowDrawer ? "header_indent" : ""}`}>
            <AppBar position="fixed" open={isShowDrawer} color="inherit">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={openDrawer}
                        sx={{
                            mr: 2,
                            ...(isShowDrawer && { display: "none" }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Logo />
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{ flexGrow: 1, ml: 2 }}
                        component="div"
                    >
                        Help
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className="header__drawer header-drawer">
                <Drawer variant="persistent" anchor="left" open={isShowDrawer}>
                    <Box className="header-drawer__header">
                        <IconButton onClick={closeDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Box>
                    <Divider />
                    <div className="header-drawer__list">
                        <List>
                            {Array.isArray(instructions) &&
                                instructions?.length > 0 &&
                                instructions.map((item) => getItem(item))}
                        </List>
                    </div>
                    <Divider />
                </Drawer>
            </div>
        </div>
    );
};

export default Header;
