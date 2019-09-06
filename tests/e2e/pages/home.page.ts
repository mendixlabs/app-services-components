class HomePage {

    public table() { return $(".widget-treetable-wrapper"); }

    public open(): void {
        browser.url("/");
    }
}
const homepage = new HomePage();
export default homepage;
