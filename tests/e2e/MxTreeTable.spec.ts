import homepage from "./pages/home.page";

describe("MxTreeView", () => {
    it("should render a table", () => {
        homepage.open();

        homepage.table().waitForExist();

        const tableExists = homepage.table().isExisting();
        expect(tableExists).toBeTruthy();
    });
});
