import Dialog from "sap/m/Dialog";
import UI5Date from "sap/ui/core/date/UI5Date";
import DateFormat from "sap/ui/core/format/DateFormat";
import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import Context from "sap/ui/model/odata/v4/Context";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import Calendar from "sap/ui/unified/Calendar";
import Event from "sap/ui/base/Event";
import ListBinding from "sap/ui/model/ListBinding";
import Filter from "sap/ui/model/Filter";
import Table from "sap/m/Table";
import MessageToast from "sap/m/MessageToast";
import ODataContextBinding from "sap/ui/model/odata/v4/ODataContextBinding";



interface CreateNewModelType {
    dates: UI5Date[],
    activity: int,
    location: int,
    detail: string
}

interface FilterTimesheetModelType {
    period: Date;
}

interface SelectionModelType {
    selected: object[]
}


/**
 * @namespace freestyle.controller
 */
export default class Main extends Controller {

    private dialog: Dialog
    private dateFormatter: DateFormat

    private defaultModel: ODataModel
    private createNewModel: JSONModel
    private filterTimesheetModel: JSONModel
    private selectionModel: JSONModel
    private userModel: JSONModel

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        this.dateFormatter = DateFormat.getDateInstance({ pattern: "yyy-MM-dd" });
        
        this.defaultModel = this.getOwnerComponent()?.getModel() as ODataModel

        this.userModel = new JSONModel()
        this.getView()?.setModel(this.userModel, 'UserModel')
        
        this.filterTimesheetModel = new JSONModel({ period: new Date() } as FilterTimesheetModelType)
        this.getView()?.setModel(this.filterTimesheetModel, 'FilterTimesheetModel')

        this.selectionModel = new JSONModel({ selected: [] } as SelectionModelType)
        this.getView()?.setModel(this.selectionModel, 'SelectionModel')

        const oTable = this.byId('timesheetTable') as Table
        oTable.attachSelectionChange((e) => {
            const selected = oTable.getSelectedContexts().map(e => e.getObject())
            this.selectionModel.setData({ selected })
        })
    }

    filterTable() {
        const listBinding = this.byId('timesheetTable')?.getBinding('items') as ListBinding
        listBinding.filter(new Filter({
            path: 'month_ID', operator: 'EQ',
            value1: (this.filterTimesheetModel.getData() as FilterTimesheetModelType).period.getMonth()
        }))
    }

    onBeforeRendering(): void | undefined {
        this.filterTable()

        const contextBinding = this.defaultModel.bindContext('/getUser(...)') as ODataContextBinding
        contextBinding.invoke().then(() => {
            const userData = contextBinding.getBoundContext().getObject().value
            this.userModel.setData(userData)
        })
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

    public createTimesheet() {
        const timesheetBind = this.defaultModel.bindList('/TimesheetEntry')

        const jsonData = this.createNewModel.getData() as CreateNewModelType

        const contexts = jsonData.dates
            .map(async (d) => {

                const entry = {
                    activityType_ID: Number(jsonData.activity),
                    detail: jsonData.detail,
                    date: this.dateFormatter.format(d),
                    month_ID: d.getMonth(),
                    year: d.getFullYear(),
                    location_ID: Number(jsonData.location)
                }

                const context = timesheetBind.create(entry) as Context // context is transient
                await context.created()

                // context no longer transient after created()
                const contextBinding = this.defaultModel.bindContext('TimesheetService.draftActivate(...)', context)
                return contextBinding.invoke('$auto', false, undefined, true)
            })

        this.getView()?.setBusy(true)

        timesheetBind.attachCreateCompleted((e: Event) => {
            const param = e.getParameters() as any
            if (!param.success) {
                this.getView()?.setBusy(false)
                this.dialog.close()
            }
        })

        Promise.all(contexts).then(() => {
            this.getView()?.setBusy(false)
            this.dialog.close()
            this.defaultModel.refresh()
        })
    }

    public handleFilterPeriod() {
        this.filterTable()
    }

    public onDeletePress() {
        const oTable = this.byId('timesheetTable') as Table
        const deleteContexts = oTable.getSelectedItems().map(e => {
            const context = e.getBindingContext() as Context
            return context.delete()
        })

        Promise.all(deleteContexts).then(() => {
            MessageToast.show(`Deleted  ${deleteContexts.length} entries`)
            this.selectionModel.setData({ selected: [] })
        })
    }
}