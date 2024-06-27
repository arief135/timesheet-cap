import BusyDialog from "sap/m/BusyDialog";
import Dialog from "sap/m/Dialog";
import UI5Date from "sap/ui/core/date/UI5Date";
import DateFormat from "sap/ui/core/format/DateFormat";
import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import Calendar from "sap/ui/unified/Calendar";



interface CreateNewModelType {
    dates: UI5Date[],
    activity: int,
    location: int,
    detail: string
}

/**
 * @namespace freestyle.controller
 */
export default class View1 extends Controller {

    private dialog: Dialog
    private createNewModel: JSONModel
    private dateFormatter: DateFormat

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        this.dateFormatter = DateFormat.getDateInstance({ pattern: "yyy-MM-dd" });
    }

    public onAfterRendering(): void | undefined {
        this.onCreateTimesheetPress()
    }

    public async onCreateTimesheetPress() {
        this.dialog = await this.loadFragment({ name: 'freestyle.view.Entry' }) as Dialog

        const initialData: CreateNewModelType = {
            dates: [],
            activity: 0,
            location: 0,
            detail: ""
        }

        this.createNewModel = new JSONModel(initialData)
        this.getView()?.setModel(this.createNewModel, 'CreateNewModel')
        this.dialog.open()

        this.dialog.attachAfterClose(() => {
            this.dialog.destroy()
        })
    }

    public closeDialog() {
        this.dialog.close()
    }

    public onCalendarSelect(oEvent: any) {
        const calendar = oEvent.getSource() as Calendar
        const dates = calendar.getSelectedDates().map(e => e.getStartDate())

        const jsonData = this.createNewModel.getData() as CreateNewModelType
        this.createNewModel.setData({ ...jsonData, dates })
    }

    public submitTimesheet() {
        const defaultModel = this.getView()?.getModel() as ODataModel
        const timesheetBind = defaultModel.bindList('/TimesheetEntry')

        const busyDialog = new BusyDialog()
        busyDialog.open();
        timesheetBind.attachCreateCompleted(() => {
            busyDialog.close()
            this.dialog.close()
            defaultModel.refresh()
        })

        const jsonData = this.createNewModel.getData() as CreateNewModelType

        jsonData.dates
            .map(d => {
                return {
                    atype_ID: Number(jsonData.activity),
                    detail: jsonData.detail,
                    date: this.dateFormatter.format(d),
                    month_ID: d.getMonth(),
                    year: d.getFullYear(),
                    location_ID: Number(jsonData.location)
                }
            })
            .forEach(d => timesheetBind.create(d))
        
        
    }
}