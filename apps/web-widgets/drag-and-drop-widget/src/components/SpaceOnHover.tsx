import { createElement, Fragment, FunctionComponent } from "react";
import { motion } from "framer-motion";

import { Type_SpaceOnHover_Props } from "../userTypes";

const SpaceOnHover: FunctionComponent<Type_SpaceOnHover_Props> = props => {
    return (
        <Fragment>
            <motion.div
                id={props.id}
                style={{
                    height: "100%",
                    width: "100%"
                }}
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
