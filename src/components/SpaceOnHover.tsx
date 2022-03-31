import { createElement, Fragment } from "react";
import { motion } from "framer-motion";

import { Type_SpaceOnHover_Props } from "../userTypes";
const SpaceOnHover = (props: Type_SpaceOnHover_Props) => {
    return (
        <Fragment>
            <motion.div
                style={{
                    height: "100%",
                    width: "100%"
                }}
                id={props.id}
                animate={{
                    width: !props.isColumn ? (props.activateHeight ? props.width / 2 : 0) : "initial",
                    height: props.isColumn ? (props.activateHeight ? props.height : 0) : "initial"
                }}
                transition={{ duration: 0.1 }}
            />
        </Fragment>
    );
};

export default SpaceOnHover;
