using TimesheetService as service from '../../srv/user-service';
annotate service.TimesheetEntry with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'ID',
                Value : ID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'atype_ID',
                Value : atype_ID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'detail',
                Value : detail,
            },
            {
                $Type : 'UI.DataField',
                Label : 'date',
                Value : date,
            },
            {
                $Type : 'UI.DataField',
                Label : 'location_ID',
                Value : location_ID,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ]
);

annotate service.TimesheetEntry with {
    atype @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'ActivityType',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : atype_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name',
            },
        ],
    }
};

annotate service.TimesheetEntry with {
    location @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Location',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : location_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name',
            },
        ],
    }
};

