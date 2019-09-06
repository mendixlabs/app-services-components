import { createElement } from "react";
import { shallow } from "enzyme";

import { TreeTable, TreeTableProps } from "../TreeTable";

// TODO: Write more tests (although this is just a simple wrapper around ant.design TreeTable)

describe("TreeTable", () => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const createTable = (props: TreeTableProps) => shallow(<TreeTable {...props} />);

    it("should render the structure", () => {
        const tableProps: TreeTableProps = {
            columns: [],
            rows: [],
            size: "small",
            showHeader: true,
            selectMode: "none",
            loading: false
        };
        const table = createTable(tableProps);

        // console.log(table.html());

        expect(table.hasClass("widget-treetable-wrapper")).toBe(true);
    });
});
