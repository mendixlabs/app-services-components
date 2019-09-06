import { createElement } from "react";
import { shallow, ShallowWrapper, ReactWrapper, mount } from "enzyme";

import { TreeTable, TreeTableProps, TreeColumnProps, RowObject } from "../TreeTable";

const columns = (): TreeColumnProps[] => {
    return [
        {
            id: 'title',
            label: 'Title',
            originalAttr: 'title',
            width: "10",
            className: 'rowClass'
        },
        {
            id: 'text',
            label: 'Text',
            originalAttr: 'text',
            width: "10",
            className: 'rowClass'
        },
    ]
}

const rows = (): RowObject[] => {
    return [
        { key: '0001', id: '001', title: 'lvl0', text: 'HASTEXT' },
        { key: '0002', id: '002', title: 'lvl1', text: 'HASTEXT', _parent:'0001' },
        { key: '0003', id: '003', title: 'lvl1', text: 'HASTEXT', _parent:'0001' },
        { key: '0004', id: '004', title: 'lvl0', text: 'HASTEXT' },
    ]
}

const getTableProps = (): TreeTableProps => {
    return {
        columns: [],
        rows: [],
        size: "small",
        showHeader: true,
        selectMode: "none",
        loading: false,
        clickToSelect: false
    }
}

describe("TreeTable", () => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const createTable = (props: TreeTableProps): ShallowWrapper => shallow(<TreeTable {...props} />);
    const createFullTable = (props: TreeTableProps): ReactWrapper => mount(<TreeTable {...props} />);

    it("should render the structure", () => {
        const tableProps: TreeTableProps = getTableProps();
        const table = createTable(tableProps);
        expect(table.hasClass("widget-treetable-wrapper")).toBe(true);
    });

    it("should render columns", () => {
        const tableProps: TreeTableProps = {
            ...getTableProps(),
            columns: columns(),
        };
        const table = createFullTable(tableProps);

        // console.log(table.html());

        expect(table.find('.ant-table-header-column')).toHaveLength(2);
    });

    it("should render rows", () => {
        const tableProps: TreeTableProps = {
            ...getTableProps(),
            columns: columns(),
            rows: rows()
        };
        const table = createFullTable(tableProps);
        expect(table.find('.ant-table-tbody tr')).toHaveLength(2);
    });

    it("should expand rows", () => {
        const tableProps: TreeTableProps = {
            ...getTableProps(),
            columns: columns(),
            rows: rows(),
        };
        const table = createFullTable(tableProps);
        const expandButton = table.find('.treetable-treelevel-0 .ant-table-row-expand-icon').first();
        expandButton.simulate("click");
        expect(table.find('.ant-table-tbody tr')).toHaveLength(4);
        // expandButton.simulate("click");
        // expect(table.find('.ant-table-tbody tr')).toHaveLength(2);
    });

    it("should execute a click on rows", (done) => {
        const tableProps: TreeTableProps = {
            ...getTableProps(),
            columns: columns(),
            rows: rows(),
            onClick: jasmine.createSpy("onClick"),
            selectMode: 'single',
            clickToSelect: true
        };
        const table = createFullTable(tableProps);
        const row = table.find('.ant-table-tbody tr').first();
        row.simulate("click");

        setTimeout(() => {
            expect(tableProps.onClick).toHaveBeenCalled();
            done();
        }, 500);

    });

    it("should execute a double click on rows", (done) => {
        const tableProps: TreeTableProps = {
            ...getTableProps(),
            columns: columns(),
            rows: rows(),
            onDblClick: jasmine.createSpy("onClick"),
        };
        const table = createFullTable(tableProps);
        const row = table.find('.ant-table-tbody tr').first();
        row.simulate("dblclick");

        setTimeout(() => {
            expect(tableProps.onDblClick).toHaveBeenCalled();
            done();
        }, 500)

    });

});
