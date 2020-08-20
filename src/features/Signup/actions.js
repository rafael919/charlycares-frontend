//@flow

export const ON_EMAIL_SIGNUP = 'signup/EMAIL';
export const ON_FACEBOOK_SIGNUP = 'signup/FACEBOOK';
export const ON_FACEBOOK_SIGNUP_SUCCESS = 'signup/Facebook/Success';
export const ON_FACEBOOK_SIGNUP_FAILURE = 'signup/Facebook/Error';
export const ON_EMAIL_RESET = 'signup/RESET';
export const ON_ERROR_RESET = 'signup/ERROR_RESET';
export const ON_SIGNUP_FLOW_FINISH = 'signup/SIGNUP_FLOW_FINISH';
export const ON_SIGNUP_FLOW_RESET = 'signup/SIGNUP_FLOW_RESET';
export const ON_GET_AGENDAS = 'signup/GET_AGENDAS';
export const ON_GET_AGENDAS_ERROR = 'signup/getAgendasError';
export const ON_GET_AGENDAS_SUCCESS = 'signup/getAgendasSuccess';
export const ON_AGENDA_SELECT = 'signup/AGENDA_SELECT';
export const ON_GET_TIMESLOTS = 'signup/GET_TIMESLOTS';
export const ON_GET_TIMESLOTS_ERROR = 'signup/TimeslotsError';
export const ON_GET_TIMESLOTS_SUCCESS = 'signup/TimeslotsSuccess';
export const ON_TIMESLOT_SELECT = 'signup/TIMESLOT_SELECT';
export const MAKE_APPOINTMENT = 'signup/MAKE_APPOINTMENT';
export const MAKE_APPOINTMENT_SUCCESS = 'signup/makeAppointmentSuccess';
export const MAKE_APPOINTMENT_FAILURE = 'signup/makeAppointmentError';

export type ResetErrorAction = {
  type: string,
};

export type GetAgendasAction = {
  type: string,
};

export type SelectAgendaPayload = {
  id: number,
  city: string,
};

export type SelectAgendaAction = {
  type: string,
  payload: SelectAgendaPayload,
};

export const onEmailSignup = () => ({
  type: ON_EMAIL_SIGNUP,
});

export const onFacebookSignup = () => ({
  type: ON_FACEBOOK_SIGNUP,
});
export const onFacebookSuccess = (payload: Object) => ({
  type: ON_FACEBOOK_SIGNUP_SUCCESS,
  payload,
});
export const onFacebookFailure = (errors: Object | string) => ({
  type: ON_FACEBOOK_SIGNUP_FAILURE,
  errors,
});

export const onEmailSignupReset = () => ({
  type: ON_EMAIL_RESET,
});

export const onErrorReset = (): ResetErrorAction => ({
  type: ON_ERROR_RESET,
});

export const onSignupFlowFinish = () => ({
  type: ON_SIGNUP_FLOW_FINISH,
});

export const onSignupFlowReset = () => ({
  type: ON_SIGNUP_FLOW_RESET,
});

export const onGetAgendas = (): GetAgendasAction => ({
  type: ON_GET_AGENDAS,
});

export const onGetAgendasSuccess = (payload: Array<Object>) => ({
  type: ON_GET_AGENDAS_SUCCESS,
  payload,
});
export const onGetAgendasError = (errors: Object | string) => ({
  type: ON_GET_AGENDAS_ERROR,
  errors,
});

export const onGetTimeslots = (id: number, week: number, year: number): GetAgendasAction => ({
  type: ON_GET_TIMESLOTS,
  id,
  week,
  year
});

export const onGetTimeslotsSuccess = (payload: Array<Object>) => ({
  type: ON_GET_TIMESLOTS_SUCCESS,
  payload,
});
export const onGetTimeslotsError = (errors: Object | string) => ({
  type: ON_GET_TIMESLOTS_ERROR,
  errors,
});

export const onAgendaSelect = (
  payload: SelectAgendaPayload
): SelectAgendaAction => ({
  type: ON_AGENDA_SELECT,
  payload,
});

export const onTimeslotSelect = (payload: number) => ({
  type: ON_TIMESLOT_SELECT,
  payload,
});

export const onMakeAppointment = (payload: number) => ({
  type: MAKE_APPOINTMENT,
  payload,
});

export const onAppointmentSuccess = (payload: number) => ({
  type: MAKE_APPOINTMENT_SUCCESS,
  payload,
});

export const onAppointmentFailure = (errors: Object | string) => ({
  type: MAKE_APPOINTMENT_FAILURE,
  errors,
});
