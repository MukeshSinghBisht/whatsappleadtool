import { takeLatest, put, call } from "redux-saga/effects";
import { addLeadRequest, addLeadSuccess, addLeadFailure, Lead } from "../slices/leadSlice";
import { postLead } from "../../services/leadService";
function* handleAddLead(action : { type: string, payload: Lead}){
    try {
        const lead: Lead = yield call(postLead, action.payload)
        yield put(addLeadSuccess(lead))
    } catch (error : unknown) {
        if (error instanceof Error) {
            console.error(error.message); // ✅ Now TypeScript is happy
            yield put(addLeadFailure(error?.message))
          } else {
            console.error('Unknown error occurred', error);
          }
    }
}

export default function* rootSaga(){
    yield takeLatest(addLeadRequest.type, handleAddLead)
}