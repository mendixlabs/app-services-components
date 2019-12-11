import { createElement } from "react";
import { shallow, ShallowWrapper, ReactWrapper, mount } from "enzyme";

import { TreeTable, TreeTableProps, TreeColumnProps, RowObject } from "../TreeTable";

const columns = (): TreeColumnProps[] => {
    return [
        {
            id: "title",
            label: "Title",
            originalAttr: "title",
            width: "10",
            className: "rowClass"
        },
        {
            id: "text",
            label: "Text",
            originalAttr: "text",
            width: null,
            className: null
        }
    ];
};

const rows = (): RowObject[] => {
    return [
        {
            key: "0001",
            id: "001",
            title: "lvl0",
            text: "HASTEXT",
            _className: "row-class-awesome",
            _childrenLoaded: true
        },
        { key: "0002", id: "002", title: "lvl1", text: "HASTEXT", _parent: "0001", _childrenLoaded: true },
        { key: "0003", id: "003", title: "lvl1", text: "HASTEXT", _parent: "0001", _childrenLoaded: true },
        { key: "0004", id: "004", title: "lvl0", text: "HASTEXT", _icon: "test", _childrenLoaded: true }
    ];
};

const getTableProps = (): TreeTableProps => {
    return {
        columns: [],
        rows: [],
        showHeader: true,
        selectMode: "none",
        loading: false,
        clickToSelect: false,
        lastLoadFromContext: 0
    };
};

const wait = (num: number): Promise<void> =>
    new Promise(resolve => {
        setTimeout(resolve, num);
    });

