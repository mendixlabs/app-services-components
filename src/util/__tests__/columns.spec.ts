import { getColumns } from "../columns";
import { TreeviewColumnProps } from "../../../typings/MxTreeTableProps";

const treeviewColumns: TreeviewColumnProps[] = [
    {
        columnAttr: "Title",
        columnTitleType: "attr",
        columnClassName: "mx-first-column",
        columnHeader: "Title",
        columnWidth: "",
        transformNanoflow: { nanoflow: [], paramsSpec: { Progress: "" } }
    },
    {
        columnAttr: "Title",
        columnTitleType: "attr",
        columnClassName: "",
        columnHeader: "Title",
        columnWidth: "100",
        transformNanoflow: { nanoflow: [], paramsSpec: { Progress: "" } }
    }
];

describe("Columns", () => {
    it("getColumns tools should return correct columns", async () => {
        const empty = getColumns([]);
        const double = getColumns(treeviewColumns);
        const dynamic = getColumns(treeviewColumns, false);

        expect(empty).toHaveLength(0);
        expect(double).toHaveLength(2);
        expect(dynamic).toHaveLength(0);
    });
});
