import { useState, useRef, useEffect, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { Box, H6, Span } from "../../styles";
import AuthContext from "../../store/auth";
import { useHistory, Link, useLocation } from "react-router-dom";

const MenuDrop = () => {
  const history = useHistory();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const logoutHandler = () => {
    auth.logout();
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Box type="row">
      <Box type="column" mr={"45px"}>
        {" "}
        <Span
          m={0}
          color={"white"}
          style={{
            lineHeight: "45px",
            color: "#fff",
            borderBottom:
              location.pathname === "/create" && "4px solid #43AFFF",
          }}
        >
          <Link to="/create" style={{ textDecoration: "none", color: "white" }}>
            {" "}
            Post a Job
          </Link>
          {/* <Divider style={{ color: "blue" }} /> */}
        </Span>
      </Box>
      <Avatar style={{ backgroundColor: "#D9EFFF", color: "#303F60" }}>
        R
      </Avatar>
      <div>
        <ArrowDropDownIcon
          style={{
            color: "ffffff",
          }}
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        />

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          style={{
            marginTop: "22px",
            marginRight: "110px",
          }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
                width: "15ch",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem
                      onClick={logoutHandler}
                      style={{ color: "#303F60" }}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Box>
  );
};

export default MenuDrop;
