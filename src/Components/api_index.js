
// LOGIN_REGISTER APIs
export { LoginUser_API, RegisterUser_API } from './API_Services/Login_Register_Services/LoginRegister';



//       API EXPORTS         //

export {
    GetCustomFieldTypes_API,
    GetCustomFields_API,
    AddCustomField_API,
    UpdateCustomField_API,
    GetDefaultValueForContext_API,
    UpdateContext_API,
    AddContext_API,
    UpdateDefaultValueForContext_API,
    CreateAddOptionInContext_API,
    UpdateOptionInContext_API,
    EnableOrDisableOptionInContext_API,
    DeleteOptionInContext_API,
    SearchCustomFields_API,
    ArchiveCustomField_API,
    GetCustomFieldsByPageNumber_API
} from "../Components/API_Services/Admin_Services/Modify_Users_Services/CustomFields_API";

export {
    GetProjects_API,
    CreateProject_API,
    UpdateProject_API,
    DeleteProject_API,
    GetUsers_API
} from './API_Services/Admin_Services/Projects_Services/ManageProjects_API';

export {
    GetComponentsByProject_API,
    CreateComponent_API,
    UpdateComponent_API,
    DeleteComponent_API
} from './API_Services/Admin_Services/Project_Details_Services/ProjectComponents_API';

export {
    GetVersionsByProject_API,
    AddVersion_API,
    UpdateVersion_API,
    DeleteVersion_API
} from './API_Services/Admin_Services/Project_Details_Services/ProjectVersions_API';

export {
    getPriorities_API,
    addPriority_API,
    updatePriority_API,
    deletePriority_API
} from "../Components/API_Services/Admin_Services/Modify_Users_Services/Priorities_API";

export {
    getResolution_API,
    addResolution_API,
    deleteResolution_API,
    updateResolution_API
} from "../Components/API_Services/Admin_Services/Modify_Users_Services/Resolutions_API";

export {
    getStatus_API,
    addStatus_API,
    updateStatus_API,
    deleteStatus_API,
    getStatusCategories_API
} from "../Components/API_Services/Admin_Services/Modify_Users_Services/Statuses_API";

export {
    getTicketTypeScreenBatches_API,
    addTTScreenBatch_API,
    associateProjectToTicketTypeScreenBatch_API,
    UpdateTicketTypeScreenBatch_API,
    deleteTTScreenBatch_API,
    configureTTScreenBatch_API,
    associateTicketTypeWithScreenBatch_API,
    EditTicketTypeScreenBatchEntry_API,
    deleteTicketTypeScreenBatchEntry_API
} from "../Components/API_Services/Admin_Services/Modify_Users_Services/TicketTypeScreenBatches_API"
export {
    getScreens_API,
    addScreen_API,
    getScreenContents_API,
    updateScreenContent_API,
} from "../Components/API_Services/Admin_Services/Modify_Users_Services/Screens_API"

export {
    getScreenBatches_API,
    addScreenBatch_API,
    getScreenBatchContents_API,
    updateScreenBatch_API
} from "../Components/API_Services/Admin_Services/Modify_Users_Services/ScreenBatches_API"

export {
    fetchFromApi,
    getTicketTypeBatches_API,
    AddTicketTypeBatch_API,
    DeleteTicketTypeBatch_API,
    GetTicketTypesForAssociation_API,
    GetProjectsForAssociation_API,
    associateProjectToTicketTypeBatch_API,
    updateTicketTypeBatch_API,
    
} from "../Components/API_Services/Admin_Services/Modify_Users_Services/TicketTypeBatches_API"

export {
    getTicketTypes_API,
    getTicketTypesForAssociation_API,
    addTicketType_API,
    updateTicketType_API,
    deleteTicketType_API,
} from "../Components/API_Services/Admin_Services/Modify_Users_Services/TicketTypes_API"

export { getProjectsWithTicketTypes_API ,getCustomFieldsForCreateTicket_API} from "../Components/API_Services/OnClick_Services/OnClick_API"