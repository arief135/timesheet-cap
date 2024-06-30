import cds from "@sap/cds";

export class TimesheetService extends cds.ApplicationService {

    init() {
        this.on('getUser', (req) => {
            return {
                id: req.user.id,
                attr: req.user.attr,
                roles: req.user.roles
            }
        })
        return super.init()
    }
}