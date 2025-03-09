import { alpha, Box, Button, useTheme as useMuiTheme } from "@mui/material";
import { AnimatePresence, motion }                     from "framer-motion";
import React, { useState }                             from "react";
import { useTranslation }                              from "react-i18next";
import { FiChevronDown, FiChevronUp }                  from "react-icons/fi";
import { useTheme }                                    from "../../../contexts/ThemeContext";
import TechTag                                         from "./TechTag";

interface Tag
{
    label: string;
    icon?: React.ReactNode;
    url?: string;
    category?: string;
}

interface AnimatedTagGroupProps
{
    tags: ( string | Tag )[];
    initialVisibleCount?: number;
    maxHeight?: number | string;
    variant?: "default" | "small" | "large";
    getTagIcon?: ( tag: string, index: number ) => React.ReactNode | undefined;
}

/**
 * 动画标签组组件
 * 用于显示一组可折叠的标签
 */
const AnimatedTagGroup: React.FC<AnimatedTagGroupProps> = ( {
                                                                tags,
                                                                initialVisibleCount = 4,
                                                                maxHeight = 200,
                                                                variant = "small",
                                                                getTagIcon
                                                            } ) =>
{
    const { theme } = useTheme ();
    const muiTheme = useMuiTheme ();
    const { t } = useTranslation ();
    const [ expanded, setExpanded ] = useState ( false );

    const visibleTags = expanded ? tags : tags.slice ( 0, initialVisibleCount );
    const hasMoreTags = tags.length > initialVisibleCount;

    // 切换展开状态
    const toggleExpanded = () => setExpanded ( !expanded );

    // 标签动画变体
    const tagVariants = {
        hidden   : { opacity: 0, scale: 0.8, y: 10 }, visible: ( i: number ) => ( {
            opacity: 1, scale: 1, y: 0, transition: {
                type: "spring", stiffness: 260, damping: 20, delay: i * 0.05
            }
        } ), exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
    };

    // 渲染标签
    const renderTag = ( tag: string | Tag, index: number ) =>
    {
        const isStringTag = typeof tag === "string";
        const label = isStringTag ? tag : tag.label;
        const icon = isStringTag ? ( getTagIcon ? getTagIcon ( tag, index ) : undefined ) : tag.icon;
        const url = isStringTag ? undefined : tag.url;
        const category = isStringTag ? undefined : tag.category;

        return <motion.div
                key = { label }
                custom = { index }
                variants = { tagVariants }
                initial = "hidden"
                animate = "visible"
                exit = "exit"
                style = { { display: "inline-block", margin: "0.25rem" } }
            >
                <TechTag
                    label = { label }
                    icon = { icon }
                    url = { url }
                    category = { category }
                    variant = { variant }
                    animate = { false }
                    index = { index }
                />
            </motion.div>;
    };

    return <Box>
            <Box
                sx = { {
                    display   : "flex",
                    flexWrap  : "wrap",
                    maxHeight : expanded ? "none" : maxHeight,
                    overflow  : expanded ? "visible" : "hidden",
                    transition: "all 0.3s ease",
                    mb        : hasMoreTags ? 1 : 0
                } }
            >
                <AnimatePresence>
                    { visibleTags.map ( ( tag, index ) => renderTag ( tag, index ) ) }
                </AnimatePresence>
            </Box>

            { hasMoreTags && <Button
                    onClick = { toggleExpanded }
                    size = "small"
                    startIcon = { expanded ? <FiChevronUp size = { 14 } /> : <FiChevronDown size = { 14 } /> }
                    sx = { {
                        fontSize       : "0.7rem",
                        color          : theme === "dark" ?
                                         muiTheme.palette.primary.light :
                                         muiTheme.palette.primary.main,
                        backgroundColor: theme === "dark" ?
                                         alpha ( muiTheme.palette.primary.main, 0.1 ) :
                                         alpha ( muiTheme.palette.primary.main, 0.05 ),
                        borderRadius   : "20px",
                        p              : "4px 10px",
                        "&:hover"      : {
                            backgroundColor: theme === "dark" ?
                                             alpha ( muiTheme.palette.primary.main, 0.2 ) :
                                             alpha ( muiTheme.palette.primary.main, 0.1 )
                        }
                    } }
                >
                    { expanded ? t ( "common.showLess", "Show Less" ) : t ( "common.showMore", "Show More" ) }
                </Button> }
        </Box>;
};

export default AnimatedTagGroup;