describe("TreeTable", () => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const createTable = (props: TreeTableProps): ShallowWrapper => shallow(<TreeTable {...props} />);
    const createFullTable = (props: TreeTableProps): ReactWrapper => mount(<TreeTable {...props} />);

    it("should render the structure", () => {
        const tableProps: TreeTableProps = getTableProps();
        const table = createTable(tableProps);
        expect(table.hasClass("widget-treetable-wrapper")).toBe(true);
    });

    it("should hide selectBoxes", () => {
        const tableProps: TreeTableProps = {
            ...getTableProps(),
            hideSelectBoxes: true
        };
        const table = createTable(tableProps);
        expect(table.hasClass("hide-selectboxes")).toBe(true);
    });

    it("should render columns", () => {
        const tableProps: TreeTableProps = {
            ...getTableProps(),
            columns: columns()
        };
        const table = createFullTable(tableProps);

        // console.log(table.html());

        expect(table.find(".ant-table-header-column")).toHaveLength(2);
    });

    it("should render rows", () => {
        const tableProps: TreeTableProps = {
            ...getTableProps(),
            columns: columns(),
            rows: rows()
        };
        const table = createFullTable(tableProps);
        expect(table.find(".ant-table-tbody tr")).toHaveLength(2);
    });

    it("should expand rows", async () => {
        const tableProps: TreeTableProps = {
            ...getTableProps(),
            columns: columns(),
            rows: rows()
        };
        const table = createFullTable(tableProps);
        const expandButton = table
            .find(".ant-table-tbody tr")
            .first()
            .find(".ant-table-row-expand-icon")
            .first();

        expandButton.simulate("click");
        expect(table.find(".ant-table-tbody tr")).toHaveLength(4);

        const expandButton2 = table
            .find(".ant-table-tbody tr")
            .first()
            .find(".ant-table-row-expand-icon")
            .first();
        expandButton2.simulate("click");
        let visible = 0;
        table.find(".ant-table-tbody tr").forEach(tr => {
            if (tr.html().indexOf("display: none") === -1) {
                visible += 1;
            }
        });

        expect(visible).toEqual(2);
    });

    it("should expand rows with expanderFunc", async () => {
        const rowsEmpty = [{ key: "0001", id: "001", title: "lvl0", text: "HASTEXT", children: [] }];
        const tableProps: TreeTableProps = {
            ...getTableProps(),
            columns: columns(),
            rows: rowsEmpty,
            expanderFunc: jasmine.createSpy("onExpand")
        };
        const table = createFullTable(tableProps);
        const expandButton = table
            .find(".ant-table-tbody tr")
            .first()
            .find(".ant-table-row-expand-icon")
            .first();

        expandButton.simulate("click");
        expect(tableProps.expanderFunc).toHaveBeenCalledTimes(1);
    });

    it("should execute a click on rows", async () => {
        const tableProps: TreeTableProps = {
            ...getTableProps(),
            columns: columns(),
            rows: rows(),
            onClick: jasmine.createSpy("onClick"),
            onSelect: jasmine.createSpy("onSelect"),
            selectMode: "single",
            clickToSelect: true
        };
        const table = createFullTable(tableProps);
        const row = table.find(".ant-table-tbody tr").first();
        const row2 = table.find(".ant-table-tbody tr").at(1);
        row.simulate("click");
        row.simulate("click");
        await wait(500);
        row2.simulate("click");
        await wait(500);

        expect(tableProps.onClick).toHaveBeenCalledTimes(2);
        expect(tableProps.onSelect).toHaveBeenCalledTimes(2);
    });

    it("should execute a double click on rows", async () => {
        const tableProps: TreeTableProps = {
            ...getTableProps(),
            columns: columns(),
            rows: rows(),
            onDblClick: jasmine.createSpy("onClick")
        };
        const table = createFullTable(tableProps);
        const row = table.find(".ant-table-tbody tr").first();

        row.simulate("dblclick");
        await wait(500);

        expect(tableProps.onDblClick).toHaveBeenCalled();
    });

    it("should select rows single", async () => {
        const tableProps: TreeTableProps = {
            ...getTableProps(),
            columns: columns(),
            rows: rows(),
            selectMode: "single",
            clickToSelect: true
        };

        const table = createFullTable(tableProps);
        table.setState({ selectedRowKeys: ["0001"] });

        const checkBox = table
            .find(".ant-table-tbody td")
            .first()
            .find("input")
            .first();
        checkBox.simulate("change", { target: { checked: false } });
        checkBox.simulate("change", { target: { checked: true } });
        checkBox.simulate("change", { target: { checked: false } });

        expect(table.state("selectedRowKeys")).toHaveLength(0);

        checkBox.simulate("change", { target: { checked: true } });

        const checkBox2 = table.find(".ant-table-thead input");
        checkBox2.simulate("change", { target: { checked: false } });

        expect(table.state("selectedRowKeys")).toHaveLength(0);
    });

    it("should select single on first", async () => {
        const tableProps: TreeTableProps = {
            ...getTableProps(),
            columns: columns(),
            rows: rows(),
            selectMode: "single",
            clickToSelect: true,
            selectFirst: true
        };

        const table = createFullTable(tableProps);
        expect(table.state("selectedRowKeys")).toHaveLength(1);
    });

    it("should select multi rows", async () => {
        const tableProps: TreeTableProps = {
            ...getTableProps(),
            columns: columns(),
            rows: rows(),
            selectMode: "multi",
            clickToSelect: true
        };

        const table = createFullTable(tableProps);
        table.setState({ selectedRowKeys: ["0001"] });

        const row = table.find(".ant-table-tbody tr").first();
        const row2 = table.find(".ant-table-tbody tr").at(1);
        row.simulate("click");
        await wait(500);
        row2.simulate("click");
        await wait(500);

        expect(table.state("selectedRowKeys")).toHaveLength(1);

        const checkBox = table.find(".ant-table-thead input");
        checkBox.simulate("change", { target: { checked: false } });

        expect(table.state("selectedRowKeys")).toHaveLength(0);
    });

    it("should set props", async () => {
        const tableProps: TreeTableProps = {
            ...getTableProps(),
            columns: columns(),
            rows: rows(),
            selectMode: "single",
            clickToSelect: true,
            selectFirst: true
        };

        const table = createFullTable(tableProps);

        table.setProps({ rows: [] });

        expect(table.state("rows")).toHaveLength(0);
    });
});
