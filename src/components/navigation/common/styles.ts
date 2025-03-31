import { alpha, Theme } from "@mui/material";

/**
 * 获取桌面导航链接样式
 */
export const getDesktopNavLinkStyles = ( active: boolean ) => ( {
    mx           : 0.5,
    py           : 1.5,
    fontWeight   : active ? 600 : 500,
    letterSpacing: "0.3px",
    fontSize     : "0.95rem",
    textTransform: "none",
    transition   : "all 0.3s ease",
    borderRadius : "18px",
    minWidth     : 0,
    "&:hover"    : {
        backgroundColor: "transparent"
    },
    paddingBottom: "10px",
    marginBottom : "2px"
} );

/**
 * 获取移动端导航链接样式
 */
export const getMobileNavLinkStyles = ( _active: boolean, _theme: Theme, color: string ) => ( {
    borderRadius: 2, my: 0.5, "&.Mui-selected": {
        backgroundColor: alpha ( color, 0.1 ), color: color, "&::after": {
            content        : "\"\"",
            position       : "absolute",
            left           : "10px",
            top            : "50%",
            transform      : "translateY(-50%)",
            width          : "4px",
            height         : "60%",
            backgroundColor: color,
            borderRadius   : "4px",
            boxShadow      : `0 0 8px ${ color }`
        }
    }, "&:hover": {
        backgroundColor: alpha ( color, 0.05 )
    }
} );
