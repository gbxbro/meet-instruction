import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Logo from "./Logo";

const Header = ({ isShowDrawer, openDrawer, closeDrawer }) => {


    return (
        <div className={`header ${isShowDrawer ? "header_indent" : ""}`}>
            <AppBar position="static" open={isShowDrawer} color="inherit">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={openDrawer}
                        sx={{ mr: 2, ...(isShowDrawer && { display: "none" }) }}
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
                            {/* {posts?.items?.length > 0 &&
                                posts.items.map((item) => (
                                    <ListItem key={item?.id} disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon
                                                sx={{ flex: "0 0 20%" }}
                                            >
                                                <InboxIcon />
                                            </ListItemIcon>
                                            <Link
                                                to="/"
                                                className="header-drawer__link"
                                            >
                                                <ListItemText
                                                    primary={item?.title}
                                                />
                                            </Link>
                                        </ListItemButton>
                                    </ListItem>
                                ))} */}
                        </List>
                    </div>
                    <Divider />
                </Drawer>
            </div>
        </div>
    );
};

export default Header;
